Overview

This full-stack application which demonstrates user authentication using a React frontend and a Spring Boot backend. It allows users to register, log in, and access a protected route once authenticated. The project showcases the integration of modern web technologies and secure authentication practices.

Features

- User Registration
- User Login
- Responsive Design

Technologies Used

Frontend

- React 17+
- React Router 6 for client-side routing
- Axios for HTTP requests
- Tailwind CSS for styling

Backend

- Spring Boot 3.3+
- Spring Security for authentication
- MySQL Database for data persistence
- JPA / Hibernate for ORM

Prerequisites

Before you begin, ensure you have the following installed on your system:

1. Node.js and npm
2. Java Development Kit (JDK) 11 or later
3. Maven 3.6+
4. MySQL 5.7+ or MySQL 8.0+
5. Git

Setup and Installation

Follow these steps to get the application running on your local machine:

Backend Setup

1. Clone repository and navigate to backend directory
   cd registration-backend

2. Configure MySQL database:

   - Create a new MySQL database named `user_registration`
   - Update `src/main/resources/application.properties` with your MySQL credentials:

     spring.datasource.url=jdbc:mysql://localhost:3306/user_registration
     spring.datasource.username=your_username
     spring.datasource.password=your_password

3. Build and run the Spring Boot application:
   mvn clean install
   mvn spring-boot:run

   The backend will start on `http://localhost:8080`

Frontend Setup

1. Navigate to the frontend directory:
   cd registration-frontend

2. Install dependencies:
   npm install

3. Start the React development server:
   npm start

   The frontend will start on `http://localhost:3000`

Running the Application

1. Ensure the backend is running on `http://localhost:8080`
2. Ensure the frontend is running on `http://localhost:3000`
3. Open your browser and navigate to `http://localhost:3000`
4. You should see the login page. You can register a new user or log in if you've already created an account.

API Endpoints

- POST `/api/users/register`: Register a new user
- POST `/api/users/login`: Authenticate a user

Troubleshooting

- For database connection issues, double-check your MySQL credentials and ensure the MySQL service is running.

Testing

1. Frontend

- There are two tests in frontend for login component and registration component.
- Go to frontend directory and run the following command.
  npm test

2. Backend

- There are two tests in backend for login and registration.
- Go to backend directory and run the following command.
  mvn test
