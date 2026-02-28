# 🦈 Fitness Sharks - Gym Management System

A modern, full-stack gym management application built with React and Spring Boot. Fitness Sharks provides a complete solution for managing gym operations, memberships, trainers, training plans, and user subscriptions with role-based access control.

![Java](https://img.shields.io/badge/Java-23-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [User Roles](#-user-roles)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### For Members
- 🔐 **User Authentication** - Secure registration and login with session management
- 💳 **Membership Subscriptions** - Browse and subscribe to various membership plans
- 🏋️ **Training Plans** - Access personalized workout plans with difficulty levels
- 👨‍🏫 **Trainer Profiles** - View qualified trainers and their specializations
- 📱 **Responsive Design** - Seamless experience across all devices
- 🎯 **User Dashboard** - Track subscriptions and personal information

### For Administrators
- 👥 **User Management** - View and manage all registered users
- 💼 **Trainer Management** - Add, edit, and remove trainer profiles with photos
- 📋 **Membership Plans** - Create and manage different membership tiers
- 🏋️ **Training Plans** - Design and publish workout programs
- 📊 **Admin Dashboard** - Comprehensive overview of gym operations
- 🔒 **Role-Based Access** - Secure admin-only features

### Technical Features
- ✅ **RESTful API** - Clean, well-documented backend endpoints
- 🔄 **Real-time Updates** - Dynamic content loading from database
- 🛡️ **Spring Security** - Robust authentication and authorization
- 🗄️ **JPA/Hibernate** - Efficient database operations
- 🌐 **CORS Configured** - Seamless frontend-backend communication
- 📦 **Session Management** - Stateful authentication with cookies

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 3.5.6
- **Language:** Java 23
- **Security:** Spring Security
- **Database:** MySQL 8.0+
- **ORM:** Spring Data JPA / Hibernate
- **Build Tool:** Maven
- **Validation:** Spring Validation

### Frontend
- **Framework:** React 18.2.0
- **Routing:** React Router DOM 6.30.1
- **HTTP Client:** Axios 1.13.1
- **Styling:** Tailwind CSS 3.4.18
- **Icons:** Lucide React 0.545.0
- **State Management:** React Context API
- **Build Tool:** Create React App

### Development Tools
- **Proxy:** http-proxy-middleware (for development)
- **Testing:** Jest, React Testing Library
- **Code Quality:** ESLint, Prettier

---

## 📁 Project Structure

```
fitness-sharks/
├── backend/                      # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/
│   │   │   │   ├── controller/   # REST Controllers
│   │   │   │   ├── model/        # Entity Models
│   │   │   │   ├── repository/   # JPA Repositories
│   │   │   │   ├── service/      # Business Logic
│   │   │   │   └── config/       # Security & CORS Config
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml                   # Maven Dependencies
│   └── mvnw / mvnw.cmd          # Maven Wrapper
│
├── Frontend/                     # React Frontend
│   ├── public/                   # Static Assets
│   ├── src/
│   │   ├── components/           # Reusable Components
│   │   ├── pages/                # Page Components
│   │   ├── services/             # API Services
│   │   ├── contexts/             # React Contexts
│   │   ├── config/               # Configuration
│   │   ├── App.js                # Main App Component
│   │   └── setupProxy.js         # Dev Proxy Config
│   ├── package.json              # NPM Dependencies
│   └── tailwind.config.js        # Tailwind Config
│
└── Documentation/
    ├── README.md                 # This file

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK) 17 or higher**
  - Download: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
  - Verify: `java -version`

- **Node.js 16 or higher** (includes npm)
  - Download: [Node.js Official Website](https://nodejs.org/)
  - Verify: `node -v` and `npm -v`

- **MySQL 8.0 or higher**
  - Download: [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
  - Verify: `mysql --version`

- **Maven** (optional - project includes Maven Wrapper)
  - Download: [Apache Maven](https://maven.apache.org/download.cgi)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <https://github.com/ManujaJayasinghe/FitnessSharks>
cd fitness-sharks
```

### 2. Database Setup

```sql
-- Create the database
CREATE DATABASE fitness_sharks;

-- Create a user (optional)
CREATE USER 'gymuser'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON fitness_sharks.* TO 'gymuser'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies (Maven will download them automatically)
# On Windows:
mvnw.cmd clean install

# On Mac/Linux:
./mvnw clean install
```

### 4. Frontend Setup

```bash
cd Frontend

# Install dependencies
npm install
```

---

## ⚙️ Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
spring.application.name=DEAproject

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/fitness_sharks?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Server Configuration
server.port=8080
```

### Frontend Configuration

The frontend uses a development proxy configured in `Frontend/src/setupProxy.js`. No additional configuration needed for development.

For production, update `Frontend/src/config/api.config.js`:



---

## 🏃 Running the Application

### Start the Backend

```bash
cd backend

# Windows
mvnw.cmd spring-boot:run

# Mac/Linux
./mvnw spring-boot:run
```

Backend will start on: `http://localhost:8080`

### Start the Frontend

```bash
cd Frontend

npm start
```

Frontend will open automatically at: `http://localhost:3000`

### Verify Connection

1. Visit `http://localhost:3000`
2. Check for "Backend connected successfully" message in the top-right
3. Or visit `http://localhost:3000/api-test` for detailed testing

---

## 🔌 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | Yes |
| GET | `/api/auth/session` | Check session | Yes |

### Trainer Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/trainers` | Get all trainers | No |
| POST | `/api/trainers` | Add new trainer | Admin |
| PUT | `/api/trainers/{id}` | Update trainer | Admin |
| DELETE | `/api/trainers/{id}` | Delete trainer | Admin |

### Membership Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/memberships` | Get all plans | No |
| POST | `/api/memberships` | Create plan | Admin |
| PUT | `/api/memberships/{id}` | Update plan | Admin |
| DELETE | `/api/memberships/{id}` | Delete plan | Admin |

### Training Plan Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/plans` | Get all plans | No |
| POST | `/api/plans` | Create plan | Admin |
| DELETE | `/api/plans/{id}` | Delete plan | Admin |

### Subscription Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/subscriptions` | Get user subscriptions | Yes |
| POST | `/api/subscriptions/subscribe` | Subscribe to plan | Yes |

### User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get all users | Admin |

---

## 👥 User Roles

### Test Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`
- Access: Full admin panel with management features

**Regular User Account:**
- Username: `testuser`
- Password: `password123`
- Access: Member features and subscriptions

**New User Registration:**
- Users can register with email and password
- Default role: USER
- Admins must be created manually in the database

---

## 🖼️ Screenshots

### Member Features
- **Homepage:** Dynamic pricing and membership plans
- **Training Plans:** Browse workout programs by difficulty
- **Subscription:** Easy membership signup process
- **Trainer Profiles:** Meet qualified fitness professionals

### Admin Features
- **Admin Dashboard:** Comprehensive management interface
- **Membership Management:** Create and edit plans
- **Trainer Management:** Add trainers with photos
- **Training Plans:** Design workout programs
- **User Overview:** View all registered members

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Port 8080 already in use
```bash
# Find process using port 8080
netstat -ano | findstr :8080

# Kill the process (Windows)
taskkill /PID <process_id> /F
```

**Problem:** MySQL connection failed
- Verify MySQL is running: `mysql -u root -p`
- Check port in `application.properties` matches MySQL port
- Ensure database `fitness_sharks` exists

**Problem:** Build fails
```bash
# Clean and rebuild
mvnw.cmd clean install -U
```

### Frontend Issues

**Problem:** Backend connection failed
- Ensure backend is running on port 8080
- Check proxy configuration in `setupProxy.js`
- Restart frontend server: `npm start`

**Problem:** Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem:** CORS errors
- Development proxy should handle CORS automatically
- Ensure `setupProxy.js` exists in `src` folder
- Restart the development server

### Common Solutions

```bash
# Clear browser cache
# Chrome: Ctrl+Shift+Delete

# Check backend health
url http://localhost:8080/api/trainers

# Check frontend proxy
# Look for proxy logs in terminal where npm start is running

# Reset database (if needed)
DROP DATABASE fitness_sharks;
CREATE DATABASE fitness_sharks;
```

---

---

## 🔒 Security Notes

- Passwords are hashed using BCrypt
- Session-based authentication with HTTP-only cookies
- CORS configured for development (localhost:3000)
- Input validation on both frontend and backend
- SQL injection protection via JPA/Hibernate
- XSS protection enabled by default

**For Production:**
- Change default admin credentials
- Use environment variables for sensitive data
- Enable HTTPS
- Configure proper CORS origins
- Set secure session cookies
- Implement rate limiting
- Regular security audits

---

## 🚀 Deployment

### Backend Deployment

```bash
# Build JAR file
cd backend
mvnw.cmd clean package

# Run the JAR
java -jar target/DEAproject-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment

```bash
# Build for production
cd Frontend
npm run build

# Serve the build folder with a web server
# Update API_BASE_URL in config/api.config.js to production backend URL
```

### Deployment Platforms
- **Backend:** AWS EC2, Heroku, DigitalOcean, Railway
- **Frontend:** Vercel, Netlify, AWS S3 + CloudFront
- **Database:** AWS RDS, DigitalOcean Managed Database


---

## 👨‍💻 Authors

**Fitness Sharks Development Team**

---

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful UI library
- Tailwind CSS for the utility-first CSS framework
- All contributors and testers

---

## 📞 Support

For issues, questions, or suggestions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review existing documentation files
3. Open an issue on GitHub
4. Contact the development team

---

## 🗺️ Roadmap

### Upcoming Features
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Attendance tracking
- [ ] Progress tracking and analytics
- [ ] Social features and community
- [ ] Video tutorials for exercises
- [ ] Nutrition planning integration
- [ ] Multi-language support


---

**Built with ❤️ by the Fitness Sharks Team** 🦈💪

*Last Updated: November 2025*
