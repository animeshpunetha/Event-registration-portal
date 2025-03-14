# Event Registration Portal

A web application for event registration with Google OAuth authentication and MongoDB for data storage.

## 🚀 Features
- Google OAuth-based authentication
- Secure user session management
- Registration form for event sign-ups
- MongoDB Atlas as the database
- Hosted on **Render**

## 🛠 Tech Stack
- **Frontend**: HTML, CSS, EJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: Passport.js (Google OAuth)

## ⚡ Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/animeshpunetha/Event-registration-portal.git
cd Event-registration-portal
```
### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a .env file in the project root and add:

```sh
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Run the Application
```sh
npm start
```
OR with Nodemon for development:

```sh
npm run dev
```
The server runs at: http://localhost:3000

