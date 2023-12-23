### Current Deployment
- Containerize the repo (may need to add specific build -> arm/64) and push to ECR with GitHub actions on "main" merges ✅
- Added Jest unit tests on each PR with "main" ✅
- Figure out how we want to deploy the application (ECS w Fargate, ECS w EC2, EC2 (+ Beanstalk ??)) + add enviroment variables + (blue/green enviroments?) ❌
- Figure out AWS CodePipeline to trigger redeployed of our server after a new ECR container is pushed  ❌
