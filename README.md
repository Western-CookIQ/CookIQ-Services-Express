![Build & Push](https://github.com/Western-CookIQ/CookIQ-Services-Express/actions/workflows/main.yml/badge.svg)

![Test](https://github.com/Western-CookIQ/CookIQ-Services-Express/actions/workflows/test.yml/badge.svg)

# CookIQ-Services-Express

Welcome to the CookIQ-Services-Express repository! This is the backend codebase for the CookIQ application, a comprehensive platform for cooking enthusiasts and professional chefs. The application is built with Express.js, a fast and minimalist web framework for Node.js.

## Features

1. **User Authentication**: The application handles user authentication, including login, sign up, and password recovery.

2. **Recipe Management**: The application manages a database of recipes, allowing users to discover new recipes, save their favorite recipes, and manage their personal recipe collection.

3. **Recipe Recommendations**: The application provides personalized recipe recommendations based on user preferences. It includes both content-based and collaborative filtering recommendation systems.

4. **Social Features**: The application manages user connections and chat conversations.

5. **User Settings**: The application handles user account settings.

## GitHub Actions for Deployment

This repository uses GitHub Actions for Continuous Integration (CI) and Continuous Deployment (CD). The workflow is defined in the `main.yml` file in the `.github/workflows` directory.

Here's a brief overview of what each step in the workflow does:

1. **Set up Node.js**: This step sets up a specific version of Node.js on the runner. In this case, it's version 18.

2. **Install dependencies**: This step installs the project's dependencies by running `npm install`.

3. **Configure AWS credentials**: This step configures the AWS credentials that will be used for the subsequent steps. The credentials are stored as secrets in the GitHub repository and are accessed using `secrets.AWS_ACCESS_KEY_ID` and `secrets.AWS_SECRET_ACCESS_KEY`. The AWS region is set to `us-east-2`.

4. **Login to Amazon ECR**: This step logs into Amazon Elastic Container Registry (ECR) using the `aws-actions/amazon-ecr-login@v2` action. This is necessary to push Docker images to ECR.

5. **Build and push the tagged Docker image to Amazon ECR**: This step is currently commented out. When uncommented, it will build a Docker image from the Dockerfile in the repository, tag it, and push it to the ECR repository. The ECR registry URL is obtained from the output of the previous step.

This workflow is triggered on every push to the main branch, ensuring that the application is continuously tested and deployed.

## Getting Started

To set up the development environment:

1. Clone the repository:

   ```bash
   git clone https://github.com/Western-CookIQ/CookIQ-Services-Express.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CookIQ-Services-Express
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

This will start the development server and you can access the API endpoints at `http://localhost:3001`.

To run the tests, use the following command:

```bash
npm test
```

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details.
