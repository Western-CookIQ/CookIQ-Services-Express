![Build & Push](https://github.com/Western-CookIQ/CookIQ-Services-Express/actions/workflows/main.yml/badge.svg)

![Test](https://github.com/Western-CookIQ/CookIQ-Services-Express/actions/workflows/test.yml/badge.svg)

### Current Deployment

- Containerize the repo (may need to add specific build -> arm/64) and push to ECR with GitHub actions on "main" merges ✅
- Added Jest unit tests on each PR with "main" ✅
- Deployed to ec2 instance ✅
- Figure out AWS CodePipeline to trigger redeployed of our server after a new ECR container is pushed ❌

### Deployment Notes

protected pem key with chmod 400
then ssh'd into the ec2 instance with a user name called "ec2-user" then the public DNS of the server
then ran updates to install packages + aws cli
configured aws cli then logged into the instance (see readme in recommendation engine)

then ran: docker pull 853077549349.dkr.ecr.us-east-2.amazonaws.com/cookiq:latest-express

now to run the image
docker run -d -p 3000:8080 853077549349.dkr.ecr.us-east-2.amazonaws.com/cookiq:latest-express

\*\* had to update the security setting to allow ipv4 traffic into port 3000 instead of ipv6 traffic

\*\* had to add an elastic IP to allow the ec2 instance to have a constant public dns even if it is stopped
