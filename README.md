# MERN Travel Booking Web Application

A full-stack travel booking web application built with the **MERN** stack, featuring **role-based access**, **JWT authentication**, and a **dynamic React.js frontend**. This application allows users to search, book, and cancel flight and hotel bookings, while admins can manage listings and view all user bookings.

## Features

### User Role:
- **Flight and Hotel Search**: Users can search for available flights and hotels based on destination, dates, and preferences.
- **Booking and Cancellation**: Users can book flights and hotels, as well as cancel their reservations.
- **Authentication**: Secure login and registration via **JWT** authentication (email/password).

### Admin Role:
- **Admin Panel**: Admins can add, edit, and delete flight and hotel listings.
- **Booking Management**: Admins can view all user bookings and their statuses.

## Technologies Used

- **Frontend**:
  - React.js (Vite for build tool)
  - Redux for state management
  - React Router for navigation
  - Axios for API requests
  - Bootstrap or Material UI for styling (if used)
  
- **Backend**:
  - Node.js with Express.js
  - RESTful API for user and admin functionalities
  - JWT Authentication for secure user login/registration
  - MongoDB for data storage

- **Authentication**:
  - JWT (JSON Web Token) for secure, stateless authentication
  - Bcrypt.js for hashing passwords

## Installation

### Prerequisites
- Node.js
- MongoDB instance (either local or cloud-based like MongoDB Atlas)
- A code editor (like VS Code)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/DesuRaghavendra/Travel-Booking-Web-Application-MERN.git
