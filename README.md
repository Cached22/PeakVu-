# PeakVu Installation and Running Guide

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- Node.js
- npm (Node Package Manager)
- Git
- MongoDB (for the backend database)

## Cloning the Repository

1. Open a terminal.
2. Clone the repository:
   ```
   git clone https://github.com/WesElliottEFD/PeakVu-.git
   ```
3. Navigate into the project directory:
   ```
   cd PeakVu-
   ```

## Setting Up the Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the `backend` directory. Populate it with necessary environment variables (like database URI, API keys, etc.). You will need to obtain these variables from the app settings or configuration.

4. Run the backend server:
   ```
   npm start
   ```
   - The backend server should start on `localhost:5000` (or another port, if configured).

## Setting Up the Frontend

1. Open a new terminal and navigate to the frontend directory from the project root:
   ```
   cd frontend
   ```
2. Install frontend dependencies:
   ```
   npm install
   ```
3. Start the frontend React app:
   ```
   npm start
   ```
   - This will open the app in your default browser, typically on `localhost:3000`.

## Using the Application

- With both the frontend and backend running, you should be able to use the full functionality of the PeakVu app on your local machine.
- Ensure the backend and frontend are running simultaneously for the application to work correctly.

## Troubleshooting

- If you encounter issues, check the terminal outputs for errors.
- Ensure MongoDB is running if the backend requires a database connection.
- Verify all environment variables are correctly set in the `.env` file for the backend.
```
