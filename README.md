# 🎓 Alumni Connect

A full-stack Alumni Networking Platform that bridges the gap between students, alumni, and administrators through networking, event management, real-time communication, and career opportunities.

## 🚀 Overview

Alumni Connect is designed to strengthen relationships between current students and alumni by providing a centralized platform for communication, mentorship, event participation, and community engagement.

The platform supports three different user roles:

* **Students**
* **Alumni**
* **Administrators**

Each role has dedicated features and dashboards tailored to its responsibilities.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* Secure JWT-based authentication
* Role-based access control
* Student, Alumni, and Admin login systems
* Password reset using Email OTP verification

### 👥 Alumni Management

* Alumni registration and profile creation
* Admin approval workflow
* Search and browse alumni directory
* Detailed alumni profiles

### 📅 Event Management

* Create and publish events
* Admin event approval/rejection
* Event registration system
* Track attendee count
* Categorized events
* Meeting link support

### 💬 Real-Time Messaging

* Direct messaging between users
* Conversation management
* WebSocket-based communication
* Inbox functionality

### 🔔 Notifications

* Event updates
* Registration notifications
* Approval notifications
* User activity alerts

### 👨‍💼 Admin Dashboard

* User management
* Alumni approval system
* Event moderation
* Platform monitoring

### 🎓 Student Dashboard

* Browse alumni
* Register for events
* Connect with mentors
* View notifications

### 🌟 Alumni Dashboard

* Manage profile
* Post events
* Engage with students
* Participate in networking activities

---

## 🏗️ System Architecture

Frontend (Angular)
⬇
REST APIs
⬇
Backend (Spring Boot)
⬇
MySQL Database

Additional Services:

* JWT Authentication
* WebSocket Messaging
* Email OTP Service
* Notification System

---

## 🛠️ Tech Stack

### Frontend

* Angular
* TypeScript
* HTML5
* SCSS
* RxJS

### Backend

* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* WebSocket
* Java 21

### Database

* MySQL

### Tools & Platforms

* Maven
* Git
* GitHub
* Postman
* VS Code
* IntelliJ IDEA

---

## 📂 Project Structure

```text
ALUMNICONNECT
│
├── alumni-connect-ui
│   ├── Angular Frontend
│   ├── Components
│   ├── Services
│   └── Authentication
│
└── alumni-connect
    ├── Spring Boot Backend
    ├── Controllers
    ├── Services
    ├── Repositories
    ├── Security
    └── WebSocket Configuration
```

## 🔑 Core Modules

### Authentication Module

* Login
* Signup
* JWT Token Generation
* Role Verification
* OTP Password Recovery

### Alumni Module

* Alumni Registration
* Approval Workflow
* Profile Management

### Event Module

* Event Creation
* Event Approval
* Event Registration
* Event Tracking

### Messaging Module

* Real-Time Chat
* Inbox
* Conversations

### Notification Module

* Event Notifications
* Approval Notifications
* System Alerts

---

## 📸 Screenshots

Add screenshots of:

* Login Page
* Student Dashboard
* Alumni Dashboard
* Admin Dashboard
* Events Page
* Chat System
* Notifications

---

## 🚀 Getting Started

### Backend Setup

```bash
cd alumni-connect
./mvnw spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

### Frontend Setup

```bash
cd alumni-connect-ui
npm install
ng serve
```

Frontend runs on:

```text
http://localhost:4200
```

---

## 🔮 Future Enhancements

* AI-powered alumni recommendations
* Resume review system
* Internship portal
* Job referral marketplace
* Alumni mentorship matching
* Video calling integration
* Mobile application
* Analytics dashboard

---

## 👨‍💻 Contributors

* P. Gopi Krishna
* Team Members

---

## 📄 License

This project is developed for educational and academic purposes.

---

### ⭐ If you found this project useful, consider giving it a star on GitHub!
