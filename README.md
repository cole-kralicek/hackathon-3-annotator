# Sales Transcript Annotation and Summarization Tool
## Overview

This project is designed to enhance sales coaching and decision-making by enabling sales managers to add, edit, and delete comments on specific parts of a sales transcript. Additionally, the project incorporates a feature to attach files to each comment and generate a concise summary of the entire transcript using Large Language Models (LLMs). This project is inspired by tools like Otter.ai but is tailored to support actionable, data-driven feedback in sales environments.
## Features

Comment Management: Add, edit, and delete comments on specific sections of a sales transcript.
File Attachments: Attach relevant files (e.g., images, documents) to comments.
Transcript Summarization: Generate concise summaries of sales transcripts and associated comments using LLMs.
User Authentication: Secure access to features using Clerk authentication services.

## Tech Stack

Frontend: React with TypeScript
Backend: Node.js with AWS Lambda
Database: DynamoDB for storing comments and metadata, S3 for file storage
Machine Learning: AWS SageMaker or GPT API for LLM integration
Authentication: Clerk for user authentication and access control

## Architecture

![Architecture Diagram](./public/Rilla%20Voice%20Annotator%20Diagram.png "Rilla Voice Architecture Diagram")
## Architecture Components

Frontend: A React application that allows users to interact with sales transcripts, manage comments, and view summaries.
Backend: AWS Lambda functions that handle CRUD operations for comments, manage file attachments, and interact with LLMs to generate summaries.
Database: DynamoDB is used for storing comment data, while S3 stores attached files.
LLM Integration: AWS SageMaker or GPT API is used to generate summaries of transcripts and comments.
Authentication: Clerk is used to authenticate users and manage their sessions and roles.

# Getting Started
## Prerequisites

Node.js (v14 or later)
AWS Account with S3, DynamoDB, and Lambda configured
Clerk account for authentication
Firebase project setup (if required for additional features)

## Installation

Clone the Repository

    git clone https://github.com/your-username/sales-transcript-tool.git
    cd sales-transcript-tool

## Install Dependencies

    npm install

## Set Up Environment Variables

Create a .env file in the root directory and add the following environment variables:

    REACT_APP_CLERK_FRONTEND_API=<Your Clerk Frontend API Key>
    AWS_ACCESS_KEY_ID=<Your AWS Access Key ID>
    AWS_SECRET_ACCESS_KEY=<Your AWS Secret Access Key>
    AWS_REGION=<Your AWS Region>
    DYNAMODB_TABLE=<Your DynamoDB Table Name>
    S3_BUCKET_NAME=<Your S3 Bucket Name>

## Deploy AWS Resources

Use the AWS CLI or an Infrastructure as Code (IaC) tool like Terraform to set up your S3 bucket, DynamoDB table, and Lambda functions.

## Run the Development Server

    npm start

    The app should now be running on http://localhost:3000.

## Usage

### Authentication
Sign up or log in using Clerk's authentication UI.
Access the sales transcript viewer.

### Comment Management
Click on a specific section of the transcript to add a comment.
Attach files to comments if needed.
Edit or delete existing comments.

### Generate Summary
Click on the "Generate Summary" button to create a concise overview of the transcript and its comments using the integrated LLM.

## Deployment

### Frontend Deployment
Build the React app for production:

    npm run build

Deploy the built files to your preferred hosting service (e.g., AWS S3, Firebase Hosting).

### Backend Deployment
Deploy the AWS Lambda functions using the AWS CLI or an automated deployment tool.

### Environment Configuration
Ensure all environment variables are correctly set in your production environment.

## Contributing

Fork the repository
Create a new branch (git checkout -b feature-branch)
Commit your changes (git commit -m 'Add new feature')
Push to the branch (git push origin feature-branch)
Open a Pull Request

## License

This project is licensed under the MIT License.
