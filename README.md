# Doctor Appointment Management System

Author: [Abhijay Rajvansh](https://abhijayrajvansh.com)

A NestJS-based REST API for managing doctor appointments, built with TypeScript and PostgreSQL.

## Features

- Doctor management (create, list)
- Slot management (create one-time/recurring slots, list available slots)
- Appointment booking system
- Swagger API documentation
- Docker support for easy deployment

## Tech Stack

- NestJS (Node.js framework)
- PostgreSQL (Database)
- Prisma (ORM)
- Docker & Docker Compose
- Swagger/OpenAPI (API Documentation)

## Project Structure

```
src/
├── app.module.ts          # Main application module
├── main.ts               # Application entry point
├── doctor/               # Doctor module and related files
├── slots/                # Slot management module
├── appointment/          # Appointment booking module
└── prisma/              # Prisma ORM configuration
```

## Database Schema

The system uses the following main entities:

- **Doctor**: Stores doctor information
- **Slot**: Manages appointment slots
- **Appointment**: Handles booked appointments
- **RecurrenceRule**: Manages recurring slot patterns

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- Docker and Docker Compose
- npm or yarn

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/abhijayrajvansh/dr-appt-mgmt-system
   cd dr-appt-mgmt-system
   ```

#### Using Docker

2. Build and run the application using Docker:

    ```bash
    docker-compose up --build
    ```
    This will start both the PostgreSQL database and the NestJS application.
    - server will start at http://localhost:3000/api/v1
    - Swagger UI documentation at: http://localhost:3000/api/v1/docs

#### or

### Using Manual Installation

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the PostgreSQL database using Docker:
   ```bash
   docker-compose up -d
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

The server will start at http://localhost:3000/api/v1

### API Documentation

Access the Swagger UI documentation at: http://localhost:3000/api/v1/docs

## API Endpoints

### Doctors

- `GET /api/v1/doctors` - List all doctors with their available slot counts
- `POST /api/v1/doctors` - Create a new doctor
- `GET /api/v1/doctors/:doctorId/bookings` - Get doctor's booked appointments

### Slots

- `POST /api/v1/doctors/:doctorId/slots` - Create slots for a doctor (one-time or recurring)
- `GET /api/v1/doctors/:doctorId/available_slots` - Get available slots for a doctor
- `GET /api/v1/doctors/slots/:slotId` - Get detailed information about a specific slot

### Appointments

- `POST /api/v1/slots/:slotId/book` - Book an appointment for a slot





## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/doctor_appointments"

# Server
PORT=3000
CORS_ORIGIN="*"
```

## API Features

### Doctor Management
- Create new doctors with validation for unique email and username
- List all doctors with their available slot counts
- View doctor's booking history

### Slot Management
- Create one-time or recurring slots (daily/weekly)
- Configure slot duration and availability
- View detailed slot information

### Appointment Booking
- Book available slots with patient information
- Automatic slot status management
- Validation for double-booking prevention

## Error Handling

The API implements proper error handling for:
- Resource not found (404)
- Validation errors (400)
- Conflict errors (409)
- Server errors (500)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request