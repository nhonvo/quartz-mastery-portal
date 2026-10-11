---


title: "Reading 1.2: What is Cloud Computing & AWS Architecture?"
description: "Master-level foundational guide on Cloud Computing fundamentals, IaaS/PaaS/SaaS service models, Public/Private/Hybrid deployment models, the 6 core business advantages of AWS, and eliminating undifferentiated heavy lifting."
category: "AWS Cloud Practitioner & Certifications"
tags: [aws, cloud-computing, iaas, paas, saas, hybrid-cloud, capex-opex, well-architected, fundamentals, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---

# Reading 1.2: What is Cloud Computing & AWS Architecture?

---

## 1. Executive Summary: The Paradigm Shift in Enterprise IT

Historically, companies were forced to design, finance, construct, and maintain their own on-premises physical data centers. Provisioning an application required multi-month hardware procurement cycles, physical delivery of rack-mounted servers, power grid and cooling system engineering, manual network cabling, operating system installation, and ongoing maintenance.

**Cloud Computing** fundamentally transforms enterprise technology by delivering **on-demand computing power, database storage, applications, and other IT resources over the internet with pay-as-you-go pricing**.

Instead of buying, owning, and maintaining physical servers, organizations consume compute power, storage, and networking as a dynamic utility service from **Amazon Web Services (AWS)**.

```mermaid
flowchart TD
    subgraph TraditionalOnPrem["Traditional On-Premises Data Center (CapEx Model)"]
        Procure["1. Budget Approval & Vendor Procurement (3 - 6 Months)"]
        Hardware["2. Physical Racking, Cabling, Power & Cooling"]
        OS["3. Hypervisor & OS Installation"]
        Deploy1["4. Slow Application Deployment"]
        Procure --> Hardware --> OS --> Deploy1
    end

    subgraph AWSCloudNative["AWS Cloud-Native Computing (OpEx Model)"]
        API["1. On-Demand API Call / Terraform IaC (Milliseconds)"]
        AutoProv["2. Instant Virtualized Resource Provisioning"]
        Deploy2["3. Automated CI/CD Deployment (Minutes)"]
        Scale["4. Dynamic Elastic Auto-Scaling on Demand"]
        API --> AutoProv --> Deploy2 --> Scale
    end
```

---

## 2. Cloud Service Models: IaaS vs. PaaS vs. Serverless vs. SaaS

Understanding the technical boundaries of abstraction dictates the operational model and shared responsibilities between the customer and AWS:

```mermaid
flowchart LR
    subgraph IaaS["1. Infrastructure as a Service (IaaS)"]
        I1["AWS manages: Hardware, Datacenter, Hypervisor"]
        I2["Customer manages: Guest OS, Patches, Runtime, App, Data"]
        I3["Examples: Amazon EC2, Amazon EBS, Amazon VPC"]
    end

    subgraph PaaS["2. Platform as a Service (PaaS)"]
        P1["AWS manages: Hardware, OS, Runtime, Scaling, Patching"]
        P2["Customer manages: Application Code & Data"]
        P3["Examples: AWS Elastic Beanstalk, AWS App Runner"]
    end

    subgraph Serverless["3. Function as a Service / Serverless"]
        F1["AWS manages: Complete Infrastructure & Execution Life"]
        F2["Customer manages: Stateless Code Functions & Triggers"]
        F3["Examples: AWS Lambda, AWS Fargate, Amazon Aurora Serverless"]
    end

    subgraph SaaS["4. Software as a Service (SaaS)"]
        S1["AWS/Vendor manages: 100% of Stack & Software"]
        S2["Customer manages: User Accounts & Configurations"]
        S3["Examples: Amazon QuickSight, AWS Wickr, WorkSpaces"]
    end
```

### 2.1 Service Model Comparison Matrix

| Dimension | On-Premises | IaaS (e.g. EC2) | PaaS (e.g. Elastic Beanstalk) | Serverless (e.g. Lambda) | SaaS (e.g. QuickSight) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Physical Facilities & Power** | Customer | **AWS** | **AWS** | **AWS** | **AWS** |
| **Physical Network & Servers** | Customer | **AWS** | **AWS** | **AWS** | **AWS** |
| **Virtualization / Hypervisor** | Customer | **AWS** | **AWS** | **AWS** | **AWS** |
| **Operating System & Kernel** | Customer | Customer | **AWS** | **AWS** | **AWS** |
| **Runtime & Language Engines** | Customer | Customer | **AWS** | **AWS** | **AWS** |
| **Scaling & High Availability** | Customer | Customer Configured | Automated / Configured | **Fully Automatic** | **Fully Managed** |
| **Application Logic & Code** | Customer | Customer | Customer | Customer | **Vendor** |
| **Customer Data & Access IAM** | Customer | Customer | Customer | Customer | Customer |

---

## 3. Cloud Deployment Models: Public, Private, Hybrid & Multi-Cloud

```mermaid
flowchart TD
    Deployment["Cloud Deployment Topologies"]
    Deployment --> Public["1. Public Cloud (100% AWS)<br/>- Complete application stack runs in AWS global infrastructure<br/>- Maximum elasticity, zero physical footprint"]
    Deployment --> Hybrid["2. Hybrid Cloud (AWS + On-Premises)<br/>- Connects on-prem data centers with AWS via Direct Connect / VPN<br/>- Utilizes AWS Outposts for local low-latency processing"]
    Deployment --> Private["3. Private Cloud<br/>- Dedicated infrastructure on-premises; complete self-management"]
```

---

## 4. The 6 Core Financial & Strategic Advantages of AWS

AWS encapsulates the business case for cloud computing into six foundational principles:

```mermaid
graph TD
    Adv["6 Advantages of Cloud Computing"]
    Adv --> A1["1. Trade Capital Expense (CapEx) for Variable Expense (OpEx)"]
    Adv --> A2["2. Benefit from Massive Economies of Scale"]
    Adv --> A3["3. Stop Guessing Capacity (Elasticity)"]
    Adv --> A4["4. Increase Speed and Agility"]
    Adv --> A5["5. Stop Spending Money Running Data Centers (No Undifferentiated Heavy Lifting)"]
    Adv --> A6["6. Go Global in Minutes"]
```

### 4.1 In-Depth Breakdown of the 6 Advantages
1. **Trade Capital Expense (CapEx) for Variable Expense (OpEx)**:
   - Instead of investing millions of dollars upfront in data center real estate, cooling generators, and racks of servers before knowing how your product will perform, you pay only when you consume compute resources, and only for the exact seconds they run.
2. **Benefit from Massive Economies of Scale**:
   - Because hundreds of thousands of active customers aggregate their usage onto AWS, AWS achieves massive purchasing power on silicon, network hardware, and power. This enables AWS to systematically pass operational cost reductions back to customers (over 130+ proactive price reductions since inception).
3. **Stop Guessing Capacity**:
   - In traditional environments, engineers had to guess traffic demand for the next 3 years. Guessing too high led to expensive idle servers; guessing too low resulted in server crashes during traffic spikes. Cloud **Elasticity** provisions capacity automatically to match demand in real time.
4. **Increase Speed and Agility**:
   - In on-premises setups, provisioning test environments takes weeks. In AWS, developers provision isolated environments in seconds via automated scripts, dramatically accelerating innovation cycles and time-to-market.
5. **Stop Spending Money on "Undifferentiated Heavy Lifting"**:
   - Racking servers, replacing failed hard drives, upgrading hypervisors, and managing backup tapes do not differentiate your business from your competitors. Offloading infrastructure maintenance to AWS allows your engineering talent to focus $100\%$ on business code and customer experience.
6. **Go Global in Minutes**:
   - Deploy applications across multiple global geographic Regions with minimal latency using Amazon CloudFront and AWS global backbone fiber.

---

## 5. Total Cost of Ownership (TCO) & Economic Modeling

When evaluating cloud migrations, organizations evaluate the **Total Cost of Ownership (TCO)**, which includes both direct and indirect expenses:

$$\text{On-Premises TCO} = \text{Hardware Acquisition} + \text{Data Center Facility Lease} + \text{Power \& Cooling} + \text{IT Administration Staff} + \text{Hardware Depreciation}$$

$$\text{AWS Cloud TCO} = \sum (\text{Actual Compute, Storage \& Network Consumed}) + \text{Cloud Engineering Staff}$$

```mermaid
flowchart LR
    subgraph OnPremCost["On-Premises TCO Burden"]
        C1["Hardware Depreciation (3-Year Refresh Cycle)"]
        C2["Data Center Space, Power, UPS Generators, Air Conditioning"]
        C3["Network Carrier Line Leases & Maintenance Contracts"]
        C4["Over-Provisioned Headroom Buffer (Unused 80% of the time)"]
    end

    subgraph AWSCloudCost["AWS Cost Optimization Model"]
        AC1["Pay only for active usage (Per-Second Billing)"]
        AC2["Auto-scaling dynamically scales down at night"]
        AC3["Spot & Savings Plans deliver up to 72% - 90% discounts"]
    end
```

---

## 6. Real-World Architectural Transformation: The Monolith to Cloud-Native

```mermaid
flowchart TD
    subgraph OnPremMonolith["Legacy On-Premises Architecture (Single Point of Failure)"]
        Users1["Users"] --> FW["Hardware Firewall"]
        FW --> Server["Single Massive Bare-Metal Server (App + Database)"]
        Server --> LocalDisk[("Local SAS Disks (Single Point of Failure)")]
    end

    subgraph CloudNativeAWS["Modern AWS Cloud-Native Architecture (Highly Available & Self-Healing)"]
        Users2["Global Users"] --> CF["Amazon CloudFront CDN (Global Caching)"]
        CF --> Route53["Amazon Route 53 (Latency Routing)"]
        Route53 --> ALB["Application Load Balancer"]
        
        ALB --> ASG["Auto Scaling Group across 3 AZs"]
        ASG --> EC2A["EC2 Instance (AZ 1a)"]
        ASG --> EC2B["EC2 Instance (AZ 1b)"]
        ASG --> EC2C["EC2 Instance (AZ 1c)"]
        
        EC2A & EC2B & EC2C --> Aurora[("Amazon Aurora Multi-AZ Cluster (6-Way Replicated Storage)")]
    end
```

---

## 🔗 Graph-Linked Knowledge Base
- ⚓ Global Infrastructure: [[Reading 1.3 AWS Global Infrastructure|Reading 1.3: AWS Global Infrastructure]]
- ⚓ Shared Responsibility: [[Reading 1.5 Security and the AWS Shared Responsibility Model|Reading 1.5: Security & Shared Responsibility]]
- 🔗 Cloud Concepts: [[aws_cloud_concepts_waf|AWS Cloud Concepts & WAF]]
