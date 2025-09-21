# Coffee Shop Application

A full-stack web application for managing a coffee shop, built with Vue.js frontend and Node.js/Express backend.

## System Requirements

- Node.js 16.x or higher
- MongoDB 4.4 or higher
- npm or yarn
- Docker and Docker Compose (recommended)

## Project Structure

```
coffee-shop-app/
├── coffee-shop-frontend/  # Vue.js frontend
└── coffee-shop-backend/   # Node.js/Express backend
```

## Installation & Setup

### Option 1: Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/nplongx/coffee-shop-app.git
cd coffee-shop-app
```

2. Create environment files:
```bash
# Frontend
cp coffee-shop-frontend/.env.example coffee-shop-frontend/.env

# Backend
cp coffee-shop-backend/.env.example coffee-shop-backend/.env
```

3. Start the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/v1/docs

### Option 2: Standard Installation

1. Clone the repository:
```bash
git clone https://github.com/nplongx/coffee-shop-app.git
cd coffee-shop-app
```

2. Setup Frontend:
```bash
cd coffee-shop-frontend
npm install
cp .env.example .env.development
npm run dev
```

3. Setup Backend:
```bash
cd ../coffee-shop-backend
npm install
cp .env.example .env
npm run dev
```

4. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/v1/docs

## Environment Variables

### Frontend (.env.development)
```
VITE_API_URL=http://localhost:3000/v1
```

### Backend (.env)
```
NODE_ENV=development
PORT=3001
MONGODB_URL=mongodb://localhost:27017/coffee-shop
JWT_SECRET=your-jwt-secret
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30
```

## Testing

### Backend Tests
```bash
cd coffee-shop-backend
npm test
```

### Frontend Tests
```bash
cd coffee-shop-frontend
npm test
```

## API Documentation

The API documentation is available at `/v1/docs` when the backend server is running. It provides detailed information about all available endpoints and their usage.
