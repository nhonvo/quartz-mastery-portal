---


title: "Distributed Transactions: Saga Pattern, Event Sourcing & CQRS Architecture"
description: "Master-level architecture and implementation guide for Distributed Transactions: Saga Pattern, Event Sourcing & CQRS Architecture covering core theory, runtime mechanics, and production best practices."
category: "System Design & High-Level Architecture"
tags: [system, design, high, level, architecture, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Distributed Transactions: Saga Pattern, Event Sourcing & CQRS Architecture

## 1. Executive Summary & Under-the-Hood Mechanics

### 1.1 Executive Summary
In monolithic architectures, ACID transactions guarantee data consistency using database local locks. In microservice architectures, data is partitioned across isolated database instances. Traditional **Two-Phase Commit (2PC)** protocols suffer from high network latency, distributed deadlock vulnerability, and poor availability under network partitions (CAP theorem).

To achieve **Eventual Consistency** across distributed services without blocking locks, system architects employ the **Saga Pattern** paired with **Event Sourcing**, **CQRS** (Command Query Responsibility Segregation), and the **Transactional Outbox Pattern**.

---

### 1.2 Under-the-Hood Mechanics: Saga Orchestration vs Choreography & Outbox

#### 1. Saga Execution Mechanics
A Saga is a sequence of local transactions $T_1, T_2, \dots, T_n$. Each local transaction updates a database within a single service boundary. If local transaction $T_i$ fails (e.g., payment rejected), the Saga engine executes compensating transactions $C_{i-1}, \dots, C_1$ in reverse order to undo changes.

```
SAGA EXECUTION & COMPENSATION FLOW:
Normal Forward Flow:     [T1: Order Created] ---> [T2: Payment Reserved] ---> [T3: Inventory Allocated (FAILS!)]
                                                                                      |
Rollback Backward Flow:  [C1: Order Cancelled] <--- [C2: Payment Refunded] <----------+
```

#### 2. Orchestration vs Choreography
- **Choreography**: Microservices react to events emitted by peer services without a central coordinator. High risk of cyclic dependencies and complex tracing.
- **Orchestration**: A centralized **Saga Orchestrator** maintains state, directs local transaction steps via explicit command messages, and executes compensation flows upon failure.

```
ORCHESTRATOR STATE MACHINE FLOW:
+-------------------+      Command: Reserve Payment       +-------------------+
|                   | ----------------------------------> |  Payment Service  |
| Saga Orchestrator | <---------------------------------- |                   |
|                   |      Event: PaymentReserved         +-------------------+
|  [State: Pending] |
|                   |      Command: Allocate Inventory    +-------------------+
|                   | ----------------------------------> | Inventory Service |
|                   | <---------------------------------- |                   |
|                   |      Event: InventoryFailed         +-------------------+
|                   |
|                   |      Command: Refund Payment        +-------------------+
|  [State: Rolling  | ----------------------------------> |  Payment Service  |
|       Back]       | <---------------------------------- | (Compensating C2) |
+-------------------+      Event: PaymentRefunded         +-------------------+
```

#### 3. Transactional Outbox Pattern & Change Data Capture (CDC)
To solve the **Dual-Write Problem** (updating local database and publishing event to Kafka in one operation), applications write both business state and outgoing events into a `outbox` database table within the **same local ACID transaction**. A Change Data Capture engine (e.g., Debezium) streams changes to Kafka with **At-Least-Once** guarantees.

```
TRANSACTIONAL OUTBOX PATTERN:
[ App Service ] ---> BEGIN DB TRANSACTION
                 ---> Write Order State to 'orders' Table
                 ---> Write Event to 'outbox' Table
                 ---> COMMIT DB TRANSACTION
                           |
                           v (Database WAL Log)
                  [ Debezium CDC Engine ] ---> [ Kafka Event Bus ]
```

---

## 2. Production-Grade Code Implementations & Best Practices

### 2.1 C# Production-Grade Saga Orchestrator Engine

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SystemDesign.SagaPattern
{
    public enum SagaStatus { Pending, Completed, RollingBack, Failed }

    public interface ISagaStep<TContext>
    {
        string Name { get; }
        Task<bool> ExecuteAsync(TContext context);
        Task<bool> CompensateAsync(TContext context);
    }

    public sealed class OrderSagaContext
    {
        public Guid OrderId { get; set; }
        public decimal Amount { get; set; }
        public bool PaymentReserved { get; set; }
        public bool InventoryAllocated { get; set; }
    }

    public sealed class SagaOrchestrator<TContext>
    {
        private readonly List<ISagaStep<TContext>> _steps = new List<ISagaStep<TContext>>();

        public SagaOrchestrator<TContext> AddStep(ISagaStep<TContext> step)
        {
            _steps.Add(step);
            return this;
        }

        public async Task<SagaStatus> ExecuteSagaAsync(TContext context)
        {
            var executedSteps = new Stack<ISagaStep<TContext>>();

            foreach (var step in _steps)
            {
                Console.WriteLine($"[SAGA ORCHESTRATOR] Executing Forward Step: {step.Name}");
                bool success = false;
                try
                {
                    success = await step.ExecuteAsync(context);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[SAGA ERROR] Step '{step.Name}' threw exception: {ex.Message}");
                    success = false;
                }

                if (success)
                {
                    executedSteps.Push(step);
                }
                else
                {
                    Console.WriteLine($"[SAGA ORCHESTRATOR] Step '{step.Name}' failed! Initiating Compensation Sequence...");
                    await RollbackSagaAsync(executedSteps, context);
                    return SagaStatus.Failed;
                }
            }

            return SagaStatus.Completed;
        }

        private async Task RollbackSagaAsync(Stack<ISagaStep<TContext>> executedSteps, TContext context)
        {
            while (executedSteps.Count > 0)
            {
                var step = executedSteps.Pop();
                Console.WriteLine($"[SAGA COMPENSATION] Reversing Step: {step.Name}");
                
                int retryCount = 0;
                bool compensated = false;

                // Idempotent retry loop for compensating steps
                while (!compensated && retryCount < 3)
                {
                    try
                    {
                        retryCount++;
                        compensated = await step.CompensateAsync(context);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"[COMPENSATION ERROR] Retry {retryCount} for '{step.Name}' failed: {ex.Message}");
                        await Task.Delay(500 * retryCount);
                    }
                }

                if (!compensated)
                {
                    Console.WriteLine($"[CRITICAL ALERT] Compensation step '{step.Name}' permanently failed! Requires Manual Intervention.");
                }
            }
        }
    }
}
```

---

## 3. Performance Benchmark & Big-O Analysis

### 3.1 Distributed Transaction Protocol Comparison Matrix

| Protocol / Architecture | Latency | Throughput | Availability (CAP) | Lock Contention |
| :--- | :--- | :--- | :--- | :--- |
| **Two-Phase Commit (2PC)** | High (Multi-RTT blocking) | Low (< 500 tx/sec) | Low (CP - Blocks on Failure) | **Severe (Distributed Locks)** |
| **Choreographed Saga** | Medium (Event Driven) | High (> 15,000 tx/sec) | High (AP - Eventually Consistent) | **Zero (Local Tx Only)** |
| **Orchestrated Saga** | Low-Medium | High (> 10,000 tx/sec) | High (AP - Eventually Consistent) | **Zero (Local Tx Only)** |
| **Event Sourcing + CQRS** | Low (Append-Only) | Very High (> 50,000 tx/sec)| High (AP - Read/Write Split) | **Zero (Append-Only Log)** |

---

## 4. Anti-Patterns & Bad Practices vs Correct Solutions

### ❌ Anti-Pattern 1: Non-Idempotent Compensating Actions
Executing compensating operations $C_i$ (e.g., `RefundPayment`) without checking if the transaction was already compensated. Network retries cause duplicate refunds to customers.

**✅ Correct Solution**: Design all compensating transactions to be strictly **Idempotent** using idempotent deduplication keys (e.g., `payment_refunds` table with `saga_id` unique constraint).

---

### ❌ Anti-Pattern 2: The Dual-Write Problem
Writing business records to a relational database and publishing an event to Apache Kafka in a standard method block without a shared transaction scope.

```csharp
// BAD: If Kafka publish throws exception or application crashes, 
// database holds committed order but no downstream event is emitted!
_dbContext.Orders.Add(order);
await _dbContext.SaveChangesAsync(); // Committed!
await _kafkaProducer.SendAsync("order-events", orderEvent); // Crashes here!
```

**✅ Correct Solution**: Enforce the **Transactional Outbox Pattern** using Debezium CDC to read WAL logs asynchronously.

---

## 5. Real-World Troubleshooting & Operational Edge Cases

### 🐛 Edge Case 1: Unrecoverable Compensation Failures & Human Intervention DLQs
If a compensating transaction $C_i$ fails permanently (e.g., bank account closed during payment refund), the Saga orchestrator cannot complete backward rollback automatically.

**Diagnostic Signature**: Saga state machine stuck in `RollingBack` status for hours, emitting failed compensation retries.

**Mitigation**:
1. Route permanently failed Saga events to a **Dead Letter Queue (DLQ)**.
2. Build an operational dashboard allowing support engineers to trigger manual resolution or override state.

---

## 🔗 Graph-Linked Knowledge Base
