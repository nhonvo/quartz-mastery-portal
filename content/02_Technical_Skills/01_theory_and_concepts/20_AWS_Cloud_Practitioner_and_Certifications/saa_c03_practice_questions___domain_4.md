---


title: "Practice Questions: Domain 4 — Design Cost-Optimized Architectures"
description: "Master-level architecture and implementation guide for Practice Questions: Domain 4 — Design Cost-Optimized Architectures covering core theory, runtime mechanics, and production best practices."
category: "AWS Cloud Architecture & Practitioner"
tags: [aws, cloud, architecture, practitioner, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Practice Questions: Domain 4 — Design Cost-Optimized Architectures

## 📝 Q1: A retail company has developed a REST API which is deployed ...

A retail company has developed a REST API which is deployed in an Auto Scaling group behind an Application Load Balancer. The REST API stores the user data in Amazon DynamoDB and any static content, such as images, are served via Amazon Simple Storage Service (Amazon S3). On analyzing the usage trends, it is found that 90% of the read requests are for commonly accessed data across all users.

### Options
- [ ] **A)** As a Solutions Architect, which of the following would you suggest as the MOST efficient solution to improve the application performance?
- [ ] **B)** Enable Amazon DynamoDB Accelerator (DAX) for Amazon DynamoDB and Amazon CloudFront for Amazon S3

Enable ElastiCache Redis for DynamoDB and Amazon CloudFront for Amazon S3

Enable ElastiCache Redis for DynamoDB and ElastiCache Memcached for Amazon S3

Enable Amazon DynamoDB Accelerator (DAX) for Amazon DynamoDB and ElastiCache Memcached for Amazon S3

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Enable Amazon DynamoDB Accelerator (DAX) for Amazon DynamoDB and Amazon CloudFront for Amazon S3

Enable ElastiCache Redis for DynamoDB and Amazon CloudFront for Amazon S3

Enable ElastiCache Redis for DynamoDB and ElastiCache Memcached for Amazon S3

Enable Amazon DynamoDB Accelerator (DAX) for Amazon DynamoDB and ElastiCache Memcached for Amazon S3**

### Detailed Explanation
Correct option:

**Enable Amazon DynamoDB Accelerator (DAX) for Amazon DynamoDB and Amazon CloudFront for Amazon S3**

Amazon DynamoDB Accelerator (DAX) is a fully managed, highly available, in-memory cache for Amazon DynamoDB that delivers up to a 10 times performance improvement—from milliseconds to microseconds—even at millions of requests per second.

Amazon DynamoDB Accelerator (DAX) is tightly integrated with Amazon DynamoDB—you simply provision a DAX cluster, use the DAX client SDK to point your existing Amazon DynamoDB API calls at the DAX cluster, and let DAX handle the rest. Because DAX is API-compatible with Amazon DynamoDB, you don't have to make any functional application code changes. DAX is used to natively cache Amazon DynamoDB reads.

Amazon CloudFront is a content delivery network (CDN) service that delivers static and dynamic web content, video streams, and APIs around the world, securely and at scale. By design, delivering data out of Amazon CloudFront can be more cost-effective than delivering it from S3 directly to your users.

When a user requests content that you serve with CloudFront, their request is routed to a nearby Edge Location. If CloudFront has a cached copy of the requested file, CloudFront delivers it to the user, providing a fast (low-latency) response. If the file they’ve requested isn’t yet cached, CloudFront retrieves it from your origin – for example, the Amazon S3 bucket where you’ve stored your content.

So, you can use Amazon CloudFront to improve application performance to serve static content from Amazon S3.

Incorrect options:

**Enable ElastiCache Redis for DynamoDB and Amazon CloudFront for Amazon S3**

Amazon ElastiCache for Redis is a blazing fast in-memory data store that provides sub-millisecond latency to power internet-scale real-time applications. Amazon ElastiCache for Redis is a great choice for real-time transactional and analytical processing use cases such as caching, chat/messaging, gaming leaderboards, geospatial, machine learning, media streaming, queues, real-time analytics, and session store.

Amazon ElastiCache for Redis Overview:

![img](https://d1.awsstatic.com/elasticache/EC_Use_Cases/product-page-diagram_ElastiCache_redis_how-it-works.eac60b60768c2a2041cc0b2673e7f5d2a0fef6a1.png)

 via - <https://aws.amazon.com/elasticache/redis/>

Although you can integrate Redis with DynamoDB, it's much more involved than using DAX which is a much better fit.

**Enable Amazon DynamoDB Accelerator (DAX) for Amazon DynamoDB and ElastiCache Memcached for Amazon S3**

**Enable ElastiCache Redis for DynamoDB and ElastiCache Memcached for Amazon S3**

Amazon ElastiCache for Memcached is a Memcached-compatible in-memory key-value store service that can be used as a cache or a data store. Amazon ElastiCache for Memcached is a great choice for implementing an in-memory cache to decrease access latency, increase throughput, and ease the load off your relational or NoSQL database.

Amazon ElastiCache Memcached cannot be used as a cache to serve static content from Amazon S3, so both these options are incorrect.

References:

<https://aws.amazon.com/dynamodb/dax/>

<https://aws.amazon.com/blogs/networking-and-content-delivery/amazon-s3-amazon-cloudfront-a-match-made-in-the-cloud/>

<https://aws.amazon.com/elasticache/redis/>

</details>

---

## 📝 Q2: A media company wants to get out of the business of owning a...

A media company wants to get out of the business of owning and maintaining its own IT infrastructure. As part of this digital transformation, the media company wants to archive about 5 petabytes of data in its on-premises data center to durable long term storage.

### Options
- [ ] **A)** As a solutions architect, what is your recommendation to migrate this data in the MOST cost-optimal way?
- [ ] **B)** Setup AWS Site-to-Site VPN connection between the on-premises data center and AWS Cloud. Use this connection to transfer the data into Amazon S3 Glacier
- [ ] **C)** Transfer the on-premises data into multiple AWS Snowball Edge Storage Optimized devices. Copy the AWS Snowball Edge data into Amazon S3 and create a lifecycle policy to transition the data into Amazon S3 Glacier

Transfer the on-premises data into multiple AWS Snowball Edge Storage Optimized devices. Copy the AWS Snowball Edge data into Amazon S3 Glacier

Setup AWS direct connect between the on-premises data center and AWS Cloud. Use this connection to transfer the data into Amazon S3 Glacier

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Transfer the on-premises data into multiple AWS Snowball Edge Storage Optimized devices. Copy the AWS Snowball Edge data into Amazon S3 and create a lifecycle policy to transition the data into Amazon S3 Glacier

Transfer the on-premises data into multiple AWS Snowball Edge Storage Optimized devices. Copy the AWS Snowball Edge data into Amazon S3 Glacier

Setup AWS direct connect between the on-premises data center and AWS Cloud. Use this connection to transfer the data into Amazon S3 Glacier**

### Detailed Explanation
Correct option:

**Transfer the on-premises data into multiple AWS Snowball Edge Storage Optimized devices. Copy the AWS Snowball Edge data into Amazon S3 and create a lifecycle policy to transition the data into Amazon S3 Glacier**

AWS Snowball Edge Storage Optimized is the optimal choice if you need to securely and quickly transfer dozens of terabytes to petabytes of data to AWS. It provides up to 80 TB of usable HDD storage, 40 vCPUs, 1 TB of SATA SSD storage, and up to 40 Gb network connectivity to address large scale data transfer and pre-processing use cases. The data stored on AWS Snowball Edge device can be copied into Amazon S3 bucket and later transitioned into Amazon S3 Glacier via a lifecycle policy. You can't directly copy data from AWS Snowball Edge devices into Amazon S3 Glacier.

Incorrect options:

**Transfer the on-premises data into multiple AWS Snowball Edge Storage Optimized devices. Copy the AWS Snowball Edge data into Amazon S3 Glacier** - As mentioned earlier, you can't directly copy data from AWS Snowball Edge devices into Amazon S3 Glacier. Hence, this option is incorrect.

**Setup AWS direct connect between the on-premises data center and AWS Cloud. Use this connection to transfer the data into Amazon S3 Glacier** - AWS Direct Connect lets you establish a dedicated network connection between your network and one of the AWS Direct Connect locations. Using industry-standard 802.1q VLANs, this dedicated connection can be partitioned into multiple virtual interfaces. Direct Connect involves significant monetary investment and takes more than a month to set up, therefore it's not the correct fit for this use-case where just a one-time data transfer has to be done.

**Setup AWS Site-to-Site VPN connection between the on-premises data center and AWS Cloud. Use this connection to transfer the data into Amazon S3 Glacier** - AWS Site-to-Site VPN enables you to securely connect your on-premises network or branch office site to your Amazon Virtual Private Cloud (Amazon VPC). VPN Connections are a good solution if you have an immediate need, and have low to modest bandwidth requirements. Because of the high data volume for the given use-case, Site-to-Site VPN is not the correct choice.

Reference:

<https://aws.amazon.com/snowball/>

</details>

---

## 📝 Q3: A media agency stores its re-creatable assets on Amazon Simp...

A media agency stores its re-creatable assets on Amazon Simple Storage Service (Amazon S3) buckets. The assets are accessed by a large number of users for the first few days and the frequency of access falls down drastically after a week. Although the assets would be accessed occasionally after the first week, but they must continue to be immediately accessible when required. The cost of maintaining all the assets on Amazon S3 storage is turning out to be very expensive and the agency is looking at reducing costs as much as possible.

### Options
- [ ] **A)** As an AWS Certified Solutions Architect – Associate, can you suggest a way to lower the storage costs while fulfilling the business requirements?
- [ ] **B)** Configure a lifecycle policy to transition the objects to Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) after 30 days

Configure a lifecycle policy to transition the objects to Amazon S3 Standard-Infrequent Access (S3 Standard-IA) after 7 days

Configure a lifecycle policy to transition the objects to Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) after 7 days
- [ ] **C)** Configure a lifecycle policy to transition the objects to Amazon S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Configure a lifecycle policy to transition the objects to Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) after 30 days

Configure a lifecycle policy to transition the objects to Amazon S3 Standard-Infrequent Access (S3 Standard-IA) after 7 days

Configure a lifecycle policy to transition the objects to Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) after 7 days**

### Detailed Explanation
Correct option:

**Configure a lifecycle policy to transition the objects to Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) after 30 days**

Amazon S3 One Zone-IA is for data that is accessed less frequently, but requires rapid access when needed. Unlike other S3 Storage Classes which store data in a minimum of three Availability Zones (AZs), Amazon S3 One Zone-IA stores data in a single Availability Zone (AZ) and costs 20% less than Amazon S3 Standard-IA. Amazon S3 One Zone-IA is ideal for customers who want a lower-cost option for infrequently accessed and re-creatable data but do not require the availability and resilience of Amazon S3 Standard or Amazon S3 Standard-IA. The minimum storage duration is 30 days before you can transition objects from Amazon S3 Standard to Amazon S3 One Zone-IA.

Amazon S3 One Zone-IA offers the same high durability, high throughput, and low latency of Amazon S3 Standard, with a low per GB storage price and per GB retrieval fee. S3 Storage Classes can be configured at the object level, and a single bucket can contain objects stored across Amazon S3 Standard, Amazon S3 Intelligent-Tiering, Amazon S3 Standard-IA, and Amazon S3 One Zone-IA. You can also use S3 Lifecycle policies to automatically transition objects between storage classes without any application changes.

Constraints for Lifecycle storage class transitions:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt1-q8-i1.jpg)

 via - <https://docs.aws.amazon.com/AmazonS3/latest/dev/lifecycle-transition-general-considerations.html>

Supported Amazon S3 lifecycle transitions:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt1-q8-i2.jpg)

 via - <https://docs.aws.amazon.com/AmazonS3/latest/dev/lifecycle-transition-general-considerations.html>

Incorrect options:

**Configure a lifecycle policy to transition the objects to Amazon S3 Standard-Infrequent Access (S3 Standard-IA) after 7 days**

**Configure a lifecycle policy to transition the objects to Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) after 7 days**

As mentioned earlier, the minimum storage duration is 30 days before you can transition objects from Amazon S3 Standard to Amazon S3 One Zone-IA or Amazon S3 Standard-IA, so both these options are added as distractors.

**Configure a lifecycle policy to transition the objects to Amazon S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days** - Amazon S3 Standard-IA is for data that is accessed less frequently, but requires rapid access when needed. S3 Standard-IA offers the high durability, high throughput, and low latency of Amazon S3 Standard, with a low per GB storage price and per GB retrieval fee. This combination of low cost and high performance makes Amazon S3 Standard-IA ideal for long-term storage, backups, and as a data store for disaster recovery files. But, it costs more than Amazon S3 One Zone-IA because of the redundant storage across Availability Zones (AZs). As the data is re-creatable, so you don't need to incur this additional cost.

References:

<https://aws.amazon.com/s3/storage-classes/>

<https://docs.aws.amazon.com/AmazonS3/latest/dev/lifecycle-transition-general-considerations.html>

</details>

---

## 📝 Q4: A retail company maintains an AWS Direct Connect connection ...

A retail company maintains an AWS Direct Connect connection to AWS and has recently migrated its data warehouse to AWS. The data analysts at the company query the data warehouse using a visualization tool. The average size of a query returned by the data warehouse is 60 megabytes and the query responses returned by the data warehouse are not cached in the visualization tool. Each webpage returned by the visualization tool is approximately 600 kilobytes. Which of the following options offers the LOWEST data transfer egress cost for the company?

### Options
- [ ] **A)** Deploy the visualization tool in the same AWS region as the data warehouse. Access the visualization tool over a Direct Connect connection at a location in the same region
- [ ] **B)** Deploy the visualization tool in the same AWS region as the data warehouse. Access the visualization tool over the internet at a location in the same region
- [ ] **C)** Deploy the visualization tool on-premises. Query the data warehouse directly over an AWS Direct Connect connection at a location in the same AWS region
- [ ] **D)** Deploy the visualization tool on-premises. Query the data warehouse over the internet at a location in the same AWS region

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Deploy the visualization tool in the same AWS region as the data warehouse. Access the visualization tool over a Direct Connect connection at a location in the same region**

### Detailed Explanation
Correct option:

**Deploy the visualization tool in the same AWS region as the data warehouse. Access the visualization tool over a Direct Connect connection at a location in the same region**

AWS Direct Connect is a networking service that provides an alternative to using the internet to connect to AWS. Using AWS Direct Connect, data that would have previously been transported over the internet is delivered through a private network connection between your on-premises data center and AWS.

For the given use case, the main pricing parameter while using the AWS Direct Connect connection is the Data Transfer Out (DTO) from AWS to the on-premises data center. DTO refers to the cumulative network traffic that is sent through AWS Direct Connect to destinations outside of AWS. This is charged per gigabyte (GB), and unlike capacity measurements, DTO refers to the amount of data transferred, not the speed.

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt5-q2-i2.jpg)

 via - <https://aws.amazon.com/directconnect/pricing/>

Each query response is 60 megabytes in size and each webpage for the visualization tool is 600 kilobytes in size. If you deploy the visualization tool in the same AWS region as the data warehouse, then you only need to pay for the 600 kilobytes of DTO charges for the webpage. Therefore this option is correct.

However, if you deploy the visualization tool on-premises, then you need to pay for the 60 MB of DTO charges for the query response from the data warehouse to the visualization tool.

Incorrect options:

**Deploy the visualization tool in the same AWS region as the data warehouse. Access the visualization tool over the internet at a location in the same region**

**Deploy the visualization tool on-premises. Query the data warehouse over the internet at a location in the same AWS region**

Data transfer pricing over AWS Direct Connect is lower than data transfer pricing over the internet, so both of these options are incorrect.

**Deploy the visualization tool on-premises. Query the data warehouse directly over an AWS Direct Connect connection at a location in the same AWS region** - As mentioned in the explanation above, if you deploy the visualization tool on-premises, then you need to pay for the 60 megabytes of DTO charges for the query response from the data warehouse to the visualization tool. So this option is incorrect.

References:

<https://aws.amazon.com/directconnect/pricing/>

<https://aws.amazon.com/getting-started/hands-on/connect-data-center-to-aws/services-costs/>

<https://aws.amazon.com/directconnect/faqs/>

</details>

---

## 📝 Q5: The engineering team at an e-commerce company is working on ...

The engineering team at an e-commerce company is working on cost optimizations for Amazon Elastic Compute Cloud (Amazon EC2) instances. The team wants to manage the workload using a mix of on-demand and spot instances across multiple instance types. They would like to create an Auto Scaling group with a mix of these instances.

### Options
- [ ] **A)** Which of the following options would allow the engineering team to provision the instances for this use-case?
- [ ] **B)** You can neither use a launch configuration nor a launch template to provision capacity across multiple instance types using both On-Demand Instances and Spot Instances to achieve the desired scale, performance, and cost
- [ ] **C)** You can only use a launch template to provision capacity across multiple instance types using both On-Demand Instances and Spot Instances to achieve the desired scale, performance, and cost

You can only use a launch configuration to provision capacity across multiple instance types using both On-Demand Instances and Spot Instances to achieve the desired scale, performance, and cost
- [ ] **D)** You can use a launch configuration or a launch template to provision capacity across multiple instance types using both On-Demand Instances and Spot Instances to achieve the desired scale, performance, and cost

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **You can only use a launch template to provision capacity across multiple instance types using both On-Demand Instances and Spot Instances to achieve the desired scale, performance, and cost

You can only use a launch configuration to provision capacity across multiple instance types using both On-Demand Instances and Spot Instances to achieve the desired scale, performance, and cost**

### Detailed Explanation
Correct option:

**You can only use a launch template to provision capacity across multiple instance types using both On-Demand Instances and Spot Instances to achieve the desired scale, performance, and cost**

A launch template is similar to a launch configuration, in that it specifies instance configuration information such as the ID of the Amazon Machine Image (AMI), the instance type, a key pair, security groups, and the other parameters that you use to launch EC2 instances. Also, defining a launch template instead of a launch configuration allows you to have multiple versions of a template.

With launch templates, you can provision capacity across multiple instance types using both On-Demand Instances and Spot Instances to achieve the desired scale, performance, and cost. Hence this is the correct option.

Incorrect options:

**You can only use a launch configuration to provision capacity across multiple instance types using both On-Demand Instances and Spot Instances to achieve the desired scale, performance, and cost**

**You can use a launch configuration or a launch template to provision capacity across multiple instance types using both On-Demand Instances and Spot Instances to achieve the desired scale, performance, and cost**

A launch configuration is an instance configuration template that an Auto Scaling group uses to launch EC2 instances. When you create a launch configuration, you specify information for the instances such as the ID of the Amazon Machine Image (AMI), the instance type, a key pair, one or more security groups, and a block device mapping.

You cannot use a launch configuration to provision capacity across multiple instance types using both On-Demand Instances and Spot Instances. Therefore both these options are incorrect.

**You can neither use a launch configuration nor a launch template to provision capacity across multiple instance types using both On-Demand Instances and Spot Instances to achieve the desired scale, performance, and cost** - You can use a launch template to provision capacity across multiple instance types using both On-Demand Instances and Spot Instances. So this option is incorrect.

References:

<https://docs.aws.amazon.com/autoscaling/ec2/userguide/LaunchTemplates.html>

<https://docs.aws.amazon.com/autoscaling/ec2/userguide/LaunchConfiguration.html>

</details>

---

## 📝 Q6: A development team has deployed a microservice to the Amazon...

A development team has deployed a microservice to the Amazon Elastic Container Service (Amazon ECS). The application layer is in a Docker container that provides both static and dynamic content through an Application Load Balancer. With increasing load, the Amazon ECS cluster is experiencing higher network usage. The development team has looked into the network usage and found that 90% of it is due to distributing static content of the application.

### Options
- [ ] **A)** As a Solutions Architect, what do you recommend to improve the application's network usage and decrease costs?
- [ ] **B)** Distribute the dynamic content through Amazon EFS
- [ ] **C)** Distribute the dynamic content through Amazon S3
- [ ] **D)** Distribute the static content through Amazon S3

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Distribute the static content through Amazon S3**

### Detailed Explanation
Correct option:

**Distribute the static content through Amazon S3**

You can use Amazon S3 to host a static website. On a static website, individual web pages include static content. They might also contain client-side scripts. To host a static website on Amazon S3, you configure an Amazon S3 bucket for website hosting and then upload your website content to the bucket. When you configure a bucket as a static website, you must enable website hosting, set permissions, and create and add an index document. Depending on your website requirements, you can also configure redirects, web traffic logging, and a custom error document.

Distributing the static content through Amazon S3 allows us to offload most of the network usage to Amazon S3 and free up our applications running on Amazon ECS.

Incorrect options:

**Distribute the dynamic content through Amazon S3** - By contrast, a dynamic website relies on server-side processing, including server-side scripts such as PHP, JSP, or ASP.NET. Amazon S3 does not support server-side scripting, but AWS has other resources for hosting dynamic websites.

**Distribute the static content through Amazon EFS**

**Distribute the dynamic content through Amazon EFS**

Amazon Elastic File System (Amazon EFS) provides a simple, scalable, fully managed elastic NFS file system for use with AWS Cloud services and on-premises resources. Using Amazon EFS for static or dynamic content will not change anything as static content on EFS would still have to be distributed by the Amazon ECS instances.

References:

<https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html>

</details>

---

## 📝 Q7: A startup's cloud infrastructure consists of a few Amazon EC...

A startup's cloud infrastructure consists of a few Amazon EC2 instances, Amazon RDS instances and Amazon S3 storage. A year into their business operations, the startup is incurring costs that seem too high for their business requirements. Which of the following options represents a valid cost-optimization solution?

### Options
- [ ] **A)** Use AWS Compute Optimizer recommendations to help you choose the optimal Amazon EC2 purchasing options and help reserve your instance capacities at reduced costs
- [ ] **B)** Use AWS Cost Explorer Resource Optimization to get a report of Amazon EC2 instances that are either idle or have low utilization and use AWS Compute Optimizer to look at instance type recommendations
- [ ] **C)** Use AWS Trusted Advisor checks on Amazon EC2 Reserved Instances to automatically renew reserved instances (RI). AWS Trusted advisor also suggests Amazon RDS idle database instances
- [ ] **D)** Use Amazon S3 Storage class analysis to get recommendations for transitions of objects to Amazon S3 Glacier storage classes to reduce storage costs. You can also automate moving these objects into lower-cost storage tier using Lifecycle Policies

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use AWS Cost Explorer Resource Optimization to get a report of Amazon EC2 instances that are either idle or have low utilization and use AWS Compute Optimizer to look at instance type recommendations**

### Detailed Explanation
Correct option:

**Use AWS Cost Explorer Resource Optimization to get a report of Amazon EC2 instances that are either idle or have low utilization and use AWS Compute Optimizer to look at instance type recommendations**

AWS Cost Explorer helps you identify under-utilized Amazon EC2 instances that may be downsized on an instance by instance basis within the same instance family, and also understand the potential impact on your AWS bill by taking into account your Reserved Instances and Savings Plans.

AWS Compute Optimizer recommends optimal AWS Compute resources for your workloads to reduce costs and improve performance by using machine learning to analyze historical utilization metrics. Compute Optimizer helps you choose the optimal Amazon EC2 instance types, including those that are part of an Amazon EC2 Auto Scaling group, based on your utilization data.

Incorrect options:

**Use Amazon S3 Storage class analysis to get recommendations for transitions of objects to Amazon S3 Glacier storage classes to reduce storage costs. You can also automate moving these objects into lower-cost storage tier using Lifecycle Policies** - By using Amazon S3 Analytics Storage Class analysis you can analyze storage access patterns to help you decide when to transition the right data to the right storage class. This new Amazon S3 analytics feature observes data access patterns to help you determine when to transition less frequently accessed STANDARD storage to the STANDARD_IA (IA, for infrequent access) storage class. Storage class analysis does not give recommendations for transitions to the ONEZONE_IA or S3 Glacier storage classes.

**Use AWS Trusted Advisor checks on Amazon EC2 Reserved Instances to automatically renew reserved instances (RI). AWS Trusted advisor also suggests Amazon RDS idle database instances** - AWS Trusted Advisor checks for Amazon EC2 Reserved Instances that are scheduled to expire within the next 30 days or have expired in the preceding 30 days. Reserved Instances do not renew automatically; you can continue using an Amazon EC2 instance covered by the reservation without interruption, but you will be charged On-Demand rates. AWS Trusted advisor does not have a feature to auto-renew Reserved Instances.

**Use AWS Compute Optimizer recommendations to help you choose the optimal Amazon EC2 purchasing options and help reserve your instance capacities at reduced costs** - AWS Compute Optimizer recommends optimal AWS Compute resources for your workloads to reduce costs and improve performance by using machine learning to analyze historical utilization metrics. Over-provisioning compute can lead to unnecessary infrastructure cost and under-provisioning compute can lead to poor application performance. Compute Optimizer helps you choose the optimal Amazon EC2 instance types, including those that are part of an Amazon EC2 Auto Scaling group, based on your utilization data. It does not recommend instance purchase options.

References:

<https://aws.amazon.com/compute-optimizer/>

<https://aws.amazon.com/premiumsupport/technology/trusted-advisor/best-practice-checklist/>

<https://docs.aws.amazon.com/AmazonS3/latest/dev/analytics-storage-class.html>

</details>

---

## 📝 Q8: A leading social media analytics company is contemplating mo...

A leading social media analytics company is contemplating moving its dockerized application stack into AWS Cloud. The company is not sure about the pricing for using Amazon Elastic Container Service (Amazon ECS) with the EC2 launch type compared to the Amazon Elastic Container Service (Amazon ECS) with the Fargate launch type. Which of the following is correct regarding the pricing for these two services?

### Options
- [ ] **A)** Amazon ECS with EC2 launch type is charged based on EC2 instances and EBS volumes used. Amazon ECS with Fargate launch type is charged based on vCPU and memory resources that the containerized application requests

Both Amazon ECS with EC2 launch type and Amazon ECS with Fargate launch type are charged based on vCPU and memory resources that the containerized application requests
- [ ] **B)** Both Amazon ECS with EC2 launch type and Amazon ECS with Fargate launch type are charged based on Amazon EC2 instances and Amazon EBS Elastic Volumes used
- [ ] **C)** Both Amazon ECS with EC2 launch type and Amazon ECS with Fargate launch type are just charged based on Elastic Container Service used per hour

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Amazon ECS with EC2 launch type is charged based on EC2 instances and EBS volumes used. Amazon ECS with Fargate launch type is charged based on vCPU and memory resources that the containerized application requests

Both Amazon ECS with EC2 launch type and Amazon ECS with Fargate launch type are charged based on vCPU and memory resources that the containerized application requests**

### Detailed Explanation
Correct option:

**Amazon ECS with EC2 launch type is charged based on EC2 instances and EBS volumes used. Amazon ECS with Fargate launch type is charged based on vCPU and memory resources that the containerized application requests**

Amazon Elastic Container Service (Amazon ECS) is a fully managed container orchestration service. ECS allows you to easily run, scale, and secure Docker container applications on AWS.

Amazon ECS Overview:

![img](https://d1.awsstatic.com/diagrams/product-page-diagrams/product-page-diagram_ECS_1.86ebd8c223ec8b55aa1903c423fbe4e672f3daf7.png)

 via - <https://aws.amazon.com/ecs/>

With the Fargate launch type, you pay for the amount of vCPU and memory resources that your containerized application requests. vCPU and memory resources are calculated from the time your container images are pulled until the Amazon ECS Task terminates, rounded up to the nearest second. With the EC2 launch type, there is no additional charge for the EC2 launch type. You pay for AWS resources (e.g. EC2 instances or EBS volumes) you create to store and run your application.

Incorrect options:

**Both Amazon ECS with EC2 launch type and Amazon ECS with Fargate launch type are charged based on vCPU and memory resources that the containerized application requests**

**Both Amazon ECS with EC2 launch type and Amazon ECS with Fargate launch type are charged based on Amazon EC2 instances and Amazon EBS Elastic Volumes used**

As mentioned above - with the Fargate launch type, you pay for the amount of vCPU and memory resources. With EC2 launch type, you pay for AWS resources (e.g. EC2 instances or EBS volumes). Hence both these options are incorrect.

**Both Amazon ECS with EC2 launch type and Amazon ECS with Fargate launch type are just charged based on Elastic Container Service used per hour**

This is a made-up option and has been added as a distractor.

References:

<https://aws.amazon.com/ecs/pricing/>

</details>

---

## 📝 Q9: A financial services company recently launched an initiative...

A financial services company recently launched an initiative to improve the security of its AWS resources and it had enabled AWS Shield Advanced across multiple AWS accounts owned by the company. Upon analysis, the company has found that the costs incurred are much higher than expected.

### Options
- [ ] **A)** AWS Shield Advanced also covers AWS Shield Standard plan, thereby resulting in increased costs
- [ ] **B)** AWS Shield Advanced is being used for custom servers, that are not part of AWS Cloud, thereby resulting in increased costs
- [ ] **C)** Consolidated billing has not been enabled. All the AWS accounts should fall under a single consolidated billing for the monthly fee to be charged only once

Savings Plans has not been enabled for the AWS Shield Advanced service across all the AWS accounts
- [ ] **D)** Which of the following would you attribute as the underlying reason for the unexpectedly high costs for AWS Shield Advanced service?

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Consolidated billing has not been enabled. All the AWS accounts should fall under a single consolidated billing for the monthly fee to be charged only once

Savings Plans has not been enabled for the AWS Shield Advanced service across all the AWS accounts**

### Detailed Explanation
Correct option:

**Consolidated billing has not been enabled. All the AWS accounts should fall under a single consolidated billing for the monthly fee to be charged only once**

If your organization has multiple AWS accounts, then you can subscribe multiple AWS Accounts to AWS Shield Advanced by individually enabling it on each account using the AWS Management Console or API. You will pay the monthly fee once as long as the AWS accounts are all under a single consolidated billing, and you own all the AWS accounts and resources in those accounts.

Incorrect options:

**AWS Shield Advanced is being used for custom servers, that are not part of AWS Cloud, thereby resulting in increased costs** - AWS Shield Advanced does offer protection to resources outside of AWS. This should not cause unexpected spike in billing costs.

**AWS Shield Advanced also covers AWS Shield Standard plan, thereby resulting in increased costs** - AWS Shield Standard is automatically enabled for all AWS customers at no additional cost. AWS Shield Advanced is an optional paid service.

**Savings Plans has not been enabled for the AWS Shield Advanced service across all the AWS accounts** - This option has been added as a distractor. Savings Plans is a flexible pricing model that offers low prices on Amazon EC2 instances, AWS Lambda, and AWS Fargate usage, in exchange for a commitment to a consistent amount of usage (measured in $/hour) for a 1 or 3 year term. Savings Plans is not applicable for the AWS Shield Advanced service.

References:

<https://aws.amazon.com/shield/faqs/>

<https://aws.amazon.com/savingsplans/faq/>

</details>

---

## 📝 Q10: A mobile gaming company is experiencing heavy read traffic t...

A mobile gaming company is experiencing heavy read traffic to its Amazon Relational Database Service (Amazon RDS) database that retrieves player’s scores and stats. The company is using an Amazon RDS database instance type that is not cost-effective for their budget. The company would like to implement a strategy to deal with the high volume of read traffic, reduce latency, and also downsize the instance size to cut costs. Which of the following solutions do you recommend?

### Options
- [ ] **A)** Move to Amazon Redshift
- [ ] **B)** Setup Amazon ElastiCache in front of Amazon RDS
- [ ] **C)** Setup Amazon RDS Read Replicas
- [ ] **D)** Switch application code to AWS Lambda for better performance

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Setup Amazon ElastiCache in front of Amazon RDS**

### Detailed Explanation
Correct option:

**Setup Amazon ElastiCache in front of Amazon RDS**

Amazon ElastiCache is an ideal front-end for data stores such as Amazon RDS, providing a high-performance middle tier for applications with extremely high request rates and/or low latency requirements. The best part of caching is that it’s minimally invasive to implement and by doing so, your application performance regarding both scale and speed is dramatically improved.

Incorrect options:

**Setup Amazon RDS Read Replicas** - Adding read replicas would further add to the database costs and will not help in reducing latency when compared to a caching solution. So this option is ruled out.

**Move to Amazon Redshift** - Amazon Redshift is optimized for datasets ranging from a few hundred gigabytes to a petabyte or more. If the company is looking at cost-cutting, moving to Amazon Redshift from Amazon RDS is not an option.

**Switch application code to AWS Lambda for better performance** - AWS Lambda can help in running data processing workflows. But, data still needs to be read from RDS and hence we need a solution to speed up the data reads and not before/after processing.

Reference:

<https://aws.amazon.com/caching/database-caching/>

</details>

---

## 📝 Q11: A financial services company is looking to move its on-premi...

A financial services company is looking to move its on-premises IT infrastructure to AWS Cloud. The company has multiple long-term server bound licenses across the application stack and the CTO wants to continue to utilize those licenses while moving to AWS.

### Options
- [ ] **A)** As a solutions architect, which of the following would you recommend as the MOST cost-effective solution?
- [ ] **B)** Use Amazon EC2 dedicated hosts

Use Amazon EC2 dedicated instances

Use Amazon EC2 on-demand instances
- [ ] **C)** Use Amazon EC2 reserved instances (RI)

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use Amazon EC2 dedicated hosts

Use Amazon EC2 dedicated instances

Use Amazon EC2 on-demand instances**

### Detailed Explanation
Correct option:

**Use Amazon EC2 dedicated hosts**

You can use Dedicated Hosts to launch Amazon EC2 instances on physical servers that are dedicated for your use. Dedicated Hosts give you additional visibility and control over how instances are placed on a physical server, and you can reliably use the same physical server over time. As a result, Dedicated Hosts enable you to use your existing server-bound software licenses like Windows Server and address corporate compliance and regulatory requirements.

Incorrect options:

**Use Amazon EC2 dedicated instances** - Dedicated instances are Amazon EC2 instances that run in a VPC on hardware that's dedicated to a single customer. Your dedicated instances are physically isolated at the host hardware level from instances that belong to other AWS accounts. Dedicated instances may share hardware with other instances from the same AWS account that are not dedicated instances. Dedicated instances cannot be used for existing server-bound software licenses.

**Use Amazon EC2 on-demand instances**

**Use Amazon EC2 reserved instances (RI)**

Amazon EC2 presents a virtual computing environment, allowing you to use web service interfaces to launch instances with a variety of operating systems, load them with your custom application environment, manage your network’s access permissions, and run your image using as many or few systems as you desire.

Amazon EC2 provides the following purchasing options to enable you to optimize your costs based on your needs:

On-Demand Instances – Pay, by the second, for the instances that you launch.

Reserved Instances (RI) – Reduce your Amazon EC2 costs by making a commitment to a consistent instance configuration, including instance type and Region, for a term of 1 or 3 years.

Neither on-demand instances nor reserved instances can be used for existing server-bound software licenses.

References:

<https://aws.amazon.com/ec2/dedicated-hosts/>

<https://aws.amazon.com/ec2/dedicated-hosts/faqs/>

<https://aws.amazon.com/ec2/pricing/dedicated-instances/>

</details>

---

## 📝 Q12: A medium-sized business has a taxi dispatch application depl...

A medium-sized business has a taxi dispatch application deployed on an Amazon EC2 instance. Because of an unknown bug, the application causes the instance to freeze regularly. Then, the instance has to be manually restarted via the AWS management console.

### Options
- [ ] **A)** Setup an Amazon CloudWatch alarm to monitor the health status of the instance. In case of an Instance Health Check failure, Amazon CloudWatch Alarm can publish to an Amazon Simple Notification Service (Amazon SNS) event which can then trigger an AWS lambda function. The AWS lambda function can use Amazon EC2 API to reboot the instance
- [ ] **B)** Setup an Amazon CloudWatch alarm to monitor the health status of the instance. In case of an Instance Health Check failure, an EC2 Reboot CloudWatch Alarm Action can be used to reboot the instance

Use Amazon EventBridge events to trigger an AWS Lambda function to reboot the instance status every 5 minutes
- [ ] **C)** Use Amazon EventBridge events to trigger an AWS Lambda function to check the instance status every 5 minutes. In the case of Instance Health Check failure, the AWS lambda function can use Amazon EC2 API to reboot the instance
- [ ] **D)** Which of the following is the MOST cost-optimal and resource-efficient way to implement an automated solution until a permanent fix is delivered by the development team?

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Setup an Amazon CloudWatch alarm to monitor the health status of the instance. In case of an Instance Health Check failure, an EC2 Reboot CloudWatch Alarm Action can be used to reboot the instance

Use Amazon EventBridge events to trigger an AWS Lambda function to reboot the instance status every 5 minutes**

### Detailed Explanation
Correct option:

**Setup an Amazon CloudWatch alarm to monitor the health status of the instance. In case of an Instance Health Check failure, an EC2 Reboot CloudWatch Alarm Action can be used to reboot the instance**

Using Amazon CloudWatch alarm actions, you can create alarms that automatically stop, terminate, reboot, or recover your Amazon EC2 instances. You can use the stop or terminate actions to help you save money when you no longer need an instance to be running. You can use the reboot and recover actions to automatically reboot those instances or recover them onto new hardware if a system impairment occurs.

You can create an Amazon CloudWatch alarm that monitors an Amazon EC2 instance and automatically reboots the instance. The reboot alarm action is recommended for Instance Health Check failures (as opposed to the recover alarm action, which is suited for System Health Check failures).

Incorrect options:

**Setup an Amazon CloudWatch alarm to monitor the health status of the instance. In case of an Instance Health Check failure, Amazon CloudWatch Alarm can publish to an Amazon Simple Notification Service (Amazon SNS) event which can then trigger an AWS lambda function. The AWS lambda function can use Amazon EC2 API to reboot the instance**

**Use Amazon EventBridge events to trigger an AWS Lambda function to check the instance status every 5 minutes. In the case of Instance Health Check failure, the AWS lambda function can use Amazon EC2 API to reboot the instance**

**Use Amazon EventBridge events to trigger an AWS Lambda function to reboot the instance status every 5 minutes**

Using Amazon EventBridge event or Amazon CloudWatch alarm to trigger an AWS lambda function, directly or indirectly, is wasteful of resources. You should just use the EC2 Reboot CloudWatch Alarm Action to reboot the instance. So all the options that trigger the AWS lambda function are incorrect.

Reference:

<https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html>

</details>

---

---

## 🔗 Graph-Linked Knowledge Base
