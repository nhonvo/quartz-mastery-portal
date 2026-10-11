# AWS Certified Cloud Practitioner (CLF-C02) Quiz Tool
$questions = @(
    @{
        Question = "Which compute option reduces costs when you commit to a consistent amount of compute usage for a 1-year or 3-year term?"
        Answer   = "Reserved Instances"
    },
    @{
        Question = "Which service enables you to consolidate and manage multiple AWS accounts from a central location?"
        Answer   = "AWS Organizations"
    },
    @{
        Question = "Which action can you perform in Amazon CloudFront?"
        Answer   = "Deliver content to customers through a global network of edge locations."
    },
    @{
        Question = "Which pillar of the AWS Well-Architected Framework focuses on using computing resources in ways that meet system requirements?"
        Answer   = "Performance Efficiency"
    },
    @{
        Question = "Which statement best describes Elastic Load Balancing?"
        Answer   = "A service that distributes incoming traffic across multiple targets, such as Amazon EC2 instances."
    },
    @{
        Question = "Which statement is TRUE for AWS Lambda?"
        Answer   = "You pay only for compute time while your code is running."
    },
    @{
        Question = "You are running an Amazon EC2 instance and want to store data in an attached resource. Your data is temporary and will not be kept long term. Which resource should you use?"
        Answer   = "Instance store"
    },
    @{
        Question = "Which tool enables you to visualize, understand, and manage your AWS costs and usage over time?"
        Answer   = "AWS Cost Explorer"
    },
    @{
        Question = "Which tool is used to automate actions for AWS services and applications through scripts?"
        Answer   = "AWS Command Line Interface"
    },
    @{
        Question = "Which AWS Trusted Advisor category includes checks for high-utilization EC2 instances?"
        Answer   = "Cost Optimization"
    },
    @{
        Question = "Which virtual private cloud (VPC) component controls inbound and outbound traffic for Amazon EC2 instances?"
        Answer   = "Security group"
    },
    @{
        Question = "Which statement best describes AWS Marketplace?"
        Answer   = "A digital catalog that includes thousands of software listings from independent software vendors"
    },
    @{
        Question = "Which service enables you to review details for user activities and API calls that have occurred within your AWS environment?"
        Answer   = "AWS CloudTrail"
    },
    @{
        Question = "You want Amazon S3 to monitor your objects’ access patterns. Which storage class should you use?"
        Answer   = "Amazon S3 Intelligent-Tiering"
    },
    @{
        Question = "In the S3 Intelligent-Tiering storage class, Amazon S3 moves objects between a frequent access tier and an infrequent access tier. Which storage classes are used for these tiers? (Select TWO.)"
        Answer   = "Amazon S3 Standard-IA, Amazon S3 One Zone-IA"
    },
    @{
        Question = "Which service enables you to build the workflows that are required for human review of machine learning predictions?"
        Answer   = "Amazon Augmented AI"
    },
    @{
        Question = "Which Perspective of the AWS Cloud Adoption Framework focuses on recovering IT workloads to meet the requirements of your business stakeholders?"
        Answer   = "Operations Perspective"
    },
    @{
        Question = "Which Support plans include access to all AWS Trusted Advisor checks? (Select TWO.)"
        Answer   = "Enterprise, Business"
    },
    @{
        Question = "Which service is used to transfer up to 100 PB of data to AWS?"
        Answer   = "AWS Snowmobile"
    },
    @{
        Question = "Which actions can you perform in Amazon Route 53? (Select TWO.)"
        Answer   = "Manage DNS records for domain names, Connect user requests to infrastructure in AWS and outside of AWS."
    },
    @{
        Question = "You want to store data in a key-value database. Which service should you use?"
        Answer   = "Amazon DynamoDB"
    },
    @{
        Question = "Which service is used to quickly deploy and scale applications on AWS?"
        Answer   = "AWS Elastic Beanstalk"
    },
    @{
        Question = "Which statement best describes Amazon GuardDuty?"
        Answer   = "A service that provides intelligent threat detection for your AWS infrastructure and resources"
    },
    @{
        Question = "Which component or service enables you to establish a dedicated private connection between your data center and virtual private cloud (VPC)?"
        Answer   = "AWS Direct Connect"
    },
    @{
        Question = "You want to send and receive messages between distributed application components. Which service should you use?"
        Answer   = "Amazon Simple Queue Service (Amazon SQS)"
    },
    @{
        Question = "Which migration strategy involves changing how an application is architected and developed, typically by using cloud-native features?"
        Answer   = "Refactoring"
    },
    @{
        Question = "Which tasks are the responsibilities of AWS? (Select TWO.)"
        Answer   = "Maintaining virtualization infrastructure, Configuring AWS infrastructure devices"
    },
    @{
        Question = "Which service is used to run containerized applications on AWS?"
        Answer   = "Amazon Elastic Kubernetes Service (Amazon EKS)"
    },
    @{
        Question = "You want to store data in a volume that is attached to an Amazon EC2 instance. Which service should you use?"
        Answer   = "Amazon Elastic Block Store (Amazon EBS)"
    },
    @{
        Question = "Which statement best describes an Availability Zone?"
        Answer   = "A fully isolated portion of the AWS global infrastructure"
    },
)

Clear-Host
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host " ☁️ AWS Certified Cloud Practitioner Quiz (CLF-C02)" -ForegroundColor Green
Write-Host " Questions: $($questions.Count)" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

$score = 0
$total = $questions.Count

for ($i = 0; $i -lt $total; $i++) {
    $q = $questions[$i]
    Write-Host "[Q$($i+1)/$total] $($q.Question)" -ForegroundColor Yellow
    
    $user_ans = Read-Host "Your Answer"
    
    Write-Host "Correct Answer: $($q.Answer)" -ForegroundColor Green
    Write-Host "Did you get it right? (Y/N)" -NoNewline
    $key = Read-Host
    if ($key.ToUpper().Trim() -eq "Y") {
        $score++
    }
    Write-Host "-" * 60 -ForegroundColor DarkCyan
}

$percent = [math]::Round(($score / $total) * 100)
Write-Host "`nQuiz Finished!" -ForegroundColor Cyan
Write-Host "Result: $score/$total ($percent%)" -ForegroundColor $(if ($percent -ge 80) { "Green" } else { "Yellow" })
