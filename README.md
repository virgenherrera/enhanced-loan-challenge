# Enhanced Loan Challenge

This project is designed to demonstrate a sophisticated loan processing system. It leverages Node.js, Docker, and PostgreSQL to create a scalable and isolated environment for development and production purposes.

##  Project Overview

The "Enhanced Loan Challenge" project is a comprehensive solution designed to address the requirements set forth in the challenge outlined in the document: "Backend: Enhanced Loan Application Processing Service." This repository serves as the direct response to the challenge, showcasing the implementation of the proposed system.

## Challenge Background

The challenge was to create a robust backend system capable of handling loan application processes efficiently, including user management and loan application status tracking. The detailed specifications and requirements of the challenge can be found in the <a href="Backend_Enhanced_Loan_Application_Processing_Service.pdf" target="_blank">following document</a>.

This project aims to demonstrate best practices in API development, containerized application deployment, and efficient database management, adhering closely to the criteria specified in the challenge document.

## Project Dependencies

Before starting, ensure the following mandatory dependencies are installed on your system:

- **Node.js v20**: The runtime environment required to run the development and production setups of the application. It's crucial to use version 20 to maintain compatibility.
- **pnpm**: A fast and space-efficient package manager for JavaScript, pnpm enhances installation speeds and significantly reduces the footprint of node_modules. It is a critical tool for managing the project's dependencies efficiently.
- **Docker**: For containerizing the application and its database, ensuring an isolated environment that simplifies deployment and scaling.
- **Docker Compose**: Facilitates the definition and orchestration of multi-container Docker applications, streamlining the management of services, networks, and volumes.
pnpm: A fast and space-efficient package manager for JavaScript, enhancing installation speeds and reducing the footprint of node_modules.

These dependencies are essential for the setup, development, and operation of the Enhanced Loan Challenge project. Ensure each is correctly installed and configured on your system before proceeding with the project setup or development.

## Launching the Project

To get the Enhanced Loan Challenge up and running, follow these steps:

- Clone the Repository: Obtain a local copy of the project by cloning its repository.

```bash
git clone https://github.com/virgenherrera/enhanced-loan-challenge.git
cd enhanced-loan-challenge
```

- Configure Environment Variables: Set up the necessary environment variables for both the application and database to ensure secure and correct operation. Refer to the project's configuration documentation for detailed guidance.

- Build and Run Using pnpm Scripts: The project includes convenient scripts in package.json for building and launching with Docker Compose. Use pnpm to execute these scripts without directly interacting with Docker Compose.

To build the Docker images for the application and its services, run:

```bash
pnpm docker:build
```

To start the application along with its services, run:

```bash
pnpm docker:up
```

These commands utilize Docker Compose under the hood to prepare and launch the necessary containers. The --build option in Docker Compose ensures that your images are always up to date.

Accessing the Application: Once the containers are operational, the application can be accessed through a web browser or an API client at <http://localhost:3000>. This assumes that the application's app service is configured to expose port 3000 to your local machine.

##  Enhanced Loan Challenge API Endpoints

The Enhanced Loan Challenge provides a RESTful API for managing loan applications and user accounts. Below is the documentation for available endpoints:

###  Loan Application Management

- **Submit a New Loan Application**
  - **POST /api/applications**
  - **Description**: Allows clients to submit a new loan application. The body of the request should include necessary information such as loan amount, term, and applicant details.
Retrieve the Status of a Specific Application
  - **GET /api/applications/{id}**
  - **Description**: Fetches the status of a loan application by its unique identifier. This endpoint is useful for applicants to track the processing status of their applications.
List All Loan Applications
  - **GET /api/applications**
  - **Description**: Retrieves a list of all loan applications. This endpoint supports filtering by status, applicant name, or other criteria, providing a powerful tool for administrative purposes and oversight.
- **User Management Endpoints**
Register a New User Account
  - **POST /api/auth/register**
  - **Description**: Enables new users to create an account. The request body should include user information such as email, password, and any other required fields for registration.
Login to Receive a JWT Token
  - **POST /api/auth/login**
  - **Description**: Authenticates a user and returns a JWT token. The token can be used to authenticate subsequent requests that require user identification.

##   Swagger Documentation

For a more detailed overview of the API, including parameters, request bodies, and response schemas, visit the Swagger UI documentation:

- **URL**: /api
- **Description**: Access the Swagger UI through your web browser to interactively explore and test the API endpoints. The Swagger documentation provides a comprehensive and interactive way to understand the API's capabilities, making it easier to integrate with the Enhanced Loan Challenge.

##  Additional Information

- **Configuration**: Provides details on configuring environment variables and other settings to customize the application and database environments according to your needs.
- **Development**: Offers insights into setting up a development environment, installing dependencies via pnpm, and guidelines for contributing to the Enhanced Loan Challenge.
- **Deployment**: Outlines steps for deploying the application in a production environment, emphasizing security measures and best practices for database management.
