---


title: "Practice Questions: Domain 3 — Design Secure Applications and Architectures"
description: "Master-level architecture and implementation guide for Practice Questions: Domain 3 — Design Secure Applications and Architectures covering core theory, runtime mechanics, and production best practices."
category: "Technical Skills & Systems Architecture"
tags: [practice, questions, domain, technical, skills, systems, architecture, technical-skills, software-engineering, learning-note]
date: "2026-08-21"
---
# Practice Questions: Domain 3 — Design Secure Applications and Architectures

## 📝 Q1: You have been hired as a Solutions Architect to advise a com...

You have been hired as a Solutions Architect to advise a company on the various authentication/authorization mechanisms that AWS offers to authorize an API call within the Amazon API Gateway. The company would prefer a solution that offers built-in user management. Which of the following solutions would you suggest as the best fit for the given use-case?

### Options
- [ ] **A)** Use Amazon Cognito User Pools

Use AWS Lambda authorizer for Amazon API Gateway

Use AWS_IAM authorization

Use Amazon Cognito Identity Pools

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use Amazon Cognito User Pools

Use AWS Lambda authorizer for Amazon API Gateway

Use AWS_IAM authorization

Use Amazon Cognito Identity Pools**

### Detailed Explanation
Correct option:

**Use Amazon Cognito User Pools**

A user pool is a user directory in Amazon Cognito. You can leverage Amazon Cognito User Pools to either provide built-in user management or integrate with external identity providers, such as Facebook, Twitter, Google+, and Amazon. Whether your users sign-in directly or through a third party, all members of the user pool have a directory profile that you can access through a Software Development Kit (SDK).

User pools provide: 1. Sign-up and sign-in services. 2. A built-in, customizable web UI to sign in users. 3. Social sign-in with Facebook, Google, Login with Amazon, and Sign in with Apple, as well as sign-in with SAML identity providers from your user pool. 4. User directory management and user profiles. 5. Security features such as multi-factor authentication (MFA), checks for compromised credentials, account takeover protection, and phone and email verification. 6. Customized workflows and user migration through AWS Lambda triggers.

After creating an Amazon Cognito user pool, in API Gateway, you must then create a COGNITO_USER_POOLS authorizer that uses the user pool.

Amazon Cognito User Pools:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt2-q24-i1.jpg)

 via - <https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/identity-and-access-management.html>

Incorrect options:

**Use AWS_IAM authorization** - For consumers who currently are located within your AWS environment or have the means to retrieve AWS Identity and Access Management (IAM) temporary credentials to access your environment, you can use AWS_IAM authorization and add least-privileged permissions to the respective IAM role to securely invoke your API. API Gateway API Keys is not a security mechanism and should not be used for authorization unless it’s a public API. It should be used primarily to track a consumer’s usage across your API.

**Use AWS Lambda authorizer for Amazon API Gateway** - If you have an existing Identity Provider (IdP), you can use an AWS Lambda authorizer for Amazon API Gateway to invoke a Lambda function to authenticate/validate a given user against your Identity Provider. You can use a Lambda authorizer for custom validation logic based on identity metadata.

A Lambda authorizer can send additional information derived from a bearer token or request context values to your backend service. For example, the authorizer can return a map containing user IDs, user names, and scope. By using Lambda authorizers, your backend does not need to map authorization tokens to user-centric data, allowing you to limit the exposure of such information to just the authorization function.

When using Lambda authorizers, AWS strictly advises against passing credentials or any sort of sensitive data via query string parameters or headers, so this is not as secure as using Amazon Cognito User Pools.

In addition, both these options do not offer built-in user management.

**Use Amazon Cognito Identity Pools** - The two main components of Amazon Cognito are user pools and identity pools. Identity pools provide AWS credentials to grant your users access to other AWS services. To enable users in your user pool to access AWS resources, you can configure an identity pool to exchange user pool tokens for AWS credentials. So, identity pools aren't an authentication mechanism in themselves and hence aren't a choice for this use case.

References:

<https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/identity-and-access-management.html>

<https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-enable-cognito-user-pool.html>

<https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html>

</details>

---

## 📝 Q2: The engineering team at a company wants to use Amazon Simple...

The engineering team at a company wants to use Amazon Simple Queue Service (Amazon SQS) to decouple components of the underlying application architecture. However, the team is concerned about the VPC-bound components accessing Amazon Simple Queue Service (Amazon SQS) over the public internet.

### Options
- [ ] **A)** As a solutions architect, which of the following solutions would you recommend to address this use-case?
- [ ] **B)** Use Network Address Translation (NAT) instance to access Amazon SQS
- [ ] **C)** Use VPC endpoint to access Amazon SQS

Use VPN connection to access Amazon SQS

Use Internet Gateway to access Amazon SQS

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use VPC endpoint to access Amazon SQS

Use VPN connection to access Amazon SQS

Use Internet Gateway to access Amazon SQS**

### Detailed Explanation
Correct option:

**Use VPC endpoint to access Amazon SQS**

AWS customers can access Amazon Simple Queue Service (Amazon SQS) from their Amazon Virtual Private Cloud (Amazon VPC) using VPC endpoints, without using public IPs, and without needing to traverse the public internet. VPC endpoints for Amazon SQS are powered by AWS PrivateLink, a highly available, scalable technology that enables you to privately connect your VPC to supported AWS services.

Amazon VPC endpoints are easy to configure. They also provide reliable connectivity to Amazon SQS without requiring an internet gateway, Network Address Translation (NAT) instance, VPN connection, or AWS Direct Connect connection. With VPC endpoints, the data between your Amazon VPC and Amazon SQS queue is transferred within the Amazon network, helping protect your instances from internet traffic.

AWS PrivateLink simplifies the security of data shared with cloud-based applications by eliminating the exposure of data to the public Internet. AWS PrivateLink provides private connectivity between VPCs, AWS services, and on-premises applications, securely on the Amazon network. AWS PrivateLink makes it easy to connect services across different accounts and VPCs to significantly simplify the network architecture.

Incorrect options:

**Use Internet Gateway to access Amazon SQS** - An internet gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between instances in your VPC and the internet. It, therefore, imposes no availability risks or bandwidth constraints on your network traffic. This option is ruled out as the team does not want to use the public internet to access Amazon SQS.

**Use VPN connection to access Amazon SQS** - AWS Site-to-Site VPN (aka VPN Connection) enables you to securely connect your on-premises network or branch office site to your Amazon Virtual Private Cloud (Amazon VPC). You can securely extend your data center or branch office network to the cloud with an AWS Site-to-Site VPN connection. A VPC VPN Connection utilizes IPSec to establish encrypted network connectivity between your intranet and Amazon VPC over the Internet. VPN Connections can be configured in minutes and are a good solution if you have an immediate need, have low to modest bandwidth requirements, and can tolerate the inherent variability in Internet-based connectivity. As the existing infrastructure is within AWS Cloud, therefore a VPN connection is not required.

**Use Network Address Translation (NAT) instance to access Amazon SQS** - You can use a network address translation (NAT) instance in a public subnet in your VPC to enable instances in the private subnet to initiate outbound IPv4 traffic to the Internet or other AWS services, but prevent the instances from receiving inbound traffic initiated by someone on the Internet. Amazon provides Amazon Linux AMIs that are configured to run as NAT instances. These AMIs include the string amzn-ami-vpc-nat in their names, so you can search for them in the Amazon EC2 console. This option is ruled out because NAT instances are used to provide internet access to any instances in a private subnet.

References:

<https://aws.amazon.com/privatelink/>

<https://aws.amazon.com/about-aws/whats-new/2018/12/amazon-sqs-vpc-endpoints-aws-privatelink/>

</details>

---

## 📝 Q3: A retail company uses Amazon Elastic Compute Cloud (Amazon E...

A retail company uses Amazon Elastic Compute Cloud (Amazon EC2) instances, Amazon API Gateway, Amazon RDS, Elastic Load Balancer and Amazon CloudFront services. To improve the security of these services, the Risk Advisory group has suggested a feasibility check for using the Amazon GuardDuty service. Which of the following would you identify as data sources supported by Amazon GuardDuty?

### Options
- [ ] **A)** Elastic Load Balancing logs, Domain Name System (DNS) logs, AWS CloudTrail events
- [ ] **B)** VPC Flow Logs, Amazon API Gateway logs, Amazon S3 access logs
- [ ] **C)** VPC Flow Logs, Domain Name System (DNS) logs, AWS CloudTrail events

Amazon CloudFront logs, Amazon API Gateway logs, AWS CloudTrail events

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **VPC Flow Logs, Domain Name System (DNS) logs, AWS CloudTrail events

Amazon CloudFront logs, Amazon API Gateway logs, AWS CloudTrail events**

### Detailed Explanation
Correct option:

**VPC Flow Logs, Domain Name System (DNS) logs, AWS CloudTrail events**

Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts, workloads, and data stored in Amazon S3. With the cloud, the collection and aggregation of account and network activities is simplified, but it can be time-consuming for security teams to continuously analyze event log data for potential threats. With GuardDuty, you now have an intelligent and cost-effective option for continuous threat detection in AWS. The service uses machine learning, anomaly detection, and integrated threat intelligence to identify and prioritize potential threats.

Amazon GuardDuty analyzes tens of billions of events across multiple AWS data sources, such as AWS CloudTrail events, Amazon VPC Flow Logs, and DNS logs.

With a few clicks in the AWS Management Console, GuardDuty can be enabled with no software or hardware to deploy or maintain. By integrating with Amazon EventBridge Events, GuardDuty alerts are actionable, easy to aggregate across multiple accounts, and straightforward to push into existing event management and workflow systems.

How Amazon GuardDuty works:

![img](https://d1.awsstatic.com/product-marketing/Amazon%20GuardDuty/product-page-diagram-Amazon-GuardDuty_how-it-works.a4daf7e3aaf3532623a3797dd3af606a85fc2e7b.png)

 via - <https://aws.amazon.com/guardduty/>

Incorrect options:

**VPC Flow Logs, Amazon API Gateway logs, Amazon S3 access logs**

**Elastic Load Balancing logs, Domain Name System (DNS) logs, AWS CloudTrail events**

**Amazon CloudFront logs, Amazon API Gateway logs, AWS CloudTrail events**

These three options contradict the explanation provided above, so these options are incorrect.

Reference:

<https://aws.amazon.com/guardduty/>

</details>

---

## 📝 Q4: An IT company wants to review its security best-practices af...

An IT company wants to review its security best-practices after an incident was reported where a new developer on the team was assigned full access to Amazon DynamoDB. The developer accidentally deleted a couple of tables from the production environment while building out a new feature. Which is the MOST effective way to address this issue so that such incidents do not recur?

### Options
- [ ] **A)** Only root user should have full database access in the organization
- [ ] **B)** The CTO should review the permissions for each new developer's IAM user so that such incidents don't recur
- [ ] **C)** Use permissions boundary to control the maximum permissions employees can grant to the IAM principals

Remove full database access for all IAM users in the organization

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use permissions boundary to control the maximum permissions employees can grant to the IAM principals

Remove full database access for all IAM users in the organization**

### Detailed Explanation
Correct option:

**Use permissions boundary to control the maximum permissions employees can grant to the IAM principals**

A permissions boundary can be used to control the maximum permissions employees can grant to the IAM principals (that is, users and roles) that they create and manage. As the IAM administrator, you can define one or more permissions boundaries using managed policies and allow your employee to create a principal with this boundary. The employee can then attach a permissions policy to this principal. However, the effective permissions of the principal are the intersection of the permissions boundary and permissions policy. As a result, the new principal cannot exceed the boundary that you defined. Therefore, using the permissions boundary offers the right solution for this use-case.

Permission Boundary Example:

![img](https://d2908q01vomqb2.cloudfront.net/22d200f8670dbdb3e253a90eee5098477c95c23d/2018/07/03/delegated-admin-02.png)

 via - <https://aws.amazon.com/blogs/security/delegate-permission-management-to-developers-using-iam-permissions-boundaries/>

Incorrect options:

**Remove full database access for all IAM users in the organization** - It is not practical to remove full access for all IAM users in the organization because a select set of users need this access for database administration. So this option is not correct.

**The CTO should review the permissions for each new developer's IAM user so that such incidents don't recur** - Likewise the CTO is not expected to review the permissions for each new developer's IAM user, as this is best done via an automated procedure. This option has been added as a distractor.

**Only root user should have full database access in the organization** - As a best practice, the root user should not access the AWS account to carry out any administrative procedures. So this option is not correct.

Reference:

<https://aws.amazon.com/blogs/security/delegate-permission-management-to-developers-using-iam-permissions-boundaries/>

</details>

---

## 📝 Q5: A developer needs to implement an AWS Lambda function in AWS...

A developer needs to implement an AWS Lambda function in AWS account A that accesses an Amazon Simple Storage Service (Amazon S3) bucket in AWS account B. As a Solutions Architect, which of the following will you recommend to meet this requirement?

### Options
- [ ] **A)** AWS Lambda cannot access resources across AWS accounts. Use Identity federation to work around this limitation of Lambda
- [ ] **B)** Create an IAM role for the AWS Lambda function that grants access to the Amazon S3 bucket. Set the IAM role as the AWS Lambda function's execution role. Make sure that the bucket policy also grants access to the AWS Lambda function's execution role

The Amazon S3 bucket owner should make the bucket public so that it can be accessed by the AWS Lambda function in the other AWS account
- [ ] **C)** Create an IAM role for the AWS Lambda function that grants access to the Amazon S3 bucket. Set the IAM role as the Lambda function's execution role and that would give the AWS Lambda function cross-account access to the Amazon S3 bucket

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Create an IAM role for the AWS Lambda function that grants access to the Amazon S3 bucket. Set the IAM role as the AWS Lambda function's execution role. Make sure that the bucket policy also grants access to the AWS Lambda function's execution role

The Amazon S3 bucket owner should make the bucket public so that it can be accessed by the AWS Lambda function in the other AWS account**

### Detailed Explanation
Correct option:

**Create an IAM role for the AWS Lambda function that grants access to the Amazon S3 bucket. Set the IAM role as the AWS Lambda function's execution role. Make sure that the bucket policy also grants access to the AWS Lambda function's execution role**

If the IAM role that you create for the Lambda function is in the same AWS account as the bucket, then you don't need to grant Amazon S3 permissions on both the IAM role and the bucket policy. Instead, you can grant the permissions on the IAM role and then verify that the bucket policy doesn't explicitly deny access to the Lambda function role. If the IAM role and the bucket are in different accounts, then you need to grant Amazon S3 permissions on both the IAM role and the bucket policy. Therefore, this is the right way of giving access to AWS Lambda for the given use-case.

Complete list of steps to be followed:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt2-q16-i1.jpg)

 via - <https://aws.amazon.com/premiumsupport/knowledge-center/lambda-execution-role-s3-bucket/>

Incorrect options:

**AWS Lambda cannot access resources across AWS accounts. Use Identity federation to work around this limitation of Lambda** - This is an incorrect statement, used only as a distractor.

**Create an IAM role for the AWS Lambda function that grants access to the Amazon S3 bucket. Set the IAM role as the Lambda function's execution role and that would give the AWS Lambda function cross-account access to the Amazon S3 bucket** - When the execution role of AWS Lambda and Amazon S3 bucket to be accessed are from different accounts, then you need to grant Amazon S3 bucket access permissions to the IAM role and also ensure that the bucket policy grants access to the AWS Lambda function's execution role.

**The Amazon S3 bucket owner should make the bucket public so that it can be accessed by the AWS Lambda function in the other AWS account** - Making the Amazon S3 bucket public for the given use-case will be considered as a security bad practice. It's usually done for very few use-cases such as hosting a website on Amazon S3. Therefore this option is incorrect.

Reference:

<https://aws.amazon.com/premiumsupport/knowledge-center/lambda-execution-role-s3-bucket/>

</details>

---

## 📝 Q6: An organization wants to delegate access to a set of users f...

An organization wants to delegate access to a set of users from the development environment so that they can access some resources in the production environment which is managed under another AWS account. As a solutions architect, which of the following steps would you recommend?

### Options
- [ ] **A)** Both IAM roles and IAM users can be used interchangeably for cross-account access
- [ ] **B)** Create a new IAM role with the required permissions to access the resources in the production environment. The users can then assume this IAM role while accessing the resources from the production environment
- [ ] **C)** Create new IAM user credentials for the production environment and share these credentials with the set of users from the development environment
- [ ] **D)** It is not possible to access cross-account resources

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Create a new IAM role with the required permissions to access the resources in the production environment. The users can then assume this IAM role while accessing the resources from the production environment**

### Detailed Explanation
Correct option:

**Create a new IAM role with the required permissions to access the resources in the production environment. The users can then assume this IAM role while accessing the resources from the production environment**

IAM roles allow you to delegate access to users or services that normally don't have access to your organization's AWS resources. IAM users or AWS services can assume a role to obtain temporary security credentials that can be used to make AWS API calls. Consequently, you don't have to share long-term credentials for access to a resource. Using IAM roles, it is possible to access cross-account resources.

Incorrect options:

**Create new IAM user credentials for the production environment and share these credentials with the set of users from the development environment** - There is no need to create new IAM user credentials for the production environment, as you can use IAM roles to access cross-account resources.

**It is not possible to access cross-account resources** - You can use IAM roles to access cross-account resources.

**Both IAM roles and IAM users can be used interchangeably for cross-account access** - IAM roles and IAM users are separate IAM entities and should not be mixed. Only IAM roles can be used to access cross-account resources.

Reference:

<https://aws.amazon.com/iam/features/manage-roles/>

</details>

---

## 📝 Q7: A media company has its corporate headquarters in Los Angele...

A media company has its corporate headquarters in Los Angeles with an on-premises data center using an AWS Direct Connect connection to the AWS VPC. The branch offices in San Francisco and Miami use AWS Site-to-Site VPN connections to connect to the AWS VPC. The company is looking for a solution to have the branch offices send and receive data with each other as well as with their corporate headquarters.

### Options
- [ ] **A)** AWS VPN CloudHub

VPC Endpoint
- [ ] **B)** As a solutions architect, which of the following AWS services would you recommend addressing this use-case?
- [ ] **C)** Software VPN
- [ ] **D)** VPC Peering connection

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **AWS VPN CloudHub

VPC Endpoint**

### Detailed Explanation
Correct option:

**AWS VPN CloudHub**

If you have multiple AWS Site-to-Site VPN connections, you can provide secure communication between sites using the AWS VPN CloudHub. This enables your remote sites to communicate with each other, and not just with the VPC. Sites that use AWS Direct Connect connections to the virtual private gateway can also be part of the AWS VPN CloudHub. The VPN CloudHub operates on a simple hub-and-spoke model that you can use with or without a VPC. This design is suitable if you have multiple branch offices and existing internet connections and would like to implement a convenient, potentially low-cost hub-and-spoke model for primary or backup connectivity between these remote offices.

Per the given use-case, the corporate headquarters has an AWS Direct Connect connection to the VPC and the branch offices have Site-to-Site VPN connections to the VPC. Therefore using the AWS VPN CloudHub, branch offices can send and receive data with each other as well as with their corporate headquarters.

AWS VPN CloudHub:

![img](https://docs.aws.amazon.com/vpn/latest/s2svpn/images/AWS_VPN_CloudHub-diagram.png)

 via - <https://docs.aws.amazon.com/vpn/latest/s2svpn/VPN_CloudHub.html>

Incorrect options:

**VPC Endpoint** - A VPC endpoint enables you to privately connect your VPC to supported AWS services and VPC endpoint services powered by AWS PrivateLink without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection. Instances in your VPC do not require public IP addresses to communicate with resources in the service. AWS PrivateLink simplifies the security of data shared with cloud-based applications by eliminating the exposure of data to the public Internet. When you use VPC endpoint, the traffic between your VPC and the other AWS service does not leave the Amazon network, therefore this option cannot be used to send and receive data between the remote branch offices of the company.

**VPC Peering connection** - A VPC peering connection is a networking connection between two VPCs that enables you to route traffic between them using private IPv4 addresses or IPv6 addresses. Instances in either VPC can communicate with each other as if they are within the same network. VPC peering facilitates a connection between two VPCs within the AWS network, therefore this option cannot be used to send and receive data between the remote branch offices of the company.

**Software VPN** - Amazon VPC offers you the flexibility to fully manage both sides of your Amazon VPC connectivity by creating a VPN connection between your remote network and a software VPN appliance running in your Amazon VPC network. Since Software VPN just handles connectivity between the remote network and Amazon VPC, therefore it cannot be used to send and receive data between the remote branch offices of the company.

References:

<https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-vpn-cloudhub-network-to-amazon.html>

<https://docs.aws.amazon.com/vpn/latest/s2svpn/VPN_CloudHub.html>

</details>

---

## 📝 Q8: A retail company uses AWS Cloud to manage its technology inf...

A retail company uses AWS Cloud to manage its technology infrastructure. The company has deployed its consumer-focused web application on Amazon EC2-based web servers and uses Amazon RDS PostgreSQL database as the data store. The PostgreSQL database is set up in a private subnet that allows inbound traffic from selected Amazon EC2 instances. The database also uses AWS Key Management Service (AWS KMS) for encrypting data at rest.

### Options
- [ ] **A)** Configure Amazon RDS to use SSL for data in transit

Create a new network access control list (network ACL) that blocks SSH from the entire Amazon EC2 subnet into the database

Use IAM authentication to access the database instead of the database user's access credentials
- [ ] **B)** Create a new security group that blocks SSH from the selected Amazon EC2 instances into the database
- [ ] **C)** Which of the following steps would you recommend to facilitate end-to-end security for the data-in-transit while accessing the database?

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Configure Amazon RDS to use SSL for data in transit

Create a new network access control list (network ACL) that blocks SSH from the entire Amazon EC2 subnet into the database

Use IAM authentication to access the database instead of the database user's access credentials**

### Detailed Explanation
Correct option:

**Configure Amazon RDS to use SSL for data in transit**

You can use Secure Socket Layer / Transport Layer Security (SSL/TLS) connections to encrypt data in transit. Amazon RDS creates an SSL certificate and installs the certificate on the DB instance when the instance is provisioned. For MySQL, you launch the MySQL client using the --ssl_ca parameter to reference the public key to encrypt connections. Using SSL, you can encrypt a PostgreSQL connection between your applications and your PostgreSQL DB instances. You can also force all connections to your PostgreSQL DB instance to use SSL.

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt3-q31-i1.jpg)

 via - <https://aws.amazon.com/rds/features/security/>

Incorrect options:

**Use IAM authentication to access the database instead of the database user's access credentials** - You can authenticate to your database instance using AWS Identity and Access Management (IAM) database authentication. IAM database authentication works with MySQL and PostgreSQL. With this authentication method, you don't need to use a password when you connect to a database instance. Instead, you use an authentication token.

IAM authentication is just another way to authenticate the user's credentials while accessing the database. It would not significantly enhance the security in a way that enabling SSL does by facilitating the in-transit encryption for the database.

**Create a new security group that blocks SSH from the selected Amazon EC2 instances into the database**

**Create a new network access control list (network ACL) that blocks SSH from the entire Amazon EC2 subnet into the database**

Both these options are added as distractors. You cannot SSH into an Amazon RDS database instance.

References:

<https://aws.amazon.com/rds/features/security/>

<https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html#MySQL.Concepts.SSLSupport>

<https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html#PostgreSQL.Concepts.General.SSL>

<https://aws.amazon.com/blogs/database/using-iam-authentication-to-connect-with-pgadmin-amazon-aurora-postgresql-or-amazon-rds-for-postgresql/>

</details>

---

## 📝 Q9: A financial services company has deployed its flagship appli...

A financial services company has deployed its flagship application on Amazon EC2 instances. Since the application handles sensitive customer data, the security team at the company wants to ensure that any third-party Secure Sockets Layer certificate (SSL certificate) SSL/Transport Layer Security (TLS) certificates configured on Amazon EC2 instances via the AWS Certificate Manager (ACM) are renewed before their expiry date. The company has hired you as an AWS Certified Solutions Architect Associate to build a solution that notifies the security team 30 days before the certificate expiration. The solution should require the least amount of scripting and maintenance effort. What will you recommend?

### Options
- [ ] **A)** Leverage AWS Config managed rule to check if any third-party SSL/TLS certificates imported into ACM are marked for expiration within 30 days. Configure the rule to trigger an Amazon SNS notification to the security team if any certificate expires within 30 days

Leverage AWS Config managed rule to check if any SSL/TLS certificates created via ACM are marked for expiration within 30 days. Configure the rule to trigger an Amazon SNS notification to the security team if any certificate expires within 30 days

Monitor the `days to expiry` Amazon CloudWatch metric for certificates imported into ACM. Create a CloudWatch alarm to monitor such certificates based on the `days to expiry` metric and then trigger a custom action of notifying the security team
- [ ] **B)** Monitor the `days to expiry` Amazon CloudWatch metric for certificates created via ACM. Create a CloudWatch alarm to monitor such certificates based on the `days to expiry` metric and then trigger a custom action of notifying the security team

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Leverage AWS Config managed rule to check if any third-party SSL/TLS certificates imported into ACM are marked for expiration within 30 days. Configure the rule to trigger an Amazon SNS notification to the security team if any certificate expires within 30 days

Leverage AWS Config managed rule to check if any SSL/TLS certificates created via ACM are marked for expiration within 30 days. Configure the rule to trigger an Amazon SNS notification to the security team if any certificate expires within 30 days

Monitor the `days to expiry` Amazon CloudWatch metric for certificates imported into ACM. Create a CloudWatch alarm to monitor such certificates based on the `days to expiry` metric and then trigger a custom action of notifying the security team**

### Detailed Explanation
Correct option:

**Leverage AWS Config managed rule to check if any third-party SSL/TLS certificates imported into ACM are marked for expiration within 30 days. Configure the rule to trigger an Amazon SNS notification to the security team if any certificate expires within 30 days**

AWS Certificate Manager is a service that lets you easily provision, manage, and deploy public and private Secure Sockets Layer/Transport Layer Security (SSL/TLS) certificates for use with AWS services and your internal connected resources. SSL/TLS certificates are used to secure network communications and establish the identity of websites over the Internet as well as resources on private networks.

AWS Config provides a detailed view of the configuration of AWS resources in your AWS account. This includes how the resources are related to one another and how they were configured in the past so that you can see how the configurations and relationships change over time.

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt2-q9-i2.jpg)

 via - <https://docs.aws.amazon.com/config/latest/developerguide/how-does-config-work.html>

AWS Config provides AWS-managed rules, which are predefined, customizable rules that AWS Config uses to evaluate whether your AWS resources comply with common best practices. You can leverage an AWS Config managed rule to check if any ACM certificates in your account are marked for expiration within the specified number of days. Certificates provided by ACM are automatically renewed. ACM does not automatically renew the certificates that you import. The rule is NON_COMPLIANT if your certificates are about to expire.

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt2-q9-i3.jpg)

 via - <https://docs.aws.amazon.com/config/latest/developerguide/how-does-config-work.html>

You can configure AWS Config to stream configuration changes and notifications to an Amazon SNS topic. For example, when a resource is updated, you can get a notification sent to your email, so that you can view the changes. You can also be notified when AWS Config evaluates your custom or managed rules against your resources.

Incorrect options:

**Monitor the `days to expiry` Amazon CloudWatch metric for certificates imported into ACM. Create a CloudWatch alarm to monitor such certificates based on the `days to expiry` metric and then trigger a custom action of notifying the security team** - AWS Certificate Manager (ACM) does not attempt to renew third-party certificates that are imported. Also, an administrator needs to reconfigure missing DNS records for certificates that use DNS validation if the record was removed for any reason after the certificate was issued. Metrics and events provide you visibility into such certificates that require intervention to continue the renewal process. Amazon CloudWatch metrics and Amazon EventBridge events are enabled for all certificates that are managed by ACM. Users can monitor `days to expiry` as a metric for ACM certificates through Amazon CloudWatch. An Amazon EventBridge expiry event is published for any certificate that is at least 45 days away from expiry by default. Users can build alarms to monitor certificates based on days to expiry and also trigger custom actions such as calling a Lambda function or paging an administrator.

It is certainly possible to use the `days to expiry` CloudWatch metric to build a CloudWatch alarm to monitor the imported ACM certificates. The alarm will, in turn, trigger a notification to the security team. But this option needs more configuration effort than directly using the AWS Config managed rule that is available off-the-shelf.

**Leverage AWS Config managed rule to check if any SSL/TLS certificates created via ACM are marked for expiration within 30 days. Configure the rule to trigger an Amazon SNS notification to the security team if any certificate expires within 30 days**

**Monitor the `days to expiry` Amazon CloudWatch metric for certificates created via ACM. Create a CloudWatch alarm to monitor such certificates based on the `days to expiry` metric and then trigger a custom action of notifying the security team**

Any SSL/TLS certificates created via ACM do not need any monitoring/intervention for expiration. ACM automatically renews such certificates. Hence both these options are incorrect.

References:

<https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html>

<https://docs.aws.amazon.com/config/latest/developerguide/how-does-config-work.html>

<https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config.html>

<https://docs.aws.amazon.com/config/latest/developerguide/acm-certificate-expiration-check.html>

<https://aws.amazon.com/blogs/security/how-to-monitor-expirations-of-imported-certificates-in-aws-certificate-manager-acm/>

</details>

---

## 📝 Q10: An IT company provides Amazon Simple Storage Service (Amazon...

An IT company provides Amazon Simple Storage Service (Amazon S3) bucket access to specific users within the same account for completing project specific work. With changing business requirements, cross-account S3 access requests are also growing every month. The company is looking for a solution that can offer user level as well as account-level access permissions for the data stored in Amazon S3 buckets.

### Options
- [ ] **A)** As a Solutions Architect, which of the following would you suggest as the MOST optimized way of controlling access for this use-case?
- [ ] **B)** Use Access Control Lists (ACLs)
- [ ] **C)** Use Amazon S3 Bucket Policies

Use Security Groups
- [ ] **D)** Use Identity and Access Management (IAM) policies

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use Amazon S3 Bucket Policies

Use Security Groups**

### Detailed Explanation
Correct option:

**Use Amazon S3 Bucket Policies**

Bucket policies in Amazon S3 can be used to add or deny permissions across some or all of the objects within a single bucket. Policies can be attached to users, groups, or Amazon S3 buckets, enabling centralized management of permissions. With bucket policies, you can grant users within your AWS Account or other AWS Accounts access to your Amazon S3 resources.

You can further restrict access to specific resources based on certain conditions. For example, you can restrict access based on request time (Date Condition), whether the request was sent using SSL (Boolean Conditions), a requester’s IP address (IP Address Condition), or based on the requester's client application (String Conditions). To identify these conditions, you use policy keys.

Types of access control in Amazon S3:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt2-q14-i1.jpg)

 via - <https://d1.awsstatic.com/whitepapers/aws-security-whitepaper.pdf>

Incorrect options:

**Use Identity and Access Management (IAM) policies** - AWS IAM enables organizations with many employees to create and manage multiple users under a single AWS account. IAM policies are attached to the users, enabling centralized control of permissions for users under your AWS Account to access buckets or objects. With IAM policies, you can only grant users within your own AWS account permission to access your Amazon S3 resources. So, this is not the right choice for the current requirement.

**Use Access Control Lists (ACLs)** - Within Amazon S3, you can use ACLs to give read or write access on buckets or objects to groups of users. With ACLs, you can only grant other AWS accounts (not specific users) access to your Amazon S3 resources. So, this is not the right choice for the current requirement.

**Use Security Groups** - A security group acts as a virtual firewall for Amazon EC2 instances to control incoming and outgoing traffic. Amazon S3 does not support Security Groups, this option just acts as a distractor.

Reference:

<https://d1.awsstatic.com/whitepapers/aws-security-whitepaper.pdf>

</details>

---

## 📝 Q11: A retail organization is moving some of its on-premises data...

A retail organization is moving some of its on-premises data to AWS Cloud. The DevOps team at the organization has set up an AWS Managed IPSec VPN Connection between their remote on-premises network and their Amazon VPC over the internet. Which of the following represents the correct configuration for the IPSec VPN Connection?

### Options
- [ ] **A)** Create a Customer Gateway on both the AWS side of the VPN as well as the on-premises side of the VPN
- [ ] **B)** Create a virtual private gateway (VGW) on both the AWS side of the VPN as well as the on-premises side of the VPN
- [ ] **C)** Create a virtual private gateway (VGW) on the AWS side of the VPN and a Customer Gateway on the on-premises side of the VPN
- [ ] **D)** Create a virtual private gateway (VGW) on the on-premises side of the VPN and a Customer Gateway on the AWS side of the VPN

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Create a virtual private gateway (VGW) on the AWS side of the VPN and a Customer Gateway on the on-premises side of the VPN**

### Detailed Explanation
Correct option:

**Create a virtual private gateway (VGW) on the AWS side of the VPN and a Customer Gateway on the on-premises side of the VPN**

Amazon VPC provides the facility to create an IPsec VPN connection (also known as AWS site-to-site VPN) between remote customer networks and their Amazon VPC over the internet. The following are the key concepts for a site-to-site VPN:

Virtual private gateway: A virtual private gateway (VGW), also known as a VPN Gateway is the endpoint on the AWS VPC side of your VPN connection.

VPN connection: A secure connection between your on-premises equipment and your VPCs.

VPN tunnel: An encrypted link where data can pass from the customer network to or from AWS.

Customer Gateway: An AWS resource that provides information to AWS about your Customer Gateway device.

Customer Gateway device: A physical device or software application on the customer side of the Site-to-Site VPN connection.

AWS Managed IPSec VPN

![img](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/images/aws-managed-vpn.png)

 via - <https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-managed-vpn-network-to-amazon.html>

Incorrect options:

**Create a virtual private gateway (VGW) on the on-premises side of the VPN and a Customer Gateway on the AWS side of the VPN** - You need to create a virtual private gateway (VGW) on the AWS side of the VPN and a Customer Gateway on the on-premises side of the VPN. Therefore, this option is wrong.

**Create a Customer Gateway on both the AWS side of the VPN as well as the on-premises side of the VPN** - You need to create a virtual private gateway (VGW) on the AWS side of the VPN and a Customer Gateway on the on-premises side of the VPN. Therefore, this option is wrong.

**Create a virtual private gateway (VGW) on both the AWS side of the VPN as well as the on-premises side of the VPN** - You need to create a virtual private gateway (VGW) on the AWS side of the VPN and a Customer Gateway on the on-premises side of the VPN. Therefore, this option is wrong.

References:

<https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-managed-vpn-network-to-amazon.html>

<https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html>

</details>

---

## 📝 Q12: The infrastructure team at a company maintains 5 different V...

The infrastructure team at a company maintains 5 different VPCs (let's call these VPCs A, B, C, D, E) for resource isolation. Due to the changed organizational structure, the team wants to interconnect all VPCs together. To facilitate this, the team has set up VPC peering connection between VPC A and all other VPCs in a hub and spoke model with VPC A at the center. However, the team has still failed to establish connectivity between all VPCs.

### Options
- [ ] **A)** As a solutions architect, which of the following would you recommend as the MOST resource-efficient and scalable solution?
- [ ] **B)** Establish VPC peering connections between all VPCs
- [ ] **C)** Use AWS transit gateway to interconnect the VPCs

Use an internet gateway to interconnect the VPCs
- [ ] **D)** Use a VPC endpoint to interconnect the VPCs

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use AWS transit gateway to interconnect the VPCs

Use an internet gateway to interconnect the VPCs**

### Detailed Explanation
Correct option:

**Use AWS transit gateway to interconnect the VPCs**

An AWS transit gateway is a network transit hub that you can use to interconnect your virtual private clouds (VPC) and on-premises networks.

AWS Transit Gateway Overview:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt5-q14-i2.jpg)

 via - <https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html>

A VPC peering connection is a networking connection between two VPCs that enables you to route traffic between them using private IPv4 addresses or IPv6 addresses. Transitive Peering does not work for VPC peering connections. So, if you have a VPC peering connection between VPC A and VPC B (pcx-aaaabbbb), and between VPC A and VPC C (pcx-aaaacccc). Then, there is no VPC peering connection between VPC B and VPC C. Instead of using VPC peering, you can use an AWS Transit Gateway that acts as a network transit hub, to interconnect your VPCs or connect your VPCs with on-premises networks. Therefore this is the correct option.

VPC Peering Connections Overview:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt5-q14-i1.jpg)

 via - <https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html>

Incorrect options:

**Use an internet gateway to interconnect the VPCs** - An internet gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between instances in your VPC and the internet. It, therefore, imposes no availability risks or bandwidth constraints on your network traffic. You cannot use an internet gateway to interconnect your VPCs and on-premises networks, hence this option is incorrect.

**Use a VPC endpoint to interconnect the VPCs** - A VPC endpoint enables you to privately connect your VPC to supported AWS services and VPC endpoint services powered by AWS PrivateLink without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection. You cannot use a VPC endpoint to interconnect your VPCs and on-premises networks, hence this option is incorrect.

**Establish VPC peering connections between all VPCs** - Establishing VPC peering between all VPCs is an inelegant and clumsy way to establish connectivity between all VPCs. Instead, you should use a Transit Gateway that acts as a network transit hub to interconnect your VPCs and on-premises networks.

References:

<https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html>

<https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html>

</details>

---

## 📝 Q13: A financial services company wants to identify any sensitive...

A financial services company wants to identify any sensitive data stored on its Amazon S3 buckets. The company also wants to monitor and protect all data stored on Amazon S3 against any malicious activity.

### Options
- [ ] **A)** As a solutions architect, which of the following solutions would you recommend to help address the given requirements?
- [ ] **B)** Use Amazon GuardDuty to monitor any malicious activity on data stored in Amazon S3. Use Amazon Macie to identify any sensitive data stored on Amazon S3

Use Amazon GuardDuty to monitor any malicious activity on data stored in Amazon S3 as well as to identify any sensitive data stored on Amazon S3

Use Amazon Macie to monitor any malicious activity on data stored in Amazon S3. Use Amazon GuardDuty to identify any sensitive data stored on Amazon S3
- [ ] **C)** Use Amazon Macie to monitor any malicious activity on data stored in Amazon S3 as well as to identify any sensitive data stored on Amazon S3

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use Amazon GuardDuty to monitor any malicious activity on data stored in Amazon S3. Use Amazon Macie to identify any sensitive data stored on Amazon S3

Use Amazon GuardDuty to monitor any malicious activity on data stored in Amazon S3 as well as to identify any sensitive data stored on Amazon S3

Use Amazon Macie to monitor any malicious activity on data stored in Amazon S3. Use Amazon GuardDuty to identify any sensitive data stored on Amazon S3**

### Detailed Explanation
Correct option:

**Use Amazon GuardDuty to monitor any malicious activity on data stored in Amazon S3. Use Amazon Macie to identify any sensitive data stored on Amazon S3**

Amazon GuardDuty offers threat detection that enables you to continuously monitor and protect your AWS accounts, workloads, and data stored in Amazon S3. GuardDuty analyzes continuous streams of meta-data generated from your account and network activity found in AWS CloudTrail Events, Amazon VPC Flow Logs, and DNS Logs. It also uses integrated threat intelligence such as known malicious IP addresses, anomaly detection, and machine learning to identify threats more accurately.

How Amazon GuardDuty works:

![img](https://d1.awsstatic.com/product-marketing/Amazon%20GuardDuty/product-page-diagram-Amazon-GuardDuty_how-it-works.a4daf7e3aaf3532623a3797dd3af606a85fc2e7b.png)

 via - <https://aws.amazon.com/guardduty/>

Amazon Macie is a fully managed data security and data privacy service that uses machine learning and pattern matching to discover and protect your sensitive data on Amazon S3. Macie automatically detects a large and growing list of sensitive data types, including personally identifiable information (PII) such as names, addresses, and credit card numbers. It also gives you constant visibility of the data security and data privacy of your data stored in Amazon S3.

How Amazon Macie works:

![img](https://d1.awsstatic.com/product-marketing/macie/Product-Page-Diagram_AWS-Macie%402x.369dcc5a001e7a44b121d65637ff82b60b809148.png)

 via - <https://aws.amazon.com/macie/>

Incorrect options:

**Use Amazon GuardDuty to monitor any malicious activity on data stored in Amazon S3 as well as to identify any sensitive data stored on Amazon S3**

**Use Amazon Macie to monitor any malicious activity on data stored in Amazon S3 as well as to identify any sensitive data stored on Amazon S3**

**Use Amazon Macie to monitor any malicious activity on data stored in Amazon S3. Use Amazon GuardDuty to identify any sensitive data stored on Amazon S3**

These three options contradict the explanation provided above, so these options are incorrect.

References:

<https://aws.amazon.com/guardduty/>

<https://aws.amazon.com/macie/>

</details>

---

## 📝 Q14: A pharma company is working on developing a vaccine for the ...

A pharma company is working on developing a vaccine for the COVID-19 virus. The researchers at the company want to process the reference healthcare data in a highly available as well as HIPAA compliant in-memory database that supports caching results of SQL queries. As a solutions architect, which of the following AWS services would you recommend for this task?

### Options
- [ ] **A)** Amazon ElastiCache for Redis/Memcached

Amazon DynamoDB

Amazon DynamoDB Accelerator (DAX)

Amazon DocumentDB

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Amazon ElastiCache for Redis/Memcached

Amazon DynamoDB

Amazon DynamoDB Accelerator (DAX)

Amazon DocumentDB**

### Detailed Explanation
Correct option:

**Amazon ElastiCache for Redis/Memcached**

Amazon ElastiCache Overview:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt5-q16-i1.jpg)

 via - <https://aws.amazon.com/elasticache/redis-vs-memcached/>

Amazon ElastiCache for Redis is a blazing fast in-memory data store that provides sub-millisecond latency to power internet-scale real-time applications. Amazon ElastiCache for Redis is a great choice for real-time transactional and analytical processing use cases such as caching, chat/messaging, gaming leaderboards, geospatial, machine learning, media streaming, queues, real-time analytics, and session store. ElastiCache for Redis supports replication, high availability, and cluster sharding right out of the box.

Amazon ElastiCache for Memcached is a Memcached-compatible in-memory key-value store service that can be used as a cache or a data store. Amazon ElastiCache for Memcached is a great choice for implementing an in-memory cache to decrease access latency, increase throughput, and ease the load off your relational or NoSQL database. Session stores are easy to create with Amazon ElastiCache for Memcached.

Both Amazon ElastiCache for Redis and Amazon ElastiCache for Memcached are HIPAA Eligible. Therefore, this is the correct option.

Exam Alert:

Please review this comparison sheet for Redis vs Memcached features:

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt5-q16-i2.jpg)

 via - <https://aws.amazon.com/elasticache/redis-vs-memcached/>

Incorrect Options:

**Amazon DynamoDB Accelerator (DAX)** - Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale. It's a fully managed, multi-region, multi-master, durable database with built-in security, backup and restore, and in-memory caching for internet-scale applications. DAX is a DynamoDB-compatible caching service that enables you to benefit from fast in-memory performance for demanding applications. DAX does not support SQL query caching.

**Amazon DynamoDB** - Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale. It's a fully managed, multi-region, multi-master, durable database with built-in security, backup and restore, and in-memory caching (via DAX) for internet-scale applications. Amazon DynamoDB is not an in-memory database, so this option is incorrect.

**Amazon DocumentDB** - Amazon DocumentDB is a fast, scalable, highly available, and fully managed document database service that supports MongoDB workloads. As a document database, Amazon DocumentDB makes it easy to store, query, and index JSON data. Amazon DocumentDB is not an in-memory database, so this option is incorrect.

References:

<https://aws.amazon.com/about-aws/whats-new/2017/11/amazon-elasticache-for-redis-is-now-hipaa-eligible-to-help-you-power-secure-healthcare-applications-with-sub-millisecond-latency/>

<https://aws.amazon.com/elasticache/redis/>

<https://aws.amazon.com/about-aws/whats-new/2022/08/amazon-elasticache-memcached-hipaa-eligible/>

<https://aws.amazon.com/blogs/database/automating-sql-caching-for-amazon-elasticache-and-amazon-rds/>

</details>

---

## 📝 Q15: A retail company uses AWS Cloud to manage its IT infrastruct...

A retail company uses AWS Cloud to manage its IT infrastructure. The company has set up AWS Organizations to manage several departments running their AWS accounts and using resources such as Amazon EC2 instances and Amazon RDS databases. The company wants to provide shared and centrally-managed VPCs to all departments using applications that need a high degree of interconnectivity.

### Options
- [ ] **A)** As a solutions architect, which of the following options would you choose to facilitate this use-case?
- [ ] **B)** Use VPC sharing to share one or more subnets with other AWS accounts belonging to the same parent organization from AWS Organizations

Use VPC peering to share a VPC with other AWS accounts belonging to the same parent organization from AWS Organizations

Use VPC sharing to share a VPC with other AWS accounts belonging to the same parent organization from AWS Organizations

Use VPC peering to share one or more subnets with other AWS accounts belonging to the same parent organization from AWS Organizations

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Use VPC sharing to share one or more subnets with other AWS accounts belonging to the same parent organization from AWS Organizations

Use VPC peering to share a VPC with other AWS accounts belonging to the same parent organization from AWS Organizations

Use VPC sharing to share a VPC with other AWS accounts belonging to the same parent organization from AWS Organizations

Use VPC peering to share one or more subnets with other AWS accounts belonging to the same parent organization from AWS Organizations**

### Detailed Explanation
Correct option:

**Use VPC sharing to share one or more subnets with other AWS accounts belonging to the same parent organization from AWS Organizations**

VPC sharing (part of Resource Access Manager) allows multiple AWS accounts to create their application resources such as Amazon EC2 instances, Amazon RDS databases, Amazon Redshift clusters, and AWS Lambda functions, into shared and centrally-managed Amazon Virtual Private Clouds (VPCs). To set this up, the account that owns the VPC (owner) shares one or more subnets with other accounts (participants) that belong to the same organization from AWS Organizations. After a subnet is shared, the participants can view, create, modify, and delete their application resources in the subnets shared with them. Participants cannot view, modify, or delete resources that belong to other participants or the VPC owner.

You can share Amazon VPCs to leverage the implicit routing within a VPC for applications that require a high degree of interconnectivity and are within the same trust boundaries. This reduces the number of VPCs that you create and manage while using separate accounts for billing and access control.

Incorrect options:

**Use VPC sharing to share a VPC with other AWS accounts belonging to the same parent organization from AWS Organizations** - Using VPC sharing, an account that owns the VPC (owner) shares one or more subnets with other accounts (participants) that belong to the same organization from AWS Organizations. The owner account cannot share the VPC itself. Therefore this option is incorrect.

**Use VPC peering to share a VPC with other AWS accounts belonging to the same parent organization from AWS Organizations** - A VPC peering connection is a networking connection between two VPCs that enables you to route traffic between them using private IPv4 addresses or IPv6 addresses. Instances in either VPC can communicate with each other as if they are within the same network. VPC peering does not facilitate centrally managed VPCs. Therefore this option is incorrect.

**Use VPC peering to share one or more subnets with other AWS accounts belonging to the same parent organization from AWS Organizations** - A VPC peering connection is a networking connection between two VPCs that enables you to route traffic between them using private IPv4 addresses or IPv6 addresses. Instances in either VPC can communicate with each other as if they are within the same network. VPC peering does not facilitate centrally managed VPCs. Moreover, an AWS owner account cannot share the VPC itself with another AWS account. Therefore this option is incorrect.

References:

<https://docs.aws.amazon.com/vpc/latest/userguide/vpc-sharing.html>

<https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html>

</details>

---

## 📝 Q16: A social photo-sharing web application is hosted on Amazon E...

A social photo-sharing web application is hosted on Amazon Elastic Compute Cloud (Amazon EC2) instances behind an Elastic Load Balancer. The app gives the users the ability to upload their photos and also shows a leaderboard on the homepage of the app. The uploaded photos are stored in Amazon Simple Storage Service (Amazon S3) and the leaderboard data is maintained in Amazon DynamoDB. The Amazon EC2 instances need to access both Amazon S3 and Amazon DynamoDB for these features.

### Options
- [ ] **A)** As a solutions architect, which of the following solutions would you recommend as the MOST secure option?
- [ ] **B)** Attach the appropriate IAM role to the Amazon EC2 instance profile so that the instance can access Amazon S3 and Amazon DynamoDB

Save the AWS credentials (access key Id and secret access token) in a configuration file within the application code on the Amazon EC2 instances. Amazon EC2 instances can use these credentials to access Amazon S3 and Amazon DynamoDB

Encrypt the AWS credentials via a custom encryption library and save it in a secret directory on the Amazon EC2 instances. The application code can then safely decrypt the AWS credentials to make the API calls to Amazon S3 and Amazon DynamoDB

Configure AWS CLI on the Amazon EC2 instances using a valid IAM user's credentials. The application code can then invoke shell scripts to access Amazon S3 and Amazon DynamoDB via AWS CLI

---

## 🔑 Answer & Explanation

<details>
<summary><b>Reveal Correct Answer</b></summary>

### Correct Answer: **Attach the appropriate IAM role to the Amazon EC2 instance profile so that the instance can access Amazon S3 and Amazon DynamoDB

Save the AWS credentials (access key Id and secret access token) in a configuration file within the application code on the Amazon EC2 instances. Amazon EC2 instances can use these credentials to access Amazon S3 and Amazon DynamoDB

Encrypt the AWS credentials via a custom encryption library and save it in a secret directory on the Amazon EC2 instances. The application code can then safely decrypt the AWS credentials to make the API calls to Amazon S3 and Amazon DynamoDB

Configure AWS CLI on the Amazon EC2 instances using a valid IAM user's credentials. The application code can then invoke shell scripts to access Amazon S3 and Amazon DynamoDB via AWS CLI**

### Detailed Explanation
Correct option:

**Attach the appropriate IAM role to the Amazon EC2 instance profile so that the instance can access Amazon S3 and Amazon DynamoDB**

Applications that run on an Amazon EC2 instance must include AWS credentials in their AWS API requests. You could have your developers store AWS credentials directly within the Amazon EC2 instance and allow applications in that instance to use those credentials. But developers would then have to manage the credentials and ensure that they securely pass the credentials to each instance and update each Amazon EC2 instance when it's time to rotate the credentials.

Instead, you should use an IAM role to manage temporary credentials for applications that run on an Amazon EC2 instance. When you use a role, you don't have to distribute long-term credentials (such as a username and password or access keys) to an Amazon EC2 instance. The role supplies temporary permissions that applications can use when they make calls to other AWS resources. When you launch an Amazon EC2 instance, you specify an IAM role to associate with the instance. Applications that run on the instance can then use the role-supplied temporary credentials to sign API requests. Therefore, this option is correct.

![img](https://assets-pt.media.datacumulus.com/aws-saa-pt/assets/pt2-q3-i1.jpg)

 via - <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html>

Incorrect options:

**Save the AWS credentials (access key Id and secret access token) in a configuration file within the application code on the Amazon EC2 instances. Amazon EC2 instances can use these credentials to access Amazon S3 and Amazon DynamoDB**

**Configure AWS CLI on the Amazon EC2 instances using a valid IAM user's credentials. The application code can then invoke shell scripts to access Amazon S3 and Amazon DynamoDB via AWS CLI**

**Encrypt the AWS credentials via a custom encryption library and save it in a secret directory on the Amazon EC2 instances. The application code can then safely decrypt the AWS credentials to make the API calls to Amazon S3 and Amazon DynamoDB**

Keeping the AWS credentials (encrypted or plain text) on the Amazon EC2 instance is a bad security practice, therefore these three options using the AWS credentials are incorrect.

Reference:

<https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html>

</details>

---

---

## 🔗 Graph-Linked Knowledge Base
