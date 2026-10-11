---


title: "Practice Questions: Domain 2 — Design High-Performing Architectures"
description: "Master-level architecture and implementation guide for Practice Questions: Domain 2 — Design High-Performing Architectures covering core theory, runtime mechanics, and production best practices."
category: "AWS Cloud Architecture & Practitioner"
tags: [aws, cloud, architecture, practitioner, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Practice Questions: Domain 2 — Design High-Performing Architectures

## 📝 Q1: A leading online gaming company is migrating its flagship ap...

A leading online gaming company is migrating its flagship application to AWS Cloud for delivering its online games to users across the world. The company would like to use a Network Load Balancer to handle millions of requests per second. The engineering team has provisioned multiple instances in a public subnet and specified these instance IDs as the targets for the NLB.

### Options
- [ ] **A)** As a solutions architect, can you help the engineering team understand the correct routing mechanism for these target instances?
- [ ] **B)** Traffic is routed to instances using the instance ID specified in the primary network interface for the instance
- [ ] **C)** Traffic is routed to instances using the primary private IP address specified in the primary network interface for the instance
- [ ] **D)** Traffic is routed to instances using the primary public IP address specified in the primary network interface for the instance

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Traffic is routed to instances using the primary private IP address specified in the primary network interface for the instance**

### Detailed Explanation
Correct option:

**Traffic is routed to instances using the primary private IP address specified in the primary network interface for the instance**

A Network Load Balancer functions at the fourth layer of the Open Systems Interconnection (OSI) model. It can handle millions of requests per second. After the load balancer receives a connection request, it selects a target from the target group for the default rule. It attempts to open a TCP connection to the selected target on the port specified in the listener configuration.

Request Routing and IP Addresses -

If you specify targets using an instance ID, traffic is routed to instances using the primary private IP address specified in the primary network interface for the instance. The load balancer rewrites the destination IP address from the data packet before forwarding it to the target instance.

If you specify targets using IP addresses, you can route traffic to an instance using any private IP address from one or more network interfaces. This enables multiple applications on an instance to use the same port. Note that each network interface can have its security group. The load balancer rewrites the destination IP address before forwarding it to the target.

Incorrect options:

**Traffic is routed to instances using the primary public IP address specified in the primary network interface for the instance** - If you specify targets using an instance ID, traffic is routed to instances using the primary private IP address specified in the primary network interface for the instance. So public IP address cannot be used to route the traffic to the instance.

**Traffic is routed to instances using the primary elastic IP address specified in the primary network interface for the instance** - If you specify targets using an instance ID, traffic is routed to instances using the primary private IP address specified in the primary network interface for the instance. So elastic IP address cannot be used to route the traffic to the instance.

**Traffic is routed to instances using the instance ID specified in the primary network interface for the instance** - You cannot use instance ID to route traffic to the instance. This option is just added as a distractor.

References:

<https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html>

<https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-target-groups.html>

</details>

---

## 📝 Q2: A media company has created an AWS Direct Connect connection...

A media company has created an AWS Direct Connect connection for migrating its flagship application to the AWS Cloud. The on-premises application writes hundreds of video files into a mounted NFS file system daily. Post-migration, the company will host the application on an Amazon EC2 instance with a mounted Amazon Elastic File System (Amazon EFS) file system. Before the migration cutover, the company must build a process that will replicate the newly created on-premises video files to the Amazon EFS file system. Which of the following represents the MOST operationally efficient way to meet this requirement?

### Options
- [ ] **A)** Configure an AWS DataSync agent on the on-premises server that has access to the NFS file system. Transfer data over the AWS Direct Connect connection to an AWS PrivateLink interface VPC endpoint for Amazon EFS by using a private VIF. Set up an AWS DataSync scheduled task to send the video files to the Amazon EFS file system every 24 hours

Configure an AWS DataSync agent on the on-premises server that has access to the NFS file system. Transfer data over the AWS Direct Connect connection to an AWS VPC peering endpoint for Amazon EFS by using a private VIF. Set up an AWS DataSync scheduled task to send the video files to the Amazon EFS file system every 24 hours
- [ ] **B)** Configure an AWS DataSync agent on the on-premises server that has access to the NFS file system. Transfer data over the AWS Direct Connect connection to an Amazon S3 bucket by using a VPC gateway endpoint for Amazon S3. Set up an AWS Lambda function to process event notifications from Amazon S3 and copy the video files from Amazon S3 to the Amazon EFS file system
- [ ] **C)** Configure an AWS DataSync agent on the on-premises server that has access to the NFS file system. Transfer data over the AWS Direct Connect connection to an Amazon S3 bucket by using public VIF. Set up an AWS Lambda function to process event notifications from Amazon S3 and copy the video files from Amazon S3 to the Amazon EFS file system

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Configure an AWS DataSync agent on the on-premises server that has access to the NFS file system. Transfer data over the AWS Direct Connect connection to an AWS PrivateLink interface VPC endpoint for Amazon EFS by using a private VIF. Set up an AWS DataSync scheduled task to send the video files to the Amazon EFS file system every 24 hours

Configure an AWS DataSync agent on the on-premises server that has access to the NFS file system. Transfer data over the AWS Direct Connect connection to an AWS VPC peering endpoint for Amazon EFS by using a private VIF. Set up an AWS DataSync scheduled task to send the video files to the Amazon EFS file system every 24 hours**

### Detailed Explanation
Correct option:

**Configure an AWS DataSync agent on the on-premises server that has access to the NFS file system. Transfer data over the AWS Direct Connect connection to an AWS PrivateLink interface VPC endpoint for Amazon EFS by using a private VIF. Set up an AWS DataSync scheduled task to send the video files to the Amazon EFS file system every 24 hours**

AWS DataSync is an online data transfer service that simplifies, automates, and accelerates copying large amounts of data between on-premises storage systems and AWS Storage services, as well as between AWS Storage services.

You can use AWS DataSync to migrate data located on-premises, at the edge, or in other clouds to Amazon S3, Amazon EFS, Amazon FSx for Windows File Server, Amazon FSx for Lustre, Amazon FSx for OpenZFS, and Amazon FSx for NetApp ONTAP.

AWS DataSync:

![img](https://d1.awsstatic.com/Digital%20Marketing/House/Editorial/products/DataSync/Product-Page-Diagram_AWS-DataSync_On-Premises-to-AWS%402x.8769b9dea1615c18ee0597b236946cbe0103b2da.png)

 via - <https://aws.amazon.com/datasync/>

To establish a private connection between your virtual private cloud (VPC) and the Amazon EFS API, you can create an interface VPC endpoint. You can also access the interface VPC endpoint from on-premises environments or other VPCs using AWS VPN, AWS Direct Connect, or VPC peering.

AWS Direct Connect provides three types of virtual interfaces: public, private, and transit.

AWS Direct Connect VIFs:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt2-q11-i1.jpg)

 via - <https://aws.amazon.com/premiumsupport/knowledge-center/public-private-interface-dx/>

For the given use case, you can send data over the Direct Connect connection to an AWS PrivateLink interface VPC endpoint for Amazon EFS by using a private VIF.

Using task scheduling in AWS DataSync, you can periodically execute a transfer task from your source storage system to the destination. You can use the DataSync scheduled task to send the video files to the Amazon EFS file system every 24 hours.

Incorrect options:

**Configure an AWS DataSync agent on the on-premises server that has access to the NFS file system. Transfer data over the AWS Direct Connect connection to an AWS VPC peering endpoint for Amazon EFS by using a private VIF. Set up an AWS DataSync scheduled task to send the video files to the Amazon EFS file system every 24 hours** - A VPC peering connection is a networking connection between two VPCs that enables you to route traffic between them privately. You cannot use VPC peering to transfer data over the Direct Connect connection from the on-premises systems to AWS. So this option is incorrect.

**Configure an AWS DataSync agent on the on-premises server that has access to the NFS file system. Transfer data over the AWS Direct Connect connection to an Amazon S3 bucket by using public VIF. Set up an AWS Lambda function to process event notifications from Amazon S3 and copy the video files from Amazon S3 to the Amazon EFS file system** - You can use a public virtual interface to connect to AWS resources that are reachable by a public IP address such as an Amazon Simple Storage Service (Amazon S3) bucket or AWS public endpoints. Although it is theoretically possible to set up this solution, however, it is not the most operationally efficient solution, since it involves sending data via AWS DataSync to Amazon S3 and then in turn using an AWS Lambda function to finally send data to Amazon EFS.

**Configure an AWS DataSync agent on the on-premises server that has access to the NFS file system. Transfer data over the AWS Direct Connect connection to an Amazon S3 bucket by using a VPC gateway endpoint for Amazon S3. Set up an AWS Lambda function to process event notifications from Amazon S3 and copy the video files from Amazon S3 to the Amazon EFS file system** - You can access Amazon S3 from your VPC using gateway VPC endpoints. You cannot use the Amazon S3 gateway endpoint to transfer data over the AWS Direct Connect connection from the on-premises systems to Amazon S3. So this option is incorrect.

References:

<https://aws.amazon.com/datasync/>

<https://aws.amazon.com/blogs/storage/transferring-files-from-on-premises-to-aws-and-back-without-leaving-your-vpc-using-aws-datasync/>

<https://docs.aws.amazon.com/efs/latest/ug/efs-vpc-endpoints.html>

<https://aws.amazon.com/datasync/faqs/>

<https://aws.amazon.com/premiumsupport/knowledge-center/public-private-interface-dx/>

<https://docs.aws.amazon.com/datasync/latest/userguide/task-scheduling.html>

</details>

---

## 📝 Q3: An IT company has built a custom data warehousing solution f...

An IT company has built a custom data warehousing solution for a retail organization by using Amazon Redshift. As part of the cost optimizations, the company wants to move any historical data (any data older than a year) into Amazon S3, as the daily analytical reports consume data for just the last one year. However the analysts want to retain the ability to cross-reference this historical data along with the daily reports.

### Options
- [ ] **A)** The company wants to develop a solution with the LEAST amount of effort and MINIMUM cost. As a solutions architect, which option would you recommend to facilitate this use-case?
- [ ] **B)** Use Amazon Redshift Spectrum to create Amazon Redshift cluster tables pointing to the underlying historical data in Amazon S3. The analytics team can then query this historical data to cross-reference with the daily reports from Redshift

Use AWS Glue ETL job to load the Amazon S3 based historical data into Redshift. Once the ad-hoc queries are run for the historic data, it can be removed from Amazon Redshift

Use the Amazon Redshift COPY command to load the Amazon S3 based historical data into Amazon Redshift. Once the ad-hoc queries are run for the historic data, it can be removed from Amazon Redshift

Setup access to the historical data via Amazon Athena. The analytics team can run historical data queries on Amazon Athena and continue the daily reporting on Amazon Redshift. In case the reports need to be cross-referenced, the analytics team need to export these in flat files and then do further analysis

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use Amazon Redshift Spectrum to create Amazon Redshift cluster tables pointing to the underlying historical data in Amazon S3. The analytics team can then query this historical data to cross-reference with the daily reports from Redshift

Use AWS Glue ETL job to load the Amazon S3 based historical data into Redshift. Once the ad-hoc queries are run for the historic data, it can be removed from Amazon Redshift

Use the Amazon Redshift COPY command to load the Amazon S3 based historical data into Amazon Redshift. Once the ad-hoc queries are run for the historic data, it can be removed from Amazon Redshift

Setup access to the historical data via Amazon Athena. The analytics team can run historical data queries on Amazon Athena and continue the daily reporting on Amazon Redshift. In case the reports need to be cross-referenced, the analytics team need to export these in flat files and then do further analysis**

### Detailed Explanation
Correct option:

**Use Amazon Redshift Spectrum to create Amazon Redshift cluster tables pointing to the underlying historical data in Amazon S3. The analytics team can then query this historical data to cross-reference with the daily reports from Redshift**

Amazon Redshift is a fully-managed petabyte-scale cloud-based data warehouse product designed for large scale data set storage and analysis.

Using Amazon Redshift Spectrum, you can efficiently query and retrieve structured and semistructured data from files in Amazon S3 without having to load the data into Amazon Redshift tables.

Amazon Redshift Spectrum resides on dedicated Amazon Redshift servers that are independent of your cluster. Redshift Spectrum pushes many compute-intensive tasks, such as predicate filtering and aggregation, down to the Redshift Spectrum layer. Thus, Amazon Redshift Spectrum queries use much less of your cluster's processing capacity than other queries.

Redshift Spectrum Overview:

![img](https://d2908q01vomqb2.cloudfront.net/b6692ea5df920cad691c20319a6fffd7a4a766b8/2017/07/18/redshift_spectrum-1.gif)

 via - <https://aws.amazon.com/blogs/big-data/amazon-redshift-spectrum-extends-data-warehousing-out-to-exabytes-no-loading-required/>

Incorrect options:

**Setup access to the historical data via Amazon Athena. The analytics team can run historical data queries on Amazon Athena and continue the daily reporting on Amazon Redshift. In case the reports need to be cross-referenced, the analytics team need to export these in flat files and then do further analysis** - Amazon Athena is an interactive query service that makes it easy to analyze data directly in Amazon S3 using standard SQL. Athena is serverless, so there is no infrastructure to set up or manage, and customers pay only for the queries they run. You can use Athena to process logs, perform ad-hoc analysis, and run interactive queries. Providing access to historical data via Athena would mean that historical data reconciliation would become difficult as the daily report would still be produced via Redshift. Such a setup is cumbersome to maintain on a day to day basis. Hence the option to use Athena is ruled out.

**Use the Amazon Redshift COPY command to load the Amazon S3 based historical data into Amazon Redshift. Once the ad-hoc queries are run for the historic data, it can be removed from Amazon Redshift**

**Use AWS Glue ETL job to load the Amazon S3 based historical data into Redshift. Once the ad-hoc queries are run for the historic data, it can be removed from Amazon Redshift**

Loading historical data into Amazon Redshift via COPY command or AWS Glue ETL job would cost heavy for a one-time ad-hoc process. The same result can be achieved more cost-efficiently by using Amazon Redshift Spectrum. Therefore both these options to load historical data into Redshift are also incorrect for the given use-case.

References:

[https://docs.aws.amazon.com/redshift/latest/dg/c-using-spectrum.html#c-spectrum-overview https://aws.amazon.com/blogs/big-data/](https://docs.aws.amazon.com/redshift/latest/dg/c-using-spectrum.html#c-spectrum-overviewhttps://aws.amazon.com/blogs/big-data/)

[amazon-redshift-spectrum-extends-data-warehousing-out-to-exabytes-no-loading-required/](https://fpt-software.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/learn/#)

</details>

---

## 📝 Q4: A Big Data analytics company writes data and log files in Am...

A Big Data analytics company writes data and log files in Amazon S3 buckets. The company now wants to stream the existing data files as well as any ongoing file updates from Amazon S3 to Amazon Kinesis Data Streams.

### Options
- [ ] **A)** Amazon S3 bucket actions can be directly configured to write data into Amazon Simple Notification Service (Amazon SNS). Amazon SNS can then be used to send the updates to Amazon Kinesis Data Streams
- [ ] **B)** As a Solutions Architect, which of the following would you suggest as the fastest possible way of building a solution for this requirement?
- [ ] **C)** Leverage AWS Database Migration Service (AWS DMS) as a bridge between Amazon S3 and Amazon Kinesis Data Streams

Configure Amazon EventBridge events for the bucket actions on Amazon S3. An AWS Lambda function can then be triggered from the Amazon EventBridge event that will send the necessary data to Amazon Kinesis Data Streams

Leverage Amazon S3 event notification to trigger an AWS Lambda function for the file create event. The AWS Lambda function will then send the necessary data to Amazon Kinesis Data Streams

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Leverage AWS Database Migration Service (AWS DMS) as a bridge between Amazon S3 and Amazon Kinesis Data Streams

Configure Amazon EventBridge events for the bucket actions on Amazon S3. An AWS Lambda function can then be triggered from the Amazon EventBridge event that will send the necessary data to Amazon Kinesis Data Streams

Leverage Amazon S3 event notification to trigger an AWS Lambda function for the file create event. The AWS Lambda function will then send the necessary data to Amazon Kinesis Data Streams**

### Detailed Explanation
Correct option:

**Leverage AWS Database Migration Service (AWS DMS) as a bridge between Amazon S3 and Amazon Kinesis Data Streams**

You can achieve this by using AWS Database Migration Service (AWS DMS). AWS DMS enables you to seamlessly migrate data from supported sources to relational databases, data warehouses, streaming platforms, and other data stores in AWS cloud.

The given requirement needs the functionality to be implemented in the least possible time. You can use AWS DMS for such data-processing requirements. AWS DMS lets you expand the existing application to stream data from Amazon S3 into Amazon Kinesis Data Streams for real-time analytics without writing and maintaining new code. AWS DMS supports specifying Amazon S3 as the source and streaming services like Kinesis and Amazon Managed Streaming of Kafka (Amazon MSK) as the target. AWS DMS allows migration of full and change data capture (CDC) files to these services. AWS DMS performs this task out of box without any complex configuration or code development. You can also configure an AWS DMS replication instance to scale up or down depending on the workload.

AWS DMS supports Amazon S3 as the source and Kinesis as the target, so data stored in an S3 bucket is streamed to Kinesis. Several consumers, such as AWS Lambda, Amazon Kinesis Data Firehose, Amazon Kinesis Data Analytics, and the Kinesis Consumer Library (KCL), can consume the data concurrently to perform real-time analytics on the dataset. Each AWS service in this architecture can scale independently as needed.

Architecture of the proposed solution:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt3-q27-i1.jpg)

 via - <https://aws.amazon.com/blogs/big-data/streaming-data-from-amazon-s3-to-amazon-kinesis-data-streams-using-aws-dms/>

Incorrect options:

**Configure Amazon EventBridge events for the bucket actions on Amazon S3. An AWS Lambda function can then be triggered from the Amazon EventBridge event that will send the necessary data to Amazon Kinesis Data Streams** - You will need to enable AWS Cloudtrail trail to use object-level actions as a trigger for Amazon EventBridge events. Also, using AWS Lambda functions would require significant custom development to write the data into Amazon Kinesis Data Streams, so this option is not the right fit.

**Leverage Amazon S3 event notification to trigger an AWS Lambda function for the file create event. The AWS Lambda function will then send the necessary data to Amazon Kinesis Data Streams** - Using AWS Lambda functions would require significant custom development to write the data into Amazon Kinesis Data Streams, so this option is not the right fit.

**Amazon S3 bucket actions can be directly configured to write data into Amazon Simple Notification Service (Amazon SNS). Amazon SNS can then be used to send the updates to Amazon Kinesis Data Streams** - Amazon S3 cannot directly write data into Amazon SNS, although it can certainly use Amazon S3 event notifications to send an event to Amazon SNS. Also, Amazon SNS cannot directly send messages to Amazon Kinesis Data Streams. So this option is incorrect.

Reference:

<https://aws.amazon.com/blogs/big-data/streaming-data-from-amazon-s3-to-amazon-kinesis-data-streams-using-aws-dms/>

</details>

---

## 📝 Q5: An IT company has an Access Control Management (ACM) applica...

An IT company has an Access Control Management (ACM) application that uses Amazon RDS for MySQL but is running into performance issues despite using Read Replicas. The company has hired you as a solutions architect to address these performance-related challenges without moving away from the underlying relational database schema. The company has branch offices across the world, and it needs the solution to work on a global scale. Which of the following will you recommend as the MOST cost-effective and high-performance solution?

### Options
- [ ] **A)** Spin up Amazon EC2 instances in each AWS region, install MySQL databases and migrate the existing data into these new databases
- [ ] **B)** Spin up a Amazon Redshift cluster in each AWS region. Migrate the existing data into Redshift clusters
- [ ] **C)** Use Amazon Aurora Global Database to enable fast local reads with low latency in each region
- [ ] **D)** Use Amazon DynamoDB Global Tables to provide fast, local, read and write performance in each region

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use Amazon Aurora Global Database to enable fast local reads with low latency in each region**

### Detailed Explanation
Correct option:

**Use Amazon Aurora Global Database to enable fast local reads with low latency in each region**

Amazon Aurora is a MySQL and PostgreSQL-compatible relational database built for the cloud, that combines the performance and availability of traditional enterprise databases with the simplicity and cost-effectiveness of open source databases. Amazon Aurora features a distributed, fault-tolerant, self-healing storage system that auto-scales up to 64TB per database instance. Aurora is not an in-memory database.

Amazon Aurora Global Database is designed for globally distributed applications, allowing a single Amazon Aurora database to span multiple AWS regions. It replicates your data with no impact on database performance, enables fast local reads with low latency in each region, and provides disaster recovery from region-wide outages. Amazon Aurora Global Database is the correct choice for the given use-case.

Amazon Aurora Global Database Features:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt2-q5-i1.jpg)

 via - <https://aws.amazon.com/rds/aurora/global-database/>

Incorrect options:

**Use Amazon DynamoDB Global Tables to provide fast, local, read and write performance in each region** - Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale. It's a fully managed, multi-region, multi-master, durable database with built-in security, backup and restore, and in-memory caching for internet-scale applications.

Global Tables builds upon DynamoDB’s global footprint to provide you with a fully managed, multi-region, and multi-master database that provides fast, local, read, and write performance for massively scaled, global applications. Global Tables replicates your Amazon DynamoDB tables automatically across your choice of AWS regions. Given that the use-case wants you to continue with the underlying schema of the relational database, DynamoDB is not the right choice as it's a NoSQL database.

Amazon DynamoDB Global Tables Overview:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt2-q5-i2.jpg)

 via - <https://aws.amazon.com/dynamodb/global-tables/>

**Spin up a Amazon Redshift cluster in each AWS region. Migrate the existing data into Redshift clusters** - Amazon Redshift is a fully-managed petabyte-scale cloud-based data warehouse product designed for large scale data set storage and analysis. Amazon Redshift is not suited to be used as a transactional relational database, so this option is not correct.

**Spin up Amazon EC2 instances in each AWS region, install MySQL databases and migrate the existing data into these new databases** - Setting up Amazon EC2 instances in multiple regions with manually managed MySQL databases represents a maintenance nightmare and is not the correct choice for this use-case.

References:

<https://aws.amazon.com/rds/aurora/global-database/>

<https://aws.amazon.com/dynamodb/global-tables/>

</details>

---

## 📝 Q6: A media company wants a low-latency way to distribute live s...

A media company wants a low-latency way to distribute live sports results which are delivered via a proprietary application using UDP protocol.

### Options
- [ ] **A)** As a solutions architect, which of the following solutions would you recommend such that it offers the BEST performance for this use case?
- [ ] **B)** Use AWS Global Accelerator to provide a low latency way to distribute live sports results
- [ ] **C)** Use Amazon CloudFront to provide a low latency way to distribute live sports results
- [ ] **D)** Use Auto Scaling group to provide a low latency way to distribute live sports results

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use AWS Global Accelerator to provide a low latency way to distribute live sports results**

### Detailed Explanation
Correct option:

**Use AWS Global Accelerator to provide a low latency way to distribute live sports results**

AWS Global Accelerator is a networking service that helps you improve the availability and performance of the applications that you offer to your global users. AWS Global Accelerator is easy to set up, configure, and manage. It provides static IP addresses that provide a fixed entry point to your applications and eliminate the complexity of managing specific IP addresses for different AWS Regions and Availability Zones (AZs). AWS Global Accelerator always routes user traffic to the optimal endpoint based on performance, reacting instantly to changes in application health, your user’s location, and policies that you configure. Global Accelerator is a good fit for non-HTTP use cases, such as gaming (UDP), IoT (MQTT), or Voice over IP. Therefore, this option is correct.

How AWS Global Accelerator Works:

![img](https://d1.awsstatic.com/r2018/b/ubiquity/global-accelerator-how-it-works.feb297eb78d8cc55205874a1691e0ea2bc8bdbf1.png)

 via - <https://aws.amazon.com/global-accelerator/>

Incorrect options:

**Use Amazon CloudFront to provide a low latency way to distribute live sports results** - Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds, all within a developer-friendly environment.

Amazon CloudFront points of presence (POPs) (edge locations) make sure that popular content can be served quickly to your viewers. Amazon CloudFront also has regional edge caches that bring more of your content closer to your viewers, even when the content is not popular enough to stay at a POP, to help improve performance for that content. Regional edge caches help with all types of content, particularly content that tends to become less popular over time. Examples include user-generated content, such as video, photos, or artwork; e-commerce assets such as product photos and videos; and news and event-related content that might suddenly find new popularity. CloudFront supports HTTP/RTMP protocol based requests, therefore this option is incorrect.

**Use Elastic Load Balancing (ELB) to provide a low latency way to distribute live sports results** - Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple targets, such as Amazon EC2 instances, containers, IP addresses, and AWS Lambda functions. It can handle the varying load of your application traffic in a single Availability Zone or across multiple Availability Zones. Elastic Load Balancer cannot help with decreasing latency of incoming traffic from the source.

**Use Auto Scaling group to provide a low latency way to distribute live sports results** - Amazon EC2 Auto Scaling helps you ensure that you have the correct number of Amazon EC2 instances available to handle the load for your application. You create collections of Amazon EC2 instances, called Auto Scaling groups. You can specify the minimum number of instances in each Auto Scaling group, and Amazon EC2 Auto Scaling ensures that your group never goes below this size. Auto Scaling group cannot help with decreasing latency of incoming traffic from the source.

Exam Alert:

Please note the differences between the capabilities of AWS Global Accelerator and Amazon CloudFront -

AWS Global Accelerator and Amazon CloudFront are separate services that use the AWS global network and its edge locations around the world. Amazon CloudFront improves performance for both cacheable content (such as images and videos) and dynamic content (such as API acceleration and dynamic site delivery). AWS Global Accelerator improves performance for a wide range of applications over TCP or UDP by proxying packets at the edge to applications running in one or more AWS Regions.

AWS Global Accelerator is a good fit for non-HTTP use cases, such as gaming (UDP), IoT (MQTT), or Voice over IP, as well as for HTTP use cases that specifically require static IP addresses or deterministic, fast regional failover. Both services integrate with AWS Shield for DDoS protection.

References:

<https://aws.amazon.com/global-accelerator/>

<https://aws.amazon.com/cloudfront/faqs/>

</details>

---

## 📝 Q7: A company wants to store business-critical data on Amazon El...

A company wants to store business-critical data on Amazon Elastic Block Store (Amazon EBS) volumes which provide persistent storage independent of Amazon EC2 instances. During a test run, the development team found that on terminating an Amazon EC2 instance, the attached Amazon EBS volume was also lost, which was contrary to their assumptions. As a solutions architect, could you explain this issue?

### Options
- [ ] **A)** On termination of an Amazon EC2 instance, all the attached Amazon EBS volumes are always terminated
- [ ] **B)** The Amazon EBS volume was configured as the root volume of Amazon EC2 instance. On termination of the instance, the default behavior is to also terminate the attached root volume
- [ ] **C)** The Amazon EBS volumes were not backed up on Amazon EFS file system storage, resulting in the loss of volume
- [ ] **D)** The Amazon EBS volumes were not backed up on Amazon S3 storage, resulting in the loss of volume

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **The Amazon EBS volume was configured as the root volume of Amazon EC2 instance. On termination of the instance, the default behavior is to also terminate the attached root volume**

### Detailed Explanation
Correct option:

**The Amazon EBS volume was configured as the root volume of Amazon EC2 instance. On termination of the instance, the default behavior is to also terminate the attached root volume**

Amazon Elastic Block Store (EBS) is an easy to use, high-performance block storage service designed for use with Amazon Elastic Compute Cloud (EC2) for both throughput and transaction-intensive workloads at any scale.

When you launch an instance, the root device volume contains the image used to boot the instance. You can choose between AMIs backed by Amazon EC2 instance store and AMIs backed by Amazon EBS.

By default, the root volume for an AMI backed by Amazon EBS is deleted when the instance terminates. You can change the default behavior to ensure that the volume persists after the instance terminates. Non-root EBS volumes remain available even after you terminate an instance to which the volumes were attached. Therefore, this option is correct.

Incorrect options:

**The Amazon EBS volumes were not backed up on Amazon S3 storage, resulting in the loss of volume**

**The Amazon EBS volumes were not backed up on Amazon EFS file system storage, resulting in the loss of volume**

Amazon EBS volumes do not need to back up the data on Amazon S3 or Amazon EFS filesystem. Both these options are added as distractors.

**On termination of an Amazon EC2 instance, all the attached Amazon EBS volumes are always terminated** - As mentioned earlier, non-root Amazon EBS volumes remain available even after you terminate an instance to which the volumes were attached. Hence this option is incorrect.

Reference:

<https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/RootDeviceStorage.html>

</details>

---

## 📝 Q8: The development team at a social media company wants to hand...

The development team at a social media company wants to handle some complicated queries such as "What are the number of likes on the videos that have been posted by friends of a user A?".

### Options
- [ ] **A)** Amazon Aurora
- [ ] **B)** Amazon Neptune

Amazon Redshift

Amazon OpenSearch Service
- [ ] **C)** As a solutions architect, which of the following AWS database services would you suggest as the BEST fit to handle such use cases?

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Amazon Neptune

Amazon Redshift

Amazon OpenSearch Service**

### Detailed Explanation
Correct option:

**Amazon Neptune**

Amazon Neptune is a fast, reliable, fully managed graph database service that makes it easy to build and run applications that work with highly connected datasets. The core of Amazon Neptune is a purpose-built, high-performance graph database engine optimized for storing billions of relationships and querying the graph with milliseconds latency. Neptune powers graph use cases such as recommendation engines, fraud detection, knowledge graphs, drug discovery, and network security.

Amazon Neptune is highly available, with read replicas, point-in-time recovery, continuous backup to Amazon S3, and replication across Availability Zones. Neptune is secure with support for HTTPS encrypted client connections and encryption at rest. Neptune is fully managed, so you no longer need to worry about database management tasks such as hardware provisioning, software patching, setup, configuration, or backups.

Amazon Neptune can quickly and easily process large sets of user-profiles and interactions to build social networking applications. Neptune enables highly interactive graph queries with high throughput to bring social features into your applications. For example, if you are building a social feed into your application, you can use Neptune to provide results that prioritize showing your users the latest updates from their family, from friends whose updates they ‘Like,’ and from friends who live close to them.

Social Networking example with Amazon Neptune:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt3-q11-i1.jpg)

 via - <https://aws.amazon.com/neptune/>

Identity graphs example with Amazon Neptune:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt3-q11-i2.jpg)

 via - <https://aws.amazon.com/neptune/>

Incorrect options:

**Amazon OpenSearch Service** - Amazon OpenSearch Service is a managed service that makes it easy for you to perform interactive log analytics, real-time application monitoring, website search, and more. OpenSearch is an open source, distributed search and analytics suite derived from Elasticsearch. Amazon OpenSearch Service offers the latest versions of OpenSearch, support for 19 versions of Elasticsearch (1.5 to 7.10 versions), as well as visualization capabilities powered by OpenSearch Dashboards and Kibana (1.5 to 7.10 versions). Amazon OpenSearch Service currently has tens of thousands of active customers with hundreds of thousands of clusters under management processing trillions of requests per month.

**Amazon Redshift** - Amazon Redshift is a fully-managed petabyte-scale cloud-based data warehouse product designed for large scale data set storage and analysis. The given use-case is not about data warehousing, so this is not a correct option.

**Amazon Aurora** - Amazon Aurora is a MySQL and PostgreSQL-compatible relational database built for the cloud, that combines the performance and availability of traditional enterprise databases with the simplicity and cost-effectiveness of open source databases. Amazon Aurora features a distributed, fault-tolerant, self-healing storage system that auto-scales up to 64 terabytes per database instance. Aurora is not an in-memory database. Here, we need a graph database due to the highly connected datasets and queries, therefore Neptune is the best answer.

Reference:

<https://aws.amazon.com/neptune/>

</details>

---

## 📝 Q9: An Electronic Design Automation (EDA) application produces m...

An Electronic Design Automation (EDA) application produces massive volumes of data that can be divided into two categories. The 'hot data' needs to be both processed and stored quickly in a parallel and distributed fashion. The 'cold data' needs to be kept for reference with quick access for reads and updates at a low cost.

### Options
- [ ] **A)** AWS Glue
- [ ] **B)** Amazon FSx for Lustre

Amazon EMR

Amazon FSx for Windows File Server
- [ ] **C)** Which of the following AWS services is BEST suited to accelerate the aforementioned chip design process?

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Amazon FSx for Lustre

Amazon EMR

Amazon FSx for Windows File Server**

### Detailed Explanation
Correct option:

**Amazon FSx for Lustre**

Amazon FSx for Lustre makes it easy and cost-effective to launch and run the world’s most popular high-performance file system. It is used for workloads such as machine learning, high-performance computing (HPC), video processing, and financial modeling. The open-source Lustre file system is designed for applications that require fast storage – where you want your storage to keep up with your compute. FSx for Lustre integrates with Amazon S3, making it easy to process data sets with the Lustre file system. When linked to an S3 bucket, an FSx for Lustre file system transparently presents S3 objects as files and allows you to write changed data back to S3.

FSx for Lustre provides the ability to both process the 'hot data' in a parallel and distributed fashion as well as easily store the 'cold data' on Amazon S3. Therefore this option is the BEST fit for the given problem statement.

Incorrect options:

**Amazon FSx for Windows File Server** - Amazon FSx for Windows File Server provides fully managed, highly reliable file storage that is accessible over the industry-standard Service Message Block (SMB) protocol. It is built on Windows Server, delivering a wide range of administrative features such as user quotas, end-user file restore, and Microsoft Active Directory (AD) integration. FSx for Windows does not allow you to present S3 objects as files and does not allow you to write changed data back to S3. Therefore you cannot reference the "cold data" with quick access for reads and updates at low cost. Hence this option is not correct.

**Amazon EMR** - Amazon EMR is the industry-leading cloud big data platform for processing vast amounts of data using open source tools such as Apache Spark, Apache Hive, Apache HBase, Apache Flink, Apache Hudi, and Presto. Amazon EMR uses Hadoop, an open-source framework, to distribute your data and processing across a resizable cluster of Amazon EC2 instances. EMR does not offer the same storage and processing speed as FSx for Lustre. So it is not the right fit for the given high-performance workflow scenario.

**AWS Glue** - AWS Glue is a fully managed extract, transform, and load (ETL) service that makes it easy for customers to prepare and load their data for analytics. AWS Glue job is meant to be used for batch ETL data processing. AWS Glue does not offer the same storage and processing speed as FSx for Lustre. So it is not the right fit for the given high-performance workflow scenario.

References:

<https://aws.amazon.com/fsx/lustre/>

<https://aws.amazon.com/fsx/windows/faqs/>

</details>

---

## 📝 Q10: A big data analytics company is using Amazon Kinesis Data St...

A big data analytics company is using Amazon Kinesis Data Streams (KDS) to process IoT data from the field devices of an agricultural sciences company. Multiple consumer applications are using the incoming data streams and the engineers have noticed a performance lag for the data delivery speed between producers and consumers of the data streams.

### Options
- [ ] **A)** As a solutions architect, which of the following would you recommend for improving the performance for the given use-case?
- [ ] **B)** Swap out Amazon Kinesis Data Streams with Amazon SQS FIFO queues
- [ ] **C)** Use Enhanced Fanout feature of Amazon Kinesis Data Streams

Swap out Amazon Kinesis Data Streams with Amazon Kinesis Data Firehose

Swap out Amazon Kinesis Data Streams with Amazon SQS Standard queues

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use Enhanced Fanout feature of Amazon Kinesis Data Streams

Swap out Amazon Kinesis Data Streams with Amazon Kinesis Data Firehose

Swap out Amazon Kinesis Data Streams with Amazon SQS Standard queues**

### Detailed Explanation
Correct option:

**Use Enhanced Fanout feature of Amazon Kinesis Data Streams**

Amazon Kinesis Data Streams (KDS) is a massively scalable and durable real-time data streaming service. KDS can continuously capture gigabytes of data per second from hundreds of thousands of sources such as website clickstreams, database event streams, financial transactions, social media feeds, IT logs, and location-tracking events.

By default, the 2MB/second/shard output is shared between all of the applications consuming data from the stream. You should use enhanced fan-out if you have multiple consumers retrieving data from a stream in parallel. With enhanced fan-out developers can register stream consumers to use enhanced fan-out and receive their own 2MB/second pipe of read throughput per shard, and this throughput automatically scales with the number of shards in a stream.

Amazon Kinesis Data Streams Fanout:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt5-q38-i1.jpg)

 via - <https://aws.amazon.com/blogs/aws/kds-enhanced-fanout/>

Incorrect options:

**Swap out Amazon Kinesis Data Streams with Amazon Kinesis Data Firehose** - Amazon Kinesis Data Firehose is the easiest way to reliably load streaming data into data lakes, data stores, and analytics tools. It is a fully managed service that automatically scales to match the throughput of your data and requires no ongoing administration. It can also batch, compress, transform, and encrypt the data before loading it, minimizing the amount of storage used at the destination and increasing security. Amazon Kinesis Data Firehose can only write to Amazon S3, Amazon Redshift, Amazon Elasticsearch or Splunk. You can't have applications consuming data streams from Amazon Kinesis Data Firehose, that's the job of Amazon Kinesis Data Streams. Therefore this option is not correct.

**Swap out Amazon Kinesis Data Streams with Amazon SQS Standard queues**

**Swap out Amazon Kinesis Data Streams with Amazon SQS FIFO queues**

Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. Amazon SQS offers two types of message queues. Standard queues offer maximum throughput, best-effort ordering, and at-least-once delivery. Amazon SQS FIFO queues are designed to guarantee that messages are processed exactly once, in the exact order that they are sent. As multiple applications are consuming the same stream concurrently, both Amazon SQS Standard and Amazon SQS FIFO are not the right fit for the given use-case.

Exam Alert:

Please understand the differences between the capabilities of Amazon Kinesis Data Streams vs Amazon SQS, as you may be asked scenario-based questions on this topic in the exam.

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt5-q38-i2.jpg)

 via - <https://aws.amazon.com/kinesis/data-streams/faqs/>

References:

<https://aws.amazon.com/blogs/aws/kds-enhanced-fanout/>

<https://aws.amazon.com/kinesis/data-streams/faqs/>

</details>

---

## 📝 Q11: A Big Data processing company has created a distributed data...

A Big Data processing company has created a distributed data processing framework that performs best if the network performance between the processing machines is high. The application has to be deployed on AWS, and the company is only looking at performance as the key measure. As a Solutions Architect, which deployment do you recommend?

### Options
- [ ] **A)** Use a Cluster placement group

Use a Spread placement group

Use Spot Instances

Optimize the Amazon EC2 kernel using EC2 User Data

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use a Cluster placement group

Use a Spread placement group

Use Spot Instances

Optimize the Amazon EC2 kernel using EC2 User Data**

### Detailed Explanation
Correct option:

When you launch a new Amazon EC2 instance, the EC2 service attempts to place the instance in such a way that all of your instances are spread out across underlying hardware to minimize correlated failures. You can use placement groups to influence the placement of a group of interdependent instances to meet the needs of your workload. Depending on the type of workload, you can create a placement group using one of the following placement strategies:

Cluster – packs instances close together inside an Availability Zone (AZ). This strategy enables workloads to achieve the low-latency network performance necessary for tightly-coupled node-to-node communication that is typical of HPC applications.

Partition – spreads your instances across logical partitions such that groups of instances in one partition do not share the underlying hardware with groups of instances in different partitions. This strategy is typically used by large distributed and replicated workloads, such as Hadoop, Cassandra, and Kafka.

Spread – strictly places a small group of instances across distinct underlying hardware to reduce correlated failures.

There is no charge for creating a placement group.

**Use a Cluster placement group**

A cluster placement group is a logical grouping of instances within a single Availability Zone (AZ). A cluster placement group can span peered VPCs in the same Region. Instances in the same cluster placement group enjoy a higher per-flow throughput limit of up to 10 Gbps for TCP/IP traffic and are placed in the same high-bisection bandwidth segment of the network.

Cluster placement groups are recommended for applications that benefit from low network latency, high network throughput, or both. They are also recommended when the majority of the network traffic is between the instances in the group. To provide the lowest latency and the highest packet-per-second network performance for your placement group, choose an instance type that supports enhanced networking.

Image of Cluster placement group:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt3-q20-i1.jpg)

 via - <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html>

Image of Partition placement group:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt3-q20-i2.jpg)

 via - <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html>

Image of Spread placement group:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt3-q20-i3.jpg)

 via - <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html>

Incorrect options:

**Use Spot Instances** - A Spot Instance is an unused Amazon EC2 instance that is available for less than the On-Demand price. Because Spot Instances enable you to request unused Amazon EC2 instances at steep discounts, you can lower your Amazon EC2 costs significantly. Spot Instances are a cost-effective choice if you can be flexible about when your applications run and if your applications can be interrupted. Since performance is the key criteria, this is not the right choice.

**Optimize the Amazon EC2 kernel using EC2 User Data** - Optimizing the Amazon EC2 kernel won't help with network performance as it's bounded by the EC2 instance type mainly. Therefore, this option is incorrect.

**Use a Spread placement group** - A spread placement group is a group of instances that are each placed on distinct racks, with each rack having its own network and power source. The instances are placed across distinct underlying hardware to reduce correlated failures. A spread placement group can span multiple Availability Zones (AZs) in the same Region. You can have a maximum of seven running instances per Availability Zone (AZ) per group.

Reference:

<https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html>

</details>

---

---

## 🔗 Graph-Linked Knowledge Base
