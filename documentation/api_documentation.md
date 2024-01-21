# PeakVu Roofing API Documentation

## Authentication

### POST /login
Authenticates a user and returns a JWT.

**Request Body:**
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "JWT_TOKEN"
}
```

### GET /dashboard
Fetches dashboard data for the authenticated user.

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "projects": [],
  "messages": []
}
```

## Projects

### POST /upload
Allows users to upload images and notes for a project.

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Form Data:**
```
{
  "images": "Array of files",
  "notes": "String"
}
```

**Response:**
```json
{
  "message": "UPLOAD_COMPLETE",
  "project": {}
}
```

### GET /projects/{id}
Retrieves images and notes for a specific project.

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "images": [],
  "notes": "String"
}
```

## Quotes

### GET /materials
Fetches current material prices.

**Response:**
```json
{
  "materials": []
}
```

### POST /quote
Generates a quote based on provided details.

**Request Body:**
```json
{
  "projectDetails": {}
}
```

**Response:**
```json
{
  "quote": {}
}
```

## GPT-4 Integration

### POST /generate-material-list
Sends project details to GPT-4 and receives the materials list.

**Request Body:**
```json
{
  "projectDescription": "String"
}
```

**Response:**
```json
{
  "materialsList": []
}
```

## Invoices and Proposals

### POST /create-proposal
Creates a new proposal.

**Request Body:**
```json
{
  "projectDetails": {},
  "quote": {}
}
```

**Response:**
```json
{
  "proposalId": "String"
}
```

### POST /create-invoice
Generates an invoice.

**Request Body:**
```json
{
  "projectDetails": {},
  "quote": {}
}
```

**Response:**
```json
{
  "invoiceId": "String"
}
```

## Payments

### POST /create-payment-intent
Initiates a payment process.

**Request Body:**
```json
{
  "amount": "Number",
  "currency": "String"
}
```

**Response:**
```json
{
  "clientSecret": "String"
}
```

### GET /payment-status/{id}
Checks the status of a payment.

**Response:**
```json
{
  "status": "String"
}
```

## Subscriptions

### POST /create-subscription
Creates a new subscription for financing.

**Request Body:**
```json
{
  "userId": "String",
  "planDetails": {}
}
```

**Response:**
```json
{
  "subscriptionId": "String"
}
```

### GET /subscriptions/{userId}
Gets subscription details for a user.

**Response:**
```json
{
  "subscriptions": []
}
```

## Feedback

### POST /feedback
Submits feedback from a customer.

**Request Body:**
```json
{
  "projectId": "String",
  "rating": "Number",
  "comment": "String"
}
```

**Response:**
```json
{
  "message": "FEEDBACK_RECEIVED"
}
```

## Analytics

### GET /analytics
Retrieves analytics data.

**Response:**
```json
{
  "mostUsedMaterials": [],
  "averageProjectCost": "Number"
}
```

This document provides the necessary details for interacting with the PeakVu Roofing API. All endpoints should be used with the appropriate HTTP methods and expected request and response formats.