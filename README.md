# CRUD Application with Docker

This is a full-stack CRUD (Create, Read, Update, Delete) application built with React, Node.js/Express, and MongoDB. The entire application is containerized using Docker and orchestrated with Docker Compose.

## Features

- Create, read, update, and delete items
- React frontend with a clean, responsive UI
- RESTful API backend with Express
- MongoDB database for data persistence
- Fully containerized with Docker
- Easy deployment with Docker Compose

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Step 1: Get the Application Code

Either clone the repository or download and extract the source code to your local machine.

```bash
git clone <repository-url>
cd crud-app
```

### Step 2: Build the Docker Containers

Build all the Docker containers defined in the `docker-compose.yml` file:

```bash
docker-compose build
```

This command will:
- Build the backend container with Node.js/Express
- Build the frontend container with React and Nginx
- Prepare to use the MongoDB container

### Step 3: Start the Application

Start all the containers in detached mode:

```bash
docker-compose up -d
```

This command will:
- Start the MongoDB container
- Start the backend API container
- Start the frontend container
- Create a network for the containers to communicate
- Create a volume for MongoDB data persistence

### Step 4: Verify the Containers are Running

Check that all containers are up and running:

```bash
docker-compose ps
```

You should see three containers running:
- `mongodb` - The MongoDB database
- `backend` - The Node.js/Express API
- `frontend` - The React frontend served by Nginx

### Step 5: Access the Application

Once all containers are running, you can access the application:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **MongoDB**: mongodb://localhost:27017 (accessible via MongoDB clients)

## Using the Application

1. Open your web browser and navigate to http://localhost:3000
2. Use the form at the top to create new items
3. View the list of items below the form
4. Click "Edit" to update an item
5. Click "Delete" to remove an item

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/items | Get all items |
| GET    | /api/items/:id | Get a specific item |
| POST   | /api/items | Create a new item |
| PUT    | /api/items/:id | Update an item |
| DELETE | /api/items/:id | Delete an item |

## Stopping the Application

When you're done using the application, you can stop all containers:

```bash
docker-compose down
```

To completely remove all containers, networks, and volumes (including the database data):

```bash
docker-compose down -v
```

## Troubleshooting

### Port Conflicts

If you encounter port conflicts, you can modify the `docker-compose.yml` file to use different ports:

```yaml
# Example: Change frontend port from 3000 to 8080
frontend:
  ports:
    - "8080:80"

# Example: Change backend port from 5000 to 8000
backend:
  ports:
    - "8000:5000"
```

After changing ports, rebuild and restart the containers:

```bash
docker-compose down
docker-compose up -d
```

### Container Build Failures

If container builds fail, check the error messages and ensure all required files are in the correct locations. You can rebuild a specific container:

```bash
docker-compose build frontend
docker-compose build backend
```

### Database Connection Issues

If the backend cannot connect to MongoDB, ensure the MongoDB container is running and the connection string in the backend's environment variables is correct:

```bash
# Check MongoDB container status
docker-compose ps mongo

# View backend logs for connection errors
docker-compose logs backend
```

## Viewing Logs

To view logs for troubleshooting:

```bash
# View logs for all containers
docker-compose logs

# View logs for a specific container
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongo

# Follow logs in real-time
docker-compose logs -f
```

## Rebuilding After Code Changes

If you make changes to the code, you'll need to rebuild the containers:

```bash
# Rebuild and restart all containers
docker-compose up -d --build

# Or rebuild and restart a specific container
docker-compose up -d --build frontend
```

## Project Structure

```
crud-app/
├── frontend/           # React frontend
│   ├── public/         # Static files
│   ├── src/            # React source code
│   ├── Dockerfile      # Frontend Docker configuration
│   └── nginx.conf      # Nginx configuration
├── backend/            # Express backend
│   ├── server.js       # Main server file
│   ├── Dockerfile      # Backend Docker configuration
│   └── .env            # Environment variables
└── docker-compose.yml  # Docker Compose configuration
```