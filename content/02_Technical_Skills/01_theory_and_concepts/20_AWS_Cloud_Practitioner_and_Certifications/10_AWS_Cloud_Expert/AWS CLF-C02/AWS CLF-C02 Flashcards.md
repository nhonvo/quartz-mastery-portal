---


title: "AWS CLF-C02 Flashcard Deck"
description: "Comprehensive active-recall spaced repetition flashcard deck for the AWS Certified Cloud Practitioner (CLF-C02) exam, covering Cloud Concepts, Security, Compute, Storage, Networking, Databases, Governance, and Billing."
category: "AWS Cloud Practitioner & Certifications"
tags: [aws, clf-c02, flashcards, certification, cloud-practitioner, active-recall, spaced-repetition, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---

# AWS Certified Cloud Practitioner (CLF-C02) Spaced Repetition Flashcard Deck

> [!TIP]
> **Active Recall Format**: Use Obsidian Spaced Repetition or Anki syntax (`Question :: Answer`) to review these high-yield certification concepts.

---

## 1. Cloud Concepts & Global Infrastructure (Domain 1)

What are the 6 core advantages of Cloud Computing? :: Trade capital expense (CapEx) for variable expense (OpEx), benefit from massive economies of scale, stop guessing capacity, increase speed and agility, stop spending money running data centers, go global in minutes.

What is the difference between Agility and Elasticity in AWS? :: Agility refers to the rapid speed of provisioning and experimenting with new resources; Elasticity refers to the automated scaling up and scaling down of capacity to match real-time workload demand.

What constitutes an AWS Region? :: A physical geographic location in the world with multiple (minimum 3), isolated, and physically separated Availability Zones connected by low-latency redundant fiber.

What constitutes an AWS Availability Zone (AZ)? :: One or more discrete data centers with redundant power, networking, and connectivity within an AWS Region, isolated from disasters in other AZs.

What is an AWS Edge Location? :: A global site that Amazon CloudFront and AWS Global Accelerator use to cache content and route user traffic close to viewers with minimal network latency.

What is AWS Local Zones? :: An infrastructure deployment that places compute, storage, database, and other select AWS services close to large population and industry centers where low single-digit millisecond latency is required.

What is AWS Outposts? :: A fully managed service that delivers AWS infrastructure, native AWS services, APIs, and tools to virtually any on-premises data center or co-location space for a truly consistent hybrid experience.

What is AWS Wavelength? :: An infrastructure deployment optimized for mobile edge computing applications that embeds AWS compute and storage services within 5G telecommunication data centers.

What are the 6 Pillars of the AWS Well-Architected Framework? :: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability.

Which migration strategy involves changing how an application is architected and developed using cloud-native features? :: Refactoring (Re-architecting).

What are the "6 Rs" of AWS Cloud Migration strategies? :: Rehost (Lift-and-shift), Replatform (Lift-tinker-and-shift), Repurchase (Drop-and-shop to SaaS), Refactor (Re-architect for cloud-native), Retain (Keep on-prem), Retire (Decommission).

---

## 2. Security, Identity & Compliance (Domain 2)

What is the AWS Shared Responsibility Model rule of thumb? :: AWS is responsible for Security **OF** the Cloud (hardware, physical facilities, hypervisors, global networking); Customer is responsible for Security **IN** the Cloud (guest OS, firewalls, IAM, encryption, application code, customer data).

In an Amazon RDS managed database, who is responsible for OS patching and database software updates? :: AWS (under the managed service shared responsibility tier).

In an Amazon EC2 instance, who is responsible for operating system patching and firewall rule configuration? :: The Customer.

What is the difference between an IAM Role and an IAM User? :: An IAM User has long-term static credentials for a human/app; an IAM Role provides temporary, short-lived STS credentials assumed by services, applications, or federated identities.

What is an AWS Organizations Service Control Policy (SCP)? :: A JSON policy that specifies the maximum permissions (guardrails) for member accounts in an organization without directly granting permissions.

What is the difference between a Security Group and a Network Access Control List (NACL)? :: Security Groups are **stateful** instance-level virtual firewalls (return traffic allowed automatically); NACLs are **stateless** subnet-level firewalls evaluated by numbered order (explicit inbound and outbound rules required).

What is Amazon GuardDuty? :: An intelligent continuous threat detection service that monitors VPC Flow Logs, DNS logs, CloudTrail management events, and Kubernetes audit logs using machine learning.

What is AWS Shield Standard vs AWS Shield Advanced? :: Shield Standard provides automatic, free Layer 3/4 DDoS protection for all AWS customers; Shield Advanced provides dedicated 24/7 DDoS Response Team (DRT) support, financial cost protection against scaling spikes, and Layer 7 protection.

What is AWS WAF (Web Application Firewall)? :: A Layer 7 application firewall monitoring HTTP/HTTPS requests forwarded to CloudFront, Application Load Balancer, or API Gateway to block SQL injection, Cross-Site Scripting (XSS), and bot traffic.

What is AWS KMS (Key Management Service)? :: A managed service that enables creation and control of cryptographic keys (CMKs) to encrypt data at rest across AWS services and applications with FIPS 140-2 validation.

What is AWS Secrets Manager vs AWS Systems Manager Parameter Store? :: Secrets Manager manages and automatically **rotates** database credentials, API keys, and OAuth tokens; Parameter Store provides simple hierarchical configuration and string/encrypted parameter storage without automated rotation.

What is AWS Artifact? :: A self-service portal providing on-demand access to AWS compliance reports (SOC, PCI-DSS, ISO, FedRAMP) and security agreements (Business Associate Addendum / BAA for HIPAA).

What is Amazon Inspector? :: An automated vulnerability management service that continually scans Amazon EC2 workloads, container images in Amazon ECR, and AWS Lambda functions for software vulnerabilities and unintended network exposure.

What is Amazon Macie? :: A fully managed data security and privacy service that uses machine learning and pattern matching to discover and protect sensitive data (PII, credit cards) in Amazon S3 buckets.

---

## 3. Compute, Container & Serverless Services (Domain 3)

What is the difference between EC2 On-Demand, Spot, and Reserved Instances? :: On-Demand: Pay per second with zero long-term commitment; Spot: Up to 90% discount utilizing spare capacity subject to 2-minute termination notice; Reserved Instances: Up to 72% discount for 1-year or 3-year steady-state commitment.

What is an EC2 Savings Plan? :: A flexible pricing model offering low prices on EC2, Fargate, and Lambda usage in exchange for a commitment to a consistent amount of usage ($/hour) for a 1-year or 3-year term.

What is an Amazon EC2 Instance Store volume? :: High-speed, physically attached NVMe block storage with ultra-low latency, but **ephemeral** (data is lost when the instance is stopped, terminated, or hardware fails).

What is AWS Lambda pricing based on? :: Number of requests and execution duration (billed per millisecond of compute time and allocated memory capacity).

What is the difference between Amazon ECS and Amazon EKS? :: Amazon ECS is AWS-native proprietary container orchestration; Amazon EKS is managed upstream open-source Kubernetes orchestration.

What is AWS Fargate? :: A serverless compute engine for containers that works with both Amazon ECS and Amazon EKS, eliminating the need to provision, configure, or manage underlying EC2 instances.

What is AWS Elastic Beanstalk? :: A Platform-as-a-Service (PaaS) for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, and Docker where AWS handles provisioning, load balancing, auto-scaling, and health monitoring while retaining full underlying control.

What is AWS Batch? :: A fully managed batch computing service that plans, schedules, and executes containerized batch workloads across dynamically provisioned EC2 and Fargate clusters.

What are the three main types of Elastic Load Balancers (ELB)? :: Application Load Balancer (ALB: Layer 7 HTTP/HTTPS, path routing), Network Load Balancer (NLB: Layer 4 TCP/UDP, ultra-low latency, static IP), Gateway Load Balancer (GWLB: Layer 3 virtual appliance inspection).

---

## 4. Storage & Relational/NoSQL Databases (Domain 4)

What are the 6 Amazon S3 Storage Classes ranked from hottest to coldest? :: S3 Standard $\to$ S3 Intelligent-Tiering $\to$ S3 Standard-Infrequent Access (Standard-IA) $\to$ S3 One Zone-Infrequent Access (One Zone-IA) $\to$ S3 Glacier Flexible Retrieval $\to$ S3 Glacier Deep Archive.

How does S3 Intelligent-Tiering optimize storage costs? :: Automatically moves objects between frequent, infrequent, and archive access tiers based on changing access patterns without performance impact or retrieval fees.

What is the difference between Amazon EBS and Amazon EFS? :: Amazon EBS is block storage attached to a single EC2 instance within one AZ; Amazon EFS is a serverless, shared POSIX file system concurrently accessible by thousands of Linux EC2 instances across multiple AZs.

What is Amazon DynamoDB? :: A fully managed serverless NoSQL key-value and document database providing single-digit millisecond latency at any scale with ACID support and global tables.

What is Amazon Aurora? :: A cloud-native MySQL and PostgreSQL-compatible relational database engine that delivers up to 5x throughput of standard MySQL with a distributed, self-healing storage system replicated 6 ways across 3 AZs.

What is Amazon ElastiCache? :: A fully managed in-memory caching and data structure service supporting Redis and Memcached for sub-millisecond query responses.

What is Amazon Redshift? :: A fully managed, petabyte-scale columnar data warehouse service for analytical OLAP processing and business intelligence reporting.

What is AWS Snowmobile vs AWS Snowball Edge? :: Snowball Edge is a ruggedized hardware appliance transferring up to 80 TB of data per device; Snowmobile is a 45-foot ruggedized shipping container truck transporting up to 100 PB of data.

---

## 5. Networking & Content Delivery (Domain 5)

What is an Amazon VPC (Virtual Private Cloud)? :: A logically isolated virtual network dedicated to your AWS account within an AWS Region, completely under your control with customizable IP address ranges (CIDR), subnets, routing tables, and network gateways.

What is the purpose of an Internet Gateway (IGW)? :: A horizontally scaled, redundant VPC component that enables communication between public subnets and the public internet.

What is a NAT Gateway? :: A managed network address translation service that enables instances in a **private subnet** to connect outbound to the internet (e.g. software updates) while preventing inbound connections from the internet.

What is Amazon Route 53? :: A highly available and scalable cloud Domain Name System (DNS) web service that translates human-readable domain names into numeric IP addresses with advanced routing policies (Latency, Geolocation, Failover, Weighted).

What is Amazon CloudFront? :: A fast, global Content Delivery Network (CDN) service that securely delivers data, videos, applications, and APIs to users worldwide with low latency and high transfer speeds via Edge Locations.

What is AWS Direct Connect? :: A dedicated physical fiber-optic network connection from your on-premises data center directly to AWS, bypassing the public internet to deliver consistent network performance and lower egress costs.

What is AWS Transit Gateway? :: A central hub that connects VPCs and on-premises networks through a single gateway, eliminating complex mesh peering relationships.

What is AWS PrivateLink (VPC Endpoints)? :: Provides private connectivity between VPCs, supported AWS services, and on-premises networks without exposing traffic to the public internet.

---

## 6. Management, Monitoring & Governance (Domain 6)

What is the difference between Amazon CloudWatch and AWS CloudTrail? :: Amazon CloudWatch monitors **performance metrics, logs, and alarms** (CPU, memory, disk, custom application logs); AWS CloudTrail records **API activity, user logins, and governance audit trails** ("Who did What, When, and from Where").

What is AWS Config? :: A service that continually assesses, audits, and evaluates the configuration compliance of AWS resources against desired configuration rules and historical changes.

What is AWS Trusted Advisor? :: An online tool that analyzes your AWS environment across 5 categories (Cost Optimization, Performance, Security, Fault Tolerance, Service Limits) to recommend best practices.

Which AWS Support plans include access to ALL Trusted Advisor checks? :: Business Support and Enterprise Support (Developer and Basic plans only provide access to 7 core checks).

What is AWS CloudFormation? :: An Infrastructure as Code (IaC) service that allows you to model, provision, and version AWS resources using declarative JSON or YAML templates.

What is AWS Systems Manager? :: A unified management hub to view operational data, automate recurring maintenance tasks, patch operating systems, and securely access EC2 instances via Session Manager without SSH keys.

What is AWS Compute Optimizer? :: A machine learning service that analyzes historical CloudWatch resource utilization metrics to recommend optimal EC2 instance types, EBS volumes, and Lambda memory sizes.

---

## 7. Billing, Pricing & Support Plans (Domain 7)

What is AWS Cost Explorer? :: A web tool that enables you to visualize, understand, and analyze your AWS costs and usage over time, and forecast future spend for up to 12 months.

What is AWS Budgets? :: A billing tool that allows you to set custom cost and usage limits and receive automated email/SNS alerts when actual or forecasted spend exceeds threshold percentages.

What is AWS Pricing Calculator? :: A web-based planning tool to estimate the cost of AWS architectures and service configurations before provisioning resources.

What is AWS Consolidated Billing? :: A feature of AWS Organizations that combines billing from multiple AWS accounts into a single master payer account, aggregating usage across accounts to qualify for volume pricing discounts.

What are the 4 AWS Support Plans and their SLA response times for critical business outages? :: Basic (Free, customer service only), Developer (12-hour response), Business (1-hour response for production system down), Enterprise (15-minute response for business-critical system down with dedicated Technical Account Manager / TAM).

---

## 🔗 Graph-Linked Knowledge Base
- ⚓ Mindmap Guide: [[aws_clf_c02_mindmap|AWS CLF-C02 Mindmap]]
- ⚓ Practice Questions: [[aws_clf_c02_practice_questions___final_test|AWS CLF-C02 Final Practice Test]]
- 🔗 Cloud Concepts: [[aws_cloud_concepts_waf|AWS Cloud Concepts & WAF]]
