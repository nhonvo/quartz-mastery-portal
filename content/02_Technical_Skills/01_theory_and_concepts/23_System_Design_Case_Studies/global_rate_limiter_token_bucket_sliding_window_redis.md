---


title: "Global Distributed Rate Limiter: Token Bucket, Sliding Window & Redis Lua Mechanics"
description: "Master-level architecture and implementation guide for Global Distributed Rate Limiter: Token Bucket, Sliding Window & Redis Lua Mechanics covering core theory, runtime mechanics, and production best practices."
category: "System Design & High-Level Architecture"
tags: [system, design, high, level, architecture, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Global Distributed Rate Limiter: Token Bucket, Sliding Window & Redis Lua Mechanics

## 1. Executive Summary & Under-the-Hood Mechanics

### 1.1 Executive Summary
Distributed **Rate Limiters** protect backend infrastructure from cascading failures, resource exhaustion, and malicious Denial of Service (DDoS) attacks. They enforce maximum traffic quotas across distributed API gateways. 

Designing a rate limiter for multi-region microservices requires selecting the appropriate algorithm—**Token Bucket**, **Leaky Bucket**, **Fixed Window**, **Sliding Window Log**, or **Sliding Window Counter**—while ensuring low-latency (< 2ms) atomic quota evaluations via **Redis Lua scripts** or **Local Memory Dual-Tier Caching**.

---

### 1.2 Under-the-Hood Mechanics: Algorithm Trade-offs & Atomic Redis Lua

#### 1. Rate Limiting Algorithm Comparison

```
SLIDING WINDOW COUNTER WEIGHTED MATH:
Window Size = 60s. Current Time = 12:01:15 (25% into current window).
Previous Window (12:00:00-12:01:00) Count = 100 requests.
Current Window  (12:01:00-12:02:00) Count = 30 requests.

Estimated Request Rate = (100 * (1 - 0.25)) + 30 = 75 + 30 = 105 requests.
```

- **Token Bucket**: Refills tokens at a constant rate $R$. Allows burst capacity up to bucket size $B$. Lazy calculation computes refilled tokens on arrival:
$$\text{Tokens}_{\text{new}} = \min(B, \text{Tokens}_{\text{old}} + (\Delta t \times R))$$
- **Leaky Bucket**: Processes requests at a constant FIFO output rate. Smooths out traffic spikes but penalizes bursty traffic.
- **Sliding Window Counter**: Blends current and previous window counts using weighted time ratios. Offers $\mathcal{O}(1)$ memory consumption with minimal boundary approximation error (< 5%).

#### 2. Race Conditions & Atomic Execution via Redis Lua
Evaluating and updating rate limits via separate Redis commands (`GET`, `INCR`, `EXPIRE`) creates severe concurrency race conditions across multi-threaded application nodes.

```
NON-ATOMIC RACE CONDITION (Two Parallel Gateways):
Gateway 1: GET rate_limit:user_123 ----> Returns 99 (Limit 100)
Gateway 2: GET rate_limit:user_123 ----> Returns 99 (Limit 100)
Gateway 1: INCR rate_limit:user_123 ---> Sets to 100 (Allowed)
Gateway 2: INCR rate_limit:user_123 ---> Sets to 101 (ALLOWED INCORRECTLY!)
```

By executing evaluation logic inside a single **Redis Lua script**, Redis guarantees single-threaded atomic execution, avoiding race conditions without requiring external distributed locks.

---

## 2. Production-Grade Code Implementations & Best Practices

### 2.1 Atomic Redis Lua Script (Sliding Window Counter)

```lua
-- KEYS[1]: Rate limit key (e.g., "ratelimit:tenant_abc:api")
-- ARGV[1]: Current Unix Timestamp in seconds
-- ARGV[2]: Window Size in seconds (e.g., 60)
-- ARGV[3]: Max Limit allowed in window (e.g., 1000)

local key = KEYS[1]
local now = tonumber(ARGV[1])
local window_size = tonumber(ARGV[2])
local max_limit = tonumber(ARGV[3])

local current_window_bucket = math.floor(now / window_size)
local previous_window_bucket = current_window_bucket - 1

local curr_key = key .. ":" .. current_window_bucket
local prev_key = key .. ":" .. previous_window_bucket

local current_count = tonumber(redis.call("GET", curr_key) or "0")
local previous_count = tonumber(redis.call("GET", prev_key) or "0")

local time_into_current_window = now % window_size
local weight = (window_size - time_into_current_window) / window_size
local estimated_count = math.floor(previous_count * weight + current_count)

if estimated_count >= max_limit then
    return {0, estimated_count} -- Rejected (0 = false)
else
    redis.call("INCR", curr_key)
    if current_count == 0 then
        redis.call("EXPIRE", curr_key, window_size * 2)
    end
    return {1, estimated_count + 1} -- Allowed (1 = true)
end
```

### 2.2 Production-Grade C# Client with Circuit Breaker Fallback

```csharp
using System;
using System.Threading.Tasks;
using StackExchange.Redis;

namespace SystemDesign.RateLimiter
{
    public sealed class DistributedRateLimiter
    {
        private readonly IConnectionMultiplexer _redis;
        private readonly LoadedLuaScript _luaScript;
        private const string LuaScriptSource = @"
            local key = KEYS[1]
            local now = tonumber(ARGV[1])
            local window_size = tonumber(ARGV[2])
            local max_limit = tonumber(ARGV[3])
            local current_bucket = math.floor(now / window_size)
            local prev_bucket = current_bucket - 1
            local curr_key = key .. ':' .. current_bucket
            local prev_key = key .. ':' .. prev_bucket
            local current_count = tonumber(redis.call('GET', curr_key) or '0')
            local previous_count = tonumber(redis.call('GET', prev_key) or '0')
            local weight = (window_size - (now % window_size)) / window_size
            local estimated = math.floor(previous_count * weight + current_count)
            if estimated >= max_limit then
                return {0, estimated}
            else
                redis.call('INCR', curr_key)
                if current_count == 0 then
                    redis.call('EXPIRE', curr_key, window_size * 2)
                end
                return {1, estimated + 1}
            end";

        public DistributedRateLimiter(IConnectionMultiplexer redis)
        {
            _redis = redis ?? throw new ArgumentNullException(nameof(redis));
            var prepared = LuaScript.Prepare(LuaScriptSource);
            _luaScript = prepared;
        }

        public async Task<(bool Allowed, long CurrentCount)> CheckRateLimitAsync(
            string resourceKey, 
            int windowSeconds, 
            int maxLimit)
        {
            try
            {
                var db = _redis.GetDatabase();
                long now = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
                
                var result = (RedisResult[])await db.ScriptEvaluateAsync(
                    _luaScript.Hash, 
                    new { keys = new RedisKey[] { resourceKey }, argv = new RedisValue[] { now, windowSeconds, maxLimit } }
                );

                bool allowed = (int)result[0] == 1;
                long count = (long)result[1];
                return (allowed, count);
            }
            catch (RedisConnectionException)
            {
                // FALLBACK POLICY: Fail Open to protect availability during Redis outages
                return (Allowed: true, CurrentCount: 0);
            }
        }
    }
}
```

---

## 3. Performance Benchmark & Big-O Analysis

### 3.1 Memory & Time Complexity Matrix

| Algorithm | Time Complexity | Memory per Client/Key | Burst Handling | Accuracy |
| :--- | :--- | :--- | :--- | :--- |
| **Token Bucket** | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ (2 fields: tokens, timestamp) | Excellent | High |
| **Fixed Window** | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ (1 counter) | Poor (2x limit at window boundary) | Low |
| **Sliding Window Log** | $\mathcal{O}(\log N)$ ZSET | $\mathcal{O}(N)$ (Stores all timestamps) | Excellent | Perfect (Exact) |
| **Sliding Window Counter**| $\mathcal{O}(1)$ Lua | $\mathcal{O}(1)$ (2 small keys) | Good | High (~99%) |

---

## 4. Anti-Patterns & Bad Practices vs Correct Solutions

### ❌ Anti-Pattern 1: Non-Atomic INCR and EXPIRE Calls
Issuing `INCR` followed by `EXPIRE` in separate network round-trips. If the application crashes between `INCR` and `EXPIRE`, the counter key lives forever without an expiration time, permanently locking out the user.

**✅ Correct Solution**: Execute `INCR` and `EXPIRE` inside an atomic Redis Lua script or multi/exec transaction block.

---

### ❌ Anti-Pattern 2: Memory Exhaustion via Sliding Window Log ZSET
Using Redis Sorted Sets (`ZSET`) to store timestamp logs for high-throughput APIs (> 50,000 req/sec) consumes gigabytes of Redis RAM, resulting in Out-Of-Memory (OOM) eviction crashes.

**✅ Correct Solution**: Use Sliding Window Counter or Token Bucket algorithms which require fixed $\mathcal{O}(1)$ memory per key.

---

## 5. Real-World Troubleshooting & Operational Edge Cases

### 🐛 Edge Case 1: Redis Primary Partitioning & Fail-Open Fallback
If the centralized Redis cluster suffers a network partition or primary failover delay, forcing every API call to wait for Redis timeout stalls all incoming user traffic.

**Mitigation**: Implement a **Fail-Open Policy** combined with a secondary local in-memory rate limiter (`MemoryCache`). If Redis calls exceed a 10ms threshold or fail, fall back to local token bucket limits while alerting operations.

---

## 🔗 Graph-Linked Knowledge Base
