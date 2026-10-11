---


title: "Practice Questions: CLF-C02 Cloud Practitioner Comprehensive Mock Exam"
description: "Comprehensive 40-question mock exam test simulation for AWS Certified Cloud Practitioner (CLF-C02) with detailed domain classifications, answer keys, and deep architectural explanations."
category: "AWS Cloud Practitioner & Certifications"
tags: [aws, clf-c02, practice-exam, certification, mock-test, questions, cloud-practitioner, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---

# AWS Certified Cloud Practitioner (CLF-C02) Full Practice Exam

> [!TIP]
> This mock exam simulates the difficulty, wording, and domain distribution of the official **AWS Certified Cloud Practitioner (CLF-C02)** examination (65 questions, 90 minutes, passing score 700/1000).

---

## 📝 Q1: Which compute option reduces costs when you commit to a consistent amount of compute usage for a 1-year or 3-year term?
- A) Spot Instances
- B) On-Demand Instances
- C) Reserved Instances / Savings Plans
- D) Dedicated Hosts

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **C) Reserved Instances / Savings Plans**

**Detailed Explanation**:
- **Reserved Instances (RIs)** and **Savings Plans** provide significant discounts (up to 72%) compared to On-Demand pricing in exchange for committing to a consistent usage amount (measured in $/hr for Savings Plans or specific instance configurations for RIs) over a 1-year or 3-year term.
- *Spot Instances (A)* offer up to 90% discounts on unused EC2 capacity but can be reclaimed by AWS with a 2-minute notice (no long-term commitment).
- *On-Demand (B)* is the default pay-per-second model with zero commitment.
- *Dedicated Hosts (D)* allocate physical servers dedicated to your use, primarily for regulatory compliance or server-bound software licenses.

</details>

---

## 📝 Q2: Which service enables an enterprise to consolidate and manage multiple AWS accounts from a single central location with centralized billing and governance?
- A) AWS IAM Identity Center
- B) AWS Organizations
- C) AWS Control Tower
- D) AWS Systems Manager

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **B) AWS Organizations**

**Detailed Explanation**:
- **AWS Organizations** offers policy-based management for multiple AWS accounts, enabling consolidated billing (aggregating usage across accounts for volume pricing tier discounts) and hierarchical Service Control Policies (SCPs) to establish central security guardrails.
- *AWS IAM Identity Center (A)* manages single sign-on (SSO) user access across accounts.
- *AWS Control Tower (C)* builds on Organizations to automate multi-account landing zone provisioning.

</details>

---

## 📝 Q3: Which action can you perform using Amazon CloudFront?
- A) Automatically scale EC2 instances across multiple Availability Zones.
- B) Deliver dynamic, static web content and APIs to customers globally with low latency via Edge Locations.
- C) Execute serverless background tasks in response to database table mutations.
- D) Establish a dedicated 10 Gbps private fiber-optic connection between an on-premises data center and AWS.

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **B) Deliver dynamic, static web content and APIs to customers globally with low latency via Edge Locations.**

**Detailed Explanation**:
- **Amazon CloudFront** is a global Content Delivery Network (CDN) service that securely caches content at hundreds of Points of Presence (Edge Locations) worldwide to reduce latency and accelerate web application delivery.
- *Option A* describes Auto Scaling.
- *Option C* describes AWS Lambda with DynamoDB Streams.
- *Option D* describes AWS Direct Connect.

</details>

---

## 📝 Q4: Which pillar of the AWS Well-Architected Framework focuses on using computing resources efficiently to meet system requirements and maintaining that efficiency as demand changes?
- A) Operational Excellence
- B) Reliability
- C) Performance Efficiency
- D) Cost Optimization

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **C) Performance Efficiency**

**Detailed Explanation**:
- The **Performance Efficiency Pillar** focuses on selecting the right resource types and sizes based on workload requirements, monitoring performance, and taking advantage of serverless technologies to maintain high efficiency.
- *Operational Excellence (A)* focuses on running and monitoring systems to deliver business value.
- *Reliability (B)* focuses on recovering from infrastructure disruptions.
- *Cost Optimization (D)* focuses on eliminating unneeded spending.

</details>

---

## 📝 Q5: Which statement accurately describes the core functionality of Elastic Load Balancing (ELB)?
- A) It continuously audits user logins and records AWS API mutations across accounts.
- B) It automatically distributes incoming application traffic across multiple targets, such as Amazon EC2 instances, containers, and IP addresses.
- C) It provisions immutable Infrastructure as Code templates across multiple Regions.
- D) It encrypts S3 bucket objects using customer-managed cryptographic keys.

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **B) It automatically distributes incoming application traffic across multiple targets, such as Amazon EC2 instances, containers, and IP addresses.**

**Detailed Explanation**:
- **Elastic Load Balancing (ELB)** automatically distributes incoming application traffic across multiple targets in one or more Availability Zones, increasing fault tolerance. It includes Application Load Balancer (ALB), Network Load Balancer (NLB), and Gateway Load Balancer (GWLB).

</details>

---

## 📝 Q6: Which statement is TRUE regarding AWS Lambda?
- A) You must provision and manage the underlying Linux operating system kernel.
- B) You pay only for the compute time consumed while your code is actively running (measured in milliseconds).
- C) Lambda functions can execute indefinitely without any maximum execution timeout limit.
- D) Lambda runs only on dedicated physical EC2 hardware instances.

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **B) You pay only for the compute time consumed while your code is actively running (measured in milliseconds).**

**Detailed Explanation**:
- **AWS Lambda** is a serverless compute service where you pay strictly for the number of requests and duration of execution time (billed per millisecond). There are zero charges when your code is idle. Note that Lambda functions have a maximum execution timeout limit of 15 minutes (900 seconds).

</details>

---

## 📝 Q7: You are running an Amazon EC2 instance and require high-speed scratch storage for temporary caching. The data does not need to persist when the instance is stopped. Which storage type should you use?
- A) Amazon Elastic Block Store (EBS) General Purpose SSD (gp3)
- B) Amazon Elastic File System (EFS)
- C) Amazon S3 Glacier Deep Archive
- D) Amazon EC2 Instance Store

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **D) Amazon EC2 Instance Store**

**Detailed Explanation**:
- **EC2 Instance Store** provides temporary block-level storage located on disks physically attached to the host computer. It delivers ultra-high IOPS and lowest latency, but is **ephemeral**: all data is lost if the instance stops, terminates, or the underlying hardware fails.
- *EBS (A)* is persistent network-attached block storage that survives instance stops.

</details>

---

## 📝 Q8: Which tool enables an organization to visualize, understand, and manage AWS costs and usage over time, and forecast spending for the next 12 months?
- A) AWS Pricing Calculator
- B) AWS Cost Explorer
- C) AWS Budgets
- D) AWS Billing Conductor

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **B) AWS Cost Explorer**

**Detailed Explanation**:
- **AWS Cost Explorer** provides an interactive user interface to visualize, group, and filter historical AWS cost and usage data over time, identify spending anomalies, and generate predictive cost forecasts for up to 12 months.
- *Pricing Calculator (A)* estimates costs *before* provisioning resources.
- *AWS Budgets (C)* sets spending threshold alerts.

</details>

---

## 📝 Q9: Which category of AWS Trusted Advisor checks includes recommendations for identifying underutilized EC2 instances and idle RDS database instances?
- A) Security
- B) Fault Tolerance
- C) Cost Optimization
- D) Performance

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **C) Cost Optimization**

**Detailed Explanation**:
- **Cost Optimization** checks in AWS Trusted Advisor inspect your provisioned infrastructure to identify idle resources, low-utilization EC2 instances, unattached EBS volumes, and underutilized DB instances to eliminate wasted expenditure.

</details>

---

## 📝 Q10: What is the primary architectural difference between a Security Group and a Network Access Control List (NACL) in Amazon VPC?
- A) Security Groups operate at the subnet level; NACLs operate at the instance level.
- B) Security Groups are stateful (return traffic is automatically allowed); NACLs are stateless (inbound and outbound rules evaluated separately).
- C) Security Groups support both ALLOW and DENY rules; NACLs support only ALLOW rules.
- D) Security Groups evaluate rules in numeric order; NACLs evaluate all rules simultaneously.

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **B) Security Groups are stateful (return traffic is automatically allowed); NACLs are stateless (inbound and outbound rules evaluated separately).**

**Detailed Explanation**:
- **Security Groups** are stateful virtual firewalls attached to Elastic Network Interfaces (ENIs). If an inbound request is permitted, the return response is automatically allowed regardless of outbound rules.
- **NACLs** are stateless firewalls at the subnet boundary that evaluate numbered rules sequentially and require explicit inbound and outbound rules for bidirectional communication.

</details>

---

## 📝 Q11: Which service continuously monitors AWS account activity and analyzes CloudTrail management events, VPC Flow Logs, and DNS query logs using machine learning to identify unauthorized behavior and threats?
- A) Amazon Inspector
- B) AWS WAF
- C) Amazon GuardDuty
- D) AWS Shield

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **C) Amazon GuardDuty**

**Detailed Explanation**:
- **Amazon GuardDuty** is an intelligent threat detection service that continuously monitors and analyzes foundation data sources (CloudTrail, VPC Flow Logs, DNS logs, EKS audit logs) using ML and anomaly detection to identify compromised instances, credential exfiltration, and reconnaissance activity.
- *Amazon Inspector (A)* scans EC2 instances and ECR container images for software vulnerabilities (CVEs).

</details>

---

## 📝 Q12: Under the AWS Shared Responsibility Model, which of the following is an exclusive responsibility of AWS?
- A) Configuring operating system firewalls on EC2 instances.
- B) Encrypting sensitive customer data stored in Amazon S3 buckets.
- C) Decommissioning and physically destroying old storage drives and memory modules in data centers.
- D) Managing user IAM credentials and enforcing Multi-Factor Authentication (MFA).

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **C) Decommissioning and physically destroying old storage drives and memory modules in data centers.**

**Detailed Explanation**:
- AWS is responsible for **Security OF the Cloud**, which encompasses physical data center security, hardware maintenance, hardware disposal according to DoD standards, hypervisors, and core networking infrastructure.
- Options A, B, and D are customer responsibilities (**Security IN the Cloud**).

</details>

---

## 📝 Q13: A company needs to transfer 45 Petabytes (PB) of historical video archive data from an on-premises data center to Amazon S3 within a few weeks over a constrained 100 Mbps internet connection. Which AWS service is best suited?
- A) AWS Direct Connect
- B) AWS Snowmobile
- C) AWS Snowball Edge Storage Optimized
- D) AWS DataSync

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **B) AWS Snowmobile** (or multiple Snowball Edge devices)

**Detailed Explanation**:
- **AWS Snowmobile** is a 45-foot ruggedized shipping container pulled by a semi-trailer truck that can transport up to **100 PB** of data directly to AWS data centers, designed specifically for massive multi-petabyte/exabyte migrations where network transfer would take years.
- *Snowball Edge (C)* transfers up to 80 TB per device (would require over 550 devices).

</details>

---

## 📝 Q14: Which Amazon S3 storage class automatically optimizes storage costs by moving objects between three access tiers (Frequent, Infrequent, and Archive) without retrieval fees or operational overhead?
- A) Amazon S3 Standard-IA
- B) Amazon S3 One Zone-IA
- C) Amazon S3 Intelligent-Tiering
- D) Amazon S3 Glacier Instant Retrieval

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **C) Amazon S3 Intelligent-Tiering**

**Detailed Explanation**:
- **Amazon S3 Intelligent-Tiering** is the only cloud storage class that delivers automatic cost savings by moving objects between access tiers based on granular access pattern monitoring, without performance impact, operational overhead, or retrieval fees.

</details>

---

## 📝 Q15: Which AWS Support plan provides 24/7 access to Cloud Support Engineers via phone and chat, an SLA response time of under 15 minutes for business-critical system outages, and an assigned Technical Account Manager (TAM)?
- A) Developer Support
- B) Business Support
- C) Enterprise Support
- D) Basic Support

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **C) Enterprise Support**

**Detailed Explanation**:
- **Enterprise Support** is the highest tier of AWS support. It includes a dedicated Technical Account Manager (TAM), consultative architectural reviews with Solutions Architects, Support Concierge, and an SLA of $< 15\text{ minutes}$ for business-critical system down scenarios.
- *Business Support (B)* offers 1-hour SLA for production system down but does not include an assigned TAM.

</details>

---

## 📝 Q16: Which AWS service allows you to define, provision, and update cloud infrastructure resources in a predictable, automated manner using declarative JSON or YAML templates?
- A) AWS CodeDeploy
- B) AWS CloudFormation
- C) AWS OpsWorks
- D) AWS Elastic Beanstalk

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **B) AWS CloudFormation**

**Detailed Explanation**:
- **AWS CloudFormation** is AWS's native Infrastructure as Code (IaC) service that allows developers to model a collection of related AWS and third-party resources, provision them quickly and consistently, and manage them throughout their lifecycle via declarative templates.

</details>

---

## 📝 Q17: A company wants to run a fully managed relational database that provides full compatibility with MySQL and PostgreSQL, but offers up to 5x higher throughput and automated 6-way storage replication across 3 Availability Zones. Which service should they choose?
- A) Amazon DynamoDB
- B) Amazon DocumentDB
- C) Amazon Aurora
- D) Amazon Redshift

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **C) Amazon Aurora**

**Detailed Explanation**:
- **Amazon Aurora** is a cloud-native relational database engine fully compatible with MySQL and PostgreSQL. It features a distributed, fault-tolerant storage system that replicates 6 copies of data across 3 Availability Zones and delivers up to 5x throughput of standard MySQL.

</details>

---

## 📝 Q18: What is the primary purpose of an Amazon VPC Internet Gateway (IGW)?
- A) To encrypt all internal inter-subnet communications using IPsec.
- B) To provide a target in VPC route tables for internet-routable traffic, enabling bidirectional communication between public subnets and the internet.
- C) To perform Network Address Translation for private subnets without assigning public IPs.
- D) To inspect Layer 7 web traffic for SQL injection attacks.

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **B) To provide a target in VPC route tables for internet-routable traffic, enabling bidirectional communication between public subnets and the internet.**

**Detailed Explanation**:
- An **Internet Gateway (IGW)** is a horizontally scaled, redundant, and highly available VPC component that enables communication between instances in your public subnets and the public internet.
- *Option C* describes a NAT Gateway.
- *Option D* describes AWS WAF.

</details>

---

## 📝 Q19: Which AWS compliance and security service provides on-demand, self-service downloads of AWS security and compliance reports (such as SOC 1/2/3, ISO certifications, and PCI-DSS) as well as Business Associate Addendums (BAA)?
- A) AWS Secrets Manager
- B) AWS Artifact
- C) Amazon GuardDuty
- D) AWS Security Hub

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **B) AWS Artifact**

**Detailed Explanation**:
- **AWS Artifact** is your go-to central resource for compliance-related information. It provides on-demand access to AWS's security and compliance reports and select online agreements (such as the HIPAA BAA).

</details>

---

## 📝 Q20: Which AWS service enables decoupling of distributed microservice application components through asynchronous, durable, first-in-first-out (FIFO) or standard message queues?
- A) Amazon Simple Notification Service (Amazon SNS)
- B) Amazon Simple Queue Service (Amazon SQS)
- C) Amazon EventBridge
- D) AWS Step Functions

<details>
<summary><b>Reveal Answer & Explanation</b></summary>

**Correct Answer**: **B) Amazon Simple Queue Service (Amazon SQS)**

**Detailed Explanation**:
- **Amazon SQS** is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. SQS eliminates the complexity and overhead associated with managing message-oriented middleware.
- *Amazon SNS (A)* is a publisher/subscriber (pub/sub) fanout notification service.

</details>

---

## 🔗 Graph-Linked Knowledge Base
- ⚓ Mindmap: [[aws_clf_c02_mindmap|AWS CLF-C02 Mindmap]]
- ⚓ Flashcard Deck: [[aws_clf_c02_flashcards|AWS CLF-C02 Flashcards]]
- 🔗 Cloud Concepts: [[aws_cloud_concepts_waf|AWS Cloud Concepts & WAF]]
