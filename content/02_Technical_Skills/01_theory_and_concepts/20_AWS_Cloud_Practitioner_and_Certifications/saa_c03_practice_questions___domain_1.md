---


title: "Practice Questions: Domain 1 — Design Resilient Architectures"
description: "Master-level architecture and implementation guide for Practice Questions: Domain 1 — Design Resilient Architectures covering core theory, runtime mechanics, and production best practices."
category: "AWS Cloud Architecture & Practitioner"
tags: [aws, cloud, architecture, practitioner, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Practice Questions: Domain 1 — Design Resilient Architectures

## 📝 Q1: A Big Data analytics company wants to set up an AWS cloud ar...

A Big Data analytics company wants to set up an AWS cloud architecture that throttles requests in case of sudden traffic spikes. The company is looking for AWS services that can be used for buffering or throttling to handle such traffic variations. Which of the following services can be used to support this requirement?

### Options
- [ ] **A)** Amazon API Gateway, Amazon Simple Queue Service (Amazon SQS) and Amazon Kinesis

Amazon Simple Queue Service (Amazon SQS), Amazon Simple Notification Service (Amazon SNS) and AWS Lambda

Elastic Load Balancer, Amazon Simple Queue Service (Amazon SQS), AWS Lambda
- [ ] **B)** Amazon Gateway Endpoints, Amazon Simple Queue Service (Amazon SQS) and Amazon Kinesis

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Amazon API Gateway, Amazon Simple Queue Service (Amazon SQS) and Amazon Kinesis

Amazon Simple Queue Service (Amazon SQS), Amazon Simple Notification Service (Amazon SNS) and AWS Lambda

Elastic Load Balancer, Amazon Simple Queue Service (Amazon SQS), AWS Lambda**

### Detailed Explanation
Correct option:

Throttling is the process of limiting the number of requests an authorized program can submit to a given operation in a given amount of time.

**Amazon API Gateway, Amazon Simple Queue Service (Amazon SQS) and Amazon Kinesis**

To prevent your API from being overwhelmed by too many requests, Amazon API Gateway throttles requests to your API using the token bucket algorithm, where a token counts for a request. Specifically, API Gateway sets a limit on a steady-state rate and a burst of request submissions against all APIs in your account. In the token bucket algorithm, the burst is the maximum bucket size.

Amazon Simple Queue Service (Amazon SQS) - Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. Amazon SQS offers buffer capabilities to smooth out temporary volume spikes without losing messages or increasing latency.

Amazon Kinesis - Amazon Kinesis is a fully managed, scalable service that can ingest, buffer, and process streaming data in real-time.

Incorrect options:

**Amazon Simple Queue Service (Amazon SQS), Amazon Simple Notification Service (Amazon SNS) and AWS Lambda** - Amazon SQS has the ability to buffer its messages. Amazon Simple Notification Service (SNS) cannot buffer messages and is generally used with SQS to provide the buffering facility. When requests come in faster than your Lambda function can scale, or when your function is at maximum concurrency, additional requests fail as the Lambda throttles those requests with error code 429 status code. So, this combination of services is incorrect.

**Amazon Gateway Endpoints, Amazon Simple Queue Service (Amazon SQS) and Amazon Kinesis** - A Gateway Endpoint is a gateway that you specify as a target for a route in your route table for traffic destined to a supported AWS service. This cannot help in throttling or buffering of requests. Amazon SQS and Kinesis can buffer incoming data. Since Gateway Endpoint is an incorrect service for throttling or buffering, this option is incorrect.

**Elastic Load Balancer, Amazon Simple Queue Service (Amazon SQS), AWS Lambda** - Elastic Load Balancer cannot throttle requests. Amazon SQS can be used to buffer messages. When requests come in faster than your Lambda function can scale, or when your function is at maximum concurrency, additional requests fail as the Lambda throttles those requests with error code 429 status code. So, this combination of services is incorrect.

References:

<https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html>

<https://aws.amazon.com/sqs/features/>

</details>

---

## 📝 Q2: The business analytics team at a company has been running ad...

The business analytics team at a company has been running ad-hoc queries on Oracle and PostgreSQL services on Amazon RDS to prepare daily reports for senior management. To facilitate the business analytics reporting, the engineering team now wants to continuously replicate this data and consolidate these databases into a petabyte-scale data warehouse by streaming data to Amazon Redshift.

### Options
- [ ] **A)** As a solutions architect, which of the following would you recommend as the MOST resource-efficient solution that requires the LEAST amount of development time without the need to manage the underlying infrastructure?
- [ ] **B)** Use AWS Database Migration Service (AWS DMS) to replicate the data from the databases into Amazon Redshift

Use Amazon Kinesis Data Streams to replicate the data from the databases into Amazon Redshift

Use AWS EMR to replicate the data from the databases into Amazon Redshift
- [ ] **C)** Use AWS Glue to replicate the data from the databases into Amazon Redshift

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use AWS Database Migration Service (AWS DMS) to replicate the data from the databases into Amazon Redshift

Use Amazon Kinesis Data Streams to replicate the data from the databases into Amazon Redshift

Use AWS EMR to replicate the data from the databases into Amazon Redshift**

### Detailed Explanation
Correct option:

**Use AWS Database Migration Service (AWS DMS) to replicate the data from the databases into Amazon Redshift**

AWS Database Migration Service helps you migrate databases to AWS quickly and securely. The source database remains fully operational during the migration, minimizing downtime to applications that rely on the database. With AWS Database Migration Service, you can continuously replicate your data with high availability and consolidate databases into a petabyte-scale data warehouse by streaming data to Amazon Redshift and Amazon S3.

Continuous Data Replication

![img](https://d1.awsstatic.com/product-marketing/DMS/product-page-diagram-AWS-DMS_continuous-data-replication.a0e3bd328d2a4bd9b40a83e767199dcc13cf678f.png)

 via - <https://aws.amazon.com/dms/>

You can migrate data to Amazon Redshift databases using AWS Database Migration Service. Amazon Redshift is a fully managed, petabyte-scale data warehouse service in the cloud. With an Amazon Redshift database as a target, you can migrate data from all of the other supported source databases.

The Amazon Redshift cluster must be in the same AWS account and the same AWS Region as the replication instance. During a database migration to Amazon Redshift, AWS DMS first moves data to an Amazon S3 bucket. When the files reside in an Amazon S3 bucket, AWS DMS then transfers them to the proper tables in the Amazon Redshift data warehouse. AWS DMS creates the S3 bucket in the same AWS Region as the Amazon Redshift database. The AWS DMS replication instance must be located in that same region.

Incorrect options:

**Use AWS Glue to replicate the data from the databases into Amazon Redshift** - AWS Glue is a fully managed extract, transform, and load (ETL) service that makes it easy for customers to prepare and load their data for analytics. AWS Glue job is meant to be used for batch ETL data processing.

Using AWS Glue involves significant development efforts to write custom migration scripts to copy the database data into Redshift.

**Use AWS EMR to replicate the data from the databases into Amazon Redshift** - Amazon EMR is the industry-leading cloud big data platform for processing vast amounts of data using open source tools such as Apache Spark, Apache Hive, Apache HBase, Apache Flink, Apache Hudi, and Presto. With EMR you can run Petabyte-scale analysis at less than half of the cost of traditional on-premises solutions and over 3x faster than standard Apache Spark. For short-running jobs, you can spin up and spin down clusters and pay per second for the instances used. For long-running workloads, you can create highly available clusters that automatically scale to meet demand. Amazon EMR uses Hadoop, an open-source framework, to distribute your data and processing across a resizable cluster of Amazon EC2 instances.

Using EMR involves significant infrastructure management efforts to set up and maintain the EMR cluster. Additionally this option involves a major development effort to write custom migration jobs to copy the database data into Redshift.

**Use Amazon Kinesis Data Streams to replicate the data from the databases into Amazon Redshift** - Amazon Kinesis Data Streams (KDS) is a massively scalable and durable real-time data streaming service. KDS can continuously capture gigabytes of data per second from hundreds of thousands of sources such as website clickstreams, database event streams, financial transactions, social media feeds, IT logs, and location-tracking events.

However, the user is expected to manually provision an appropriate number of shards to process the expected volume of the incoming data stream. The throughput of an Amazon Kinesis data stream is designed to scale without limits via increasing the number of shards within a data stream. Therefore Kinesis Data Streams is not the right fit for this use-case.

References:

<https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Target.Redshift.html>

<https://aws.amazon.com/dms/>

</details>

---

## 📝 Q3: A company has grown from a small startup to an enterprise em...

A company has grown from a small startup to an enterprise employing over 1000 people. As the team size has grown, the company has recently observed some strange behavior, with Amazon S3 buckets settings being changed regularly. How can you figure out what's happening without restricting the rights of the users?

### Options
- [ ] **A)** Use AWS CloudTrail to analyze API calls

Use Amazon S3 access logs to analyze user access using Athena

Implement an IAM policy to forbid users to change Amazon S3 bucket settings

Implement a bucket policy requiring AWS Multi-Factor Authentication (AWS MFA) for all operations

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use AWS CloudTrail to analyze API calls

Use Amazon S3 access logs to analyze user access using Athena

Implement an IAM policy to forbid users to change Amazon S3 bucket settings

Implement a bucket policy requiring AWS Multi-Factor Authentication (AWS MFA) for all operations**

### Detailed Explanation
Correct option:

**Use AWS CloudTrail to analyze API calls**

AWS CloudTrail is a service that enables governance, compliance, operational auditing, and risk auditing of your AWS account. With AWS CloudTrail, you can log, continuously monitor, and retain account activity related to actions across your AWS infrastructure. AWS CloudTrail provides event history of your AWS account activity, including actions taken through the AWS Management Console, AWS SDKs, command-line tools, and other AWS services.

In general, to analyze any API calls made within an AWS account, AWS CloudTrail is used. You can record the actions that are taken by users, roles, or AWS services on Amazon S3 resources and maintain log records for auditing and compliance purposes. To do this, you can use server access logging, AWS CloudTrail logging, or a combination of both. AWS recommends that you use AWS CloudTrail for logging bucket and object-level actions for your Amazon S3 resources.

Incorrect options:

**Implement an IAM policy to forbid users to change Amazon S3 bucket settings** - You manage access in AWS by creating policies and attaching them to IAM identities (users, groups of users, or roles) or AWS resources. A policy is an object in AWS that, when associated with an identity or resource, defines their permissions. AWS evaluates these policies when an IAM principal (user or role) makes a request. Permissions in the policies determine whether the request is allowed or denied. Most policies are stored in AWS as JSON documents. AWS supports six types of policies: identity-based policies, resource-based policies, permissions boundaries, AWS Organizations service control policy (SCP), access control list (ACL), and session policies.

Implementing an IAM policy to forbid users would be disruptive and wouldn't go unnoticed.

**Use Amazon S3 access logs to analyze user access using Athena** - Amazon S3 server access logging provides detailed records for the requests that are made to a bucket. Server access logs are useful for many applications. For example, access log information can be useful in security and access audits. It can also help you learn about your customer base and understand your Amazon S3 bill. AWS recommends that you use AWS CloudTrail for logging bucket and object-level actions for your Amazon S3 resources, as it provides more options to store, analyze and act on the log information.

**Implement a bucket policy requiring AWS Multi-Factor Authentication (AWS MFA) for all operations** - Amazon S3 supports MFA-protected API access, a feature that can enforce multi-factor authentication (MFA) for access to your Amazon S3 resources. Multi-factor authentication provides an extra level of security that you can apply to your AWS environment. It is a security feature that requires users to prove the physical possession of an MFA device by providing a valid MFA code. Changing the bucket policy to require MFA would not go unnoticed.

References:

<https://docs.aws.amazon.com/AmazonS3/latest/userguide/logging-with-S3.html>

<https://aws.amazon.com/cloudtrail/>

<https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html>

<https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerLogs.html>

<https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html#example-bucket-policies-use-case-7>

</details>

---

## 📝 Q4: An e-commerce application uses an Amazon Aurora Multi-AZ dep...

An e-commerce application uses an Amazon Aurora Multi-AZ deployment for its database. While analyzing the performance metrics, the engineering team has found that the database reads are causing high input/output (I/O) and adding latency to the write requests against the database.

### Options
- [ ] **A)** Activate read-through caching on the Amazon Aurora database
- [ ] **B)** As an AWS Certified Solutions Architect Associate, what would you recommend to separate the read requests from the write requests?
- [ ] **C)** Provision another Amazon Aurora database and link it to the primary database as a read replica
- [ ] **D)** Set up a read replica and modify the application to use the appropriate endpoint

Configure the application to read from the Multi-AZ standby instance

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Set up a read replica and modify the application to use the appropriate endpoint

Configure the application to read from the Multi-AZ standby instance**

### Detailed Explanation
Correct option:

**Set up a read replica and modify the application to use the appropriate endpoint**

An Amazon Aurora DB cluster consists of one or more DB instances and a cluster volume that manages the data for those DB instances. An Aurora cluster volume is a virtual database storage volume that spans multiple Availability Zones (AZs), with each Availability Zone (AZ) having a copy of the DB cluster data. Two types of DB instances make up an Aurora DB cluster:

Primary DB instance – Supports read and write operations, and performs all of the data modifications to the cluster volume. Each Aurora DB cluster has one primary DB instance.

Aurora Replica – Connects to the same storage volume as the primary DB instance and supports only read operations. Each Aurora DB cluster can have up to 15 Aurora Replicas in addition to the primary DB instance. Aurora automatically fails over to an Aurora Replica in case the primary DB instance becomes unavailable. You can specify the failover priority for Aurora Replicas. Aurora Replicas can also offload read workloads from the primary DB instance.

![img](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/images/AuroraArch001.png)

 via - <https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.html>

Aurora Replicas have two main purposes. You can issue queries to them to scale the read operations for your application. You typically do so by connecting to the reader endpoint of the cluster. That way, Aurora can spread the load for read-only connections across as many Aurora Replicas as you have in the cluster. Aurora Replicas also help to increase availability. If the writer instance in a cluster becomes unavailable, Aurora automatically promotes one of the reader instances to take its place as the new writer.

While setting up a Multi-AZ deployment for Aurora, you create an Aurora replica or reader node in a different Availability Zone (AZ).

Multi-AZ for Aurora:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt2-q13-i1.jpg)

You use the reader endpoint for read-only connections for your Aurora cluster. This endpoint uses a load-balancing mechanism to help your cluster handle a query-intensive workload. The reader endpoint is the endpoint that you supply to applications that do reporting or other read-only operations on the cluster. The reader endpoint load-balances connections to available Aurora Replicas in an Aurora DB cluster.

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt2-q13-i2.jpg)

 via - <https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.Endpoints.html>

Incorrect options:

**Provision another Amazon Aurora database and link it to the primary database as a read replica** - You cannot provision another Aurora database and then link it as a read-replica for the primary database. This option is ruled out.

**Configure the application to read from the Multi-AZ standby instance** - This option has been added as a distractor as Aurora does not have any entity called standby instance. You create a standby instance while setting up a Multi-AZ deployment for Amazon RDS and NOT for Aurora.

Multi-AZ for Amazon RDS:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt2-q13-i3.jpg)

**Activate read-through caching on the Amazon Aurora database** - Amazon Aurora does not have built-in support for read-through caching, so this option just serves as a distractor. To implement caching, you will need to integrate something like Amazon ElastiCache and that would need code changes for the application.

References:

<https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.html>

<https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html>

<https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.Endpoints.html>

</details>

---

## 📝 Q5: A healthcare company uses its on-premises infrastructure to ...

A healthcare company uses its on-premises infrastructure to run legacy applications that require specialized customizations to the underlying Oracle database as well as its host operating system (OS). The company also wants to improve the availability of the Oracle database layer. The company has hired you as an AWS Certified Solutions Architect – Associate to build a solution on AWS that meets these requirements while minimizing the underlying infrastructure maintenance effort. Which of the following options represents the best solution for this use case?

### Options
- [ ] **A)** Leverage multi-AZ configuration of Amazon RDS Custom for Oracle that allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system

Leverage cross AZ read-replica configuration of Amazon RDS for Oracle that allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system

Deploy the Oracle database layer on multiple Amazon EC2 instances spread across two Availability Zones (AZs). This deployment configuration guarantees high availability and also allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system

Leverage multi-AZ configuration of Amazon RDS for Oracle that allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Leverage multi-AZ configuration of Amazon RDS Custom for Oracle that allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system

Leverage cross AZ read-replica configuration of Amazon RDS for Oracle that allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system

Deploy the Oracle database layer on multiple Amazon EC2 instances spread across two Availability Zones (AZs). This deployment configuration guarantees high availability and also allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system

Leverage multi-AZ configuration of Amazon RDS for Oracle that allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system**

### Detailed Explanation
Correct option:

**Leverage multi-AZ configuration of Amazon RDS Custom for Oracle that allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system**

Amazon RDS is a managed service that makes it easy to set up, operate, and scale a relational database in the cloud. It provides cost-efficient and resizable capacity while managing time-consuming database administration tasks. Amazon RDS can automatically back up your database and keep your database software up to date with the latest version. However, RDS does not allow you to access the host OS of the database.

For the given use-case, you need to use Amazon RDS Custom for Oracle as it allows you to access and customize your database server host and operating system, for example by applying special patches and changing the database software settings to support third-party applications that require privileged access. Amazon RDS Custom for Oracle facilitates these functionalities with minimum infrastructure maintenance effort. You need to set up the RDS Custom for Oracle in multi-AZ configuration for high availability.

Amazon RDS Custom for Oracle:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt1-q3-i1.jpg)

 via - <https://aws.amazon.com/blogs/aws/amazon-rds-custom-for-oracle-new-control-capabilities-in-database-environment/>

Incorrect options:

**Leverage multi-AZ configuration of Amazon RDS for Oracle that allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system**

**Leverage cross AZ read-replica configuration of Amazon RDS for Oracle that allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system**

Amazon RDS for Oracle does not allow you to access and customize your database server host and operating system. Therefore, both these options are incorrect.

**Deploy the Oracle database layer on multiple Amazon EC2 instances spread across two Availability Zones (AZs). This deployment configuration guarantees high availability and also allows the Database Administrator (DBA) to access and customize the database environment and the underlying operating system** - The use case requires that the best solution should involve minimum infrastructure maintenance effort. When you use Amazon EC2 instances to host the databases, you need to manage the server health, server maintenance, server patching, and database maintenance tasks yourself. In addition, you will also need to manage the multi-AZ configuration by deploying Amazon EC2 instances across two Availability Zones (AZs), perhaps by using an Auto Scaling group. These steps entail significant maintenance effort. Hence this option is incorrect.

References:

<https://aws.amazon.com/blogs/aws/amazon-rds-custom-for-oracle-new-control-capabilities-in-database-environment/>

<https://aws.amazon.com/rds/faqs/>

</details>

---

## 📝 Q6: An Internet of Things (IoT) company would like to have a str...

An Internet of Things (IoT) company would like to have a streaming system that performs real-time analytics on the ingested IoT data. Once the analytics is done, the company would like to send notifications back to the mobile applications of the IoT device owners.

### Options
- [ ] **A)** Amazon Kinesis with Amazon Simple Email Service (Amazon SES)
- [ ] **B)** Amazon Kinesis with Amazon Simple Notification Service (Amazon SNS)

Amazon Kinesis with Amazon Simple Queue Service (Amazon SQS)
- [ ] **C)** Amazon Simple Queue Service (Amazon SQS) with Amazon Simple Notification Service (Amazon SNS)
- [ ] **D)** As a solutions architect, which of the following AWS technologies would you recommend to send these notifications to the mobile applications?

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Amazon Kinesis with Amazon Simple Notification Service (Amazon SNS)

Amazon Kinesis with Amazon Simple Queue Service (Amazon SQS)**

### Detailed Explanation
Correct option:

**Amazon Kinesis with Amazon Simple Notification Service (Amazon SNS)**

Amazon Kinesis makes it easy to collect, process, and analyze real-time, streaming data so you can get timely insights and react quickly to new information. Amazon Kinesis offers key capabilities to cost-effectively process streaming data at any scale, along with the flexibility to choose the tools that best suit the requirements of your application.

With Amazon Kinesis, you can ingest real-time data such as video, audio, application logs, website clickstreams, and IoT telemetry data for machine learning, analytics, and other applications. Amazon Kinesis enables you to process and analyze data as it arrives and respond instantly instead of having to wait until all your data is collected before the processing can begin.

Amazon Kinesis will be great for event streaming from the IoT devices, but not for sending notifications as it doesn't have such a feature.

Amazon Simple Notification Service (Amazon SNS) is a highly available, durable, secure, fully managed pub/sub messaging service that enables you to decouple microservices, distributed systems, and serverless applications. Amazon SNS provides topics for high-throughput, push-based, many-to-many messaging. Amazon SNS is a notification service and will be perfect for this use case.

Streaming data with Amazon Kinesis and using Amazon SNS to send the response notifications is the optimal solution for the current scenario.

Incorrect options:

**Amazon Simple Queue Service (Amazon SQS) with Amazon Simple Notification Service (Amazon SNS)** - Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. Amazon SQS eliminates the complexity and overhead associated with managing and operating message-oriented middleware and empowers developers to focus on differentiating work. Using SQS, you can send, store, and receive messages between software components at any volume, without losing messages or requiring other services to be available. Kinesis is better for streaming data since queues aren't meant for real-time streaming of data.

**Amazon Kinesis with Amazon Simple Email Service (Amazon SES)** - Amazon Simple Email Service (Amazon SES) is a cloud-based email sending service designed to help digital marketers and application developers send marketing, notification, and transactional emails. It is a reliable, cost-effective service for businesses of all sizes that use email to keep in contact with their customers. It is an email service and not a notification service as is the requirement in the current use case.

**Amazon Kinesis with Amazon Simple Queue Service (Amazon SQS)** - As explained above, Amazon Kinesis works well for streaming real-time data. Amazon SQS is a queuing service that helps decouple system architecture by offering flexibility and ease of maintenance. It cannot send notifications. Amazon SQS is paired with SNS to provide this functionality.

References:

<https://aws.amazon.com/sns/>

<https://aws.amazon.com/kinesis/>

<https://aws.amazon.com/ses/>

<https://aws.amazon.com/sqs/>

</details>

---

## 📝 Q7: A financial services firm uses a high-frequency trading syst...

A financial services firm uses a high-frequency trading system and wants to write the log files into Amazon S3. The system will also read these log files in parallel on a near real-time basis. The engineering team wants to address any data discrepancies that might arise when the trading system overwrites an existing log file and then tries to read that specific log file.

### Options
- [ ] **A)** A process replaces an existing object and immediately tries to read it. Amazon S3 always returns the latest version of the object
- [ ] **B)** A process replaces an existing object and immediately tries to read it. Until the change is fully propagated, Amazon S3 might return the new data
- [ ] **C)** A process replaces an existing object and immediately tries to read it. Until the change is fully propagated, Amazon S3 might return the previous data
- [ ] **D)** Which of the following options BEST describes the capabilities of Amazon S3 relevant to this scenario?

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **A process replaces an existing object and immediately tries to read it. Amazon S3 always returns the latest version of the object**

### Detailed Explanation
Correct option:

**A process replaces an existing object and immediately tries to read it. Amazon S3 always returns the latest version of the object**

Amazon S3 delivers strong read-after-write consistency automatically, without changes to performance or availability, without sacrificing regional isolation for applications, and at no additional cost.

After a successful write of a new object or an overwrite of an existing object, any subsequent read request immediately receives the latest version of the object. Amazon S3 also provides strong consistency for list operations, so after a write, you can immediately perform a listing of the objects in a bucket with any changes reflected.

Strong read-after-write consistency helps when you need to immediately read an object after a write. For example, strong read-after-write consistency when you often read and list immediately after writing objects.

To summarize, all Amazon S3 GET, PUT, and LIST operations, as well as operations that change object tags, ACLs, or metadata, are strongly consistent. What you write is what you will read, and the results of a LIST will be an accurate reflection of what’s in the bucket.

Incorrect options:

**A process replaces an existing object and immediately tries to read it. Until the change is fully propagated, Amazon S3 might return the previous data**

**A process replaces an existing object and immediately tries to read it. Until the change is fully propagated, Amazon S3 does not return any data**

**A process replaces an existing object and immediately tries to read it. Until the change is fully propagated, Amazon S3 might return the new data**

These three options contradict the earlier details provided in the explanation.

References:

<https://docs.aws.amazon.com/AmazonS3/latest/dev/Introduction.html#ConsistencyModel>

<https://aws.amazon.com/s3/faqs/>

</details>

---

## 📝 Q8: A company has noticed that its application performance has d...

A company has noticed that its application performance has deteriorated after a new Auto Scaling group was deployed a few days back. Upon investigation, the team found out that the Launch Configuration selected for the Auto Scaling group is using the incorrect instance type that is not optimized to handle the application workflow. As a solutions architect, what would you recommend to provide a long term resolution for this issue?

### Options
- [ ] **A)** Create a new launch configuration to use the correct instance type. Modify the Auto Scaling group to use this new launch configuration. Delete the old launch configuration as it is no longer needed
- [ ] **B)** Modify the launch configuration to use the correct instance type and continue to use the existing Auto Scaling group
- [ ] **C)** No need to modify the launch configuration. Just modify the Auto Scaling group to use more number of existing instance types. More instances may offset the loss of performance
- [ ] **D)** No need to modify the launch configuration. Just modify the Auto Scaling group to use the correct instance type

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Create a new launch configuration to use the correct instance type. Modify the Auto Scaling group to use this new launch configuration. Delete the old launch configuration as it is no longer needed**

### Detailed Explanation
Correct option:

**Create a new launch configuration to use the correct instance type. Modify the Auto Scaling group to use this new launch configuration. Delete the old launch configuration as it is no longer needed**

A launch configuration is an instance configuration template that an Auto Scaling group uses to launch Amazon EC2 instances. When you create a launch configuration, you specify information for the instances. Include the ID of the Amazon Machine Image (AMI), the instance type, a key pair, one or more security groups, and a block device mapping.

It is not possible to modify a launch configuration once it is created. The correct option is to create a new launch configuration to use the correct instance type. Then modify the Auto Scaling group to use this new launch configuration. Lastly to clean-up, just delete the old launch configuration as it is no longer needed.

Incorrect options:

**Modify the launch configuration to use the correct instance type and continue to use the existing Auto Scaling group** - As mentioned earlier, it is not possible to modify a launch configuration once it is created. Hence, this option is incorrect.

**No need to modify the launch configuration. Just modify the Auto Scaling group to use the correct instance type** - You cannot use an Auto Scaling group to directly modify the instance type of the underlying instances. Hence, this option is incorrect.

**No need to modify the launch configuration. Just modify the Auto Scaling group to use more number of existing instance types. More instances may offset the loss of performance** - Using the Auto Scaling group to increase the number of instances to cover up for the performance loss is not recommended as it does not address the root cause of the problem. The Machine Learning workflow requires a certain instance type that is optimized to handle Machine Learning computations. Hence, this option is incorrect.

Reference:

<https://docs.aws.amazon.com/autoscaling/ec2/userguide/LaunchConfiguration.html>

</details>

---

## 📝 Q9: A retail company wants to rollout and test a blue-green depl...

A retail company wants to rollout and test a blue-green deployment for its global application in the next 48 hours. Most of the customers use mobile phones which are prone to Domain Name System (DNS) caching. The company has only two days left for the annual Thanksgiving sale to commence.

### Options
- [ ] **A)** As a Solutions Architect, which of the following options would you recommend to test the deployment on as many users as possible in the given time frame?
- [ ] **B)** Use AWS Global Accelerator to distribute a portion of traffic to a particular deployment

Use Elastic Load Balancing (ELB) to distribute traffic across deployments

Use Amazon Route 53 weighted routing to spread traffic across different deployments

Use AWS CodeDeploy deployment options to choose the right deployment

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use AWS Global Accelerator to distribute a portion of traffic to a particular deployment

Use Elastic Load Balancing (ELB) to distribute traffic across deployments

Use Amazon Route 53 weighted routing to spread traffic across different deployments

Use AWS CodeDeploy deployment options to choose the right deployment**

### Detailed Explanation
Correct option:

Blue/green deployment is a technique for releasing applications by shifting traffic between two identical environments running different versions of the application: "Blue" is the currently running version and "green" the new version. This type of deployment allows you to test features in the green environment without impacting the currently running version of your application. When you’re satisfied that the green version is working properly, you can gradually reroute the traffic from the old blue environment to the new green environment. Blue/green deployments can mitigate common risks associated with deploying software, such as downtime and rollback capability.

**Use AWS Global Accelerator to distribute a portion of traffic to a particular deployment**

AWS Global Accelerator is a network layer service that directs traffic to optimal endpoints over the AWS global network, this improves the availability and performance of your internet applications. It provides two static anycast IP addresses that act as a fixed entry point to your application endpoints in a single or multiple AWS Regions, such as your Application Load Balancers, Network Load Balancers, Elastic IP addresses or Amazon EC2 instances, in a single or in multiple AWS regions.

AWS Global Accelerator uses endpoint weights to determine the proportion of traffic that is directed to endpoints in an endpoint group, and traffic dials to control the percentage of traffic that is directed to an endpoint group (an AWS region where your application is deployed).

While relying on the DNS service is a great option for blue/green deployments, it may not fit use-cases that require a fast and controlled transition of the traffic. Some client devices and internet resolvers cache DNS answers for long periods; this DNS feature improves the efficiency of the DNS service as it reduces the DNS traffic across the Internet, and serves as a resiliency technique by preventing authoritative name-server overloads. The downside of this in blue/green deployments is that you don’t know how long it will take before all of your users receive updated IP addresses when you update a record, change your routing preference or when there is an application failure.

With AWS Global Accelerator, you can shift traffic gradually or all at once between the blue and the green environment and vice-versa without being subject to DNS caching on client devices and internet resolvers, traffic dials and endpoint weights changes are effective within seconds.

Incorrect options:

**Use Amazon Route 53 weighted routing to spread traffic across different deployments** - Weighted routing lets you associate multiple resources with a single domain name (example.com) or subdomain name (acme.example.com) and choose how much traffic is routed to each resource. This can be useful for a variety of purposes, including load balancing and testing new versions of the software. As discussed earlier, DNS caching is a negative behavior for this use case and hence Amazon Route 53 is not a good option.

**Use Elastic Load Balancing (ELB) to distribute traffic across deployments** - Elastic Load Balancing (ELB) can distribute traffic across healthy instances. You can also use the Application Load Balancers weighted target groups feature for blue/green deployments as it does not rely on the DNS service. In addition you don’t need to create new ALBs for the green environment. As the use-case refers to a global application, so this option cannot be used for a multi-Region solution which is needed for the given requirement.

**Use AWS CodeDeploy deployment options to choose the right deployment** - In AWS CodeDeploy, a deployment is the process, and the components involved in the process, of installing content on one or more instances. This content can consist of code, web and configuration files, executables, packages, scripts, and so on. AWS CodeDeploy deploys content that is stored in a source repository, according to the configuration rules you specify. Blue/Green deployment is one of the deployment types that CodeDeploy supports. CodeDeploy is not meant to distribute traffic across instances, so this option is incorrect.

References:

<https://aws.amazon.com/blogs/networking-and-content-delivery/using-aws-global-accelerator-to-achieve-blue-green-deployments>

<https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments.html>

<https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html#routing-policy-weighted>

</details>

---

## 📝 Q10: A cyber security company is running a mission critical appli...

A cyber security company is running a mission critical application using a single Spread placement group of Amazon EC2 instances. The company needs 15 Amazon EC2 instances for optimal performance.

### Options
- [ ] **A)** 14
- [ ] **B)** 15
- [ ] **C)** 3
- [ ] **D)** How many Availability Zones (AZs) will the company need to deploy these Amazon EC2 instances per the given use-case?

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **3**

### Detailed Explanation
Correct option:

**3**

When you launch a new Amazon EC2 instance, the EC2 service attempts to place the instance in such a way that all of your instances are spread out across underlying hardware to minimize correlated failures. You can use placement groups to influence the placement of a group of interdependent instances to meet the needs of your workload. Depending on the type of workload, you can create a placement group using one of the following placement strategies:

Cluster placement group

Partition placement group

Spread placement group.

A Spread placement group is a group of instances that are each placed on distinct racks, with each rack having its own network and power source.

Spread placement groups are recommended for applications that have a small number of critical instances that should be kept separate from each other. Launching instances in a spread placement group reduces the risk of simultaneous failures that might occur when instances share the same racks.

A spread placement group can span multiple Availability Zones in the same Region. You can have a maximum of seven running instances per Availability Zone per group. Therefore, to deploy 15 Amazon EC2 instances in a single Spread placement group, the company needs to use 3 Availability Zones.

Spread placement group overview:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt5-q11-i1.jpg)

 via - <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html>

Incorrect options:

**7**

**14**

**15**

These three options contradict the details provided in the explanation above, so these options are incorrect.

Reference:

<https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html>

</details>

---

## 📝 Q11: A company has hired you as an AWS Certified Solutions Archit...

A company has hired you as an AWS Certified Solutions Architect – Associate to help with redesigning a real-time data processor. The company wants to build custom applications that process and analyze the streaming data for its specialized needs. Which solution will you recommend to address this use-case?

### Options
- [ ] **A)** Use Amazon Kinesis Data Streams to process the data streams as well as decouple the producers and consumers for the real-time data processor

Use Amazon Simple Queue Service (Amazon SQS) to process the data streams as well as decouple the producers and consumers for the real-time data processor

Use Amazon Kinesis Data Firehose to process the data streams as well as decouple the producers and consumers for the real-time data processor
- [ ] **B)** Use Amazon Simple Notification Service (Amazon SNS) to process the data streams as well as decouple the producers and consumers for the real-time data processor

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use Amazon Kinesis Data Streams to process the data streams as well as decouple the producers and consumers for the real-time data processor

Use Amazon Simple Queue Service (Amazon SQS) to process the data streams as well as decouple the producers and consumers for the real-time data processor

Use Amazon Kinesis Data Firehose to process the data streams as well as decouple the producers and consumers for the real-time data processor**

### Detailed Explanation
Correct option:

**Use Amazon Kinesis Data Streams to process the data streams as well as decouple the producers and consumers for the real-time data processor**

Amazon Kinesis Data Streams is useful for rapidly moving data off data producers and then continuously processing the data, be it to transform the data before emitting to a data store, run real-time metrics and analytics, or derive more complex data streams for further processing. Kinesis data streams can continuously capture gigabytes of data per second from hundreds of thousands of sources such as website clickstreams, database event streams, financial transactions, social media feeds, IT logs, and location-tracking events.

Kinesis Data Streams Overview:

![img](https://d1.awsstatic.com/Products/product-name/diagrams/product-page-diagram_Amazon-Kinesis-Data-Streams.074de94302fd60948e1ad070e425eeda73d350e7.png)

 via - <https://aws.amazon.com/kinesis/data-streams/>

Incorrect options:

**Use Amazon Simple Notification Service (Amazon SNS) to process the data streams as well as decouple the producers and consumers for the real-time data processor** - Amazon Simple Notification Service (Amazon SNS) is a highly available, durable, secure, fully managed pub/sub messaging service that enables you to decouple microservices, distributed systems, and serverless applications. SNS cannot be used to decouple the producers and consumers for the real-time data processor as described in the given use-case.

**Use Amazon Simple Queue Service (Amazon SQS) to process the data streams as well as decouple the producers and consumers for the real-time data processor** - Amazon Simple Queue Service (Amazon SQS) offers a secure, durable, and available hosted queue that lets you integrate and decouple distributed software systems and components. SQS cannot be used to decouple the producers and consumers for the real-time data processor as described in the given use-case.

**Use Amazon Kinesis Data Firehose to process the data streams as well as decouple the producers and consumers for the real-time data processor** - Amazon Kinesis Data Firehose is the easiest way to load streaming data into data stores and analytics tools. Kinesis Firehose cannot be used to process and analyze the streaming data in custom applications. It can capture, transform, and load streaming data into Amazon S3, Amazon Redshift, Amazon Elasticsearch Service, and Splunk, enabling near real-time analytics.

Amazon Kinesis Data Firehose Overview

![img](https://d1.awsstatic.com/Products/product-name/diagrams/product-page-diagram_Amazon-Kinesis-Data-Firehose.9340b812ab86518341c47b24316995b3792bf6e1.png)

 via - <https://aws.amazon.com/kinesis/data-firehose/>

References:

<https://aws.amazon.com/kinesis/data-streams/>

<https://aws.amazon.com/kinesis/data-firehose/>

</details>

---

---

## 🔗 Graph-Linked Knowledge Base
