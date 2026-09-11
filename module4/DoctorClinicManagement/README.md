# Doctor Clinic Management System

A full-stack **Doctor Clinic Management** web application built with **ReactJS, TypeScript, Node.js, Express, Prisma, and PostgreSQL**. The system allows patients to book appointments, doctors to manage schedules, and administrators to manage clinic operations through role-based dashboards.

> GitHub Repository: https://github.com/truonglehuuphat/js_truonglehuuphat/tree/main/module4/DoctorClinicManagement

---

# System Overview

The project consists of two main parts:

- **Frontend**: ReactJS + TypeScript
- **Backend**: Node.js + Express + Prisma + PostgreSQL

The application follows a RESTful architecture with JWT authentication and role-based authorization.

```
React Frontend
      │
      │ HTTP/JSON
      ▼
Express REST API
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL
```

---

# Frontend

## Technologies

| Technology | Purpose |
|------------|---------|
| ReactJS | UI Framework |
| TypeScript | Type Safety |
| React Router | Routing |
| Context API | Global State |
| React Hooks | Component Logic |
| CSS | Styling |

---

## Frontend Features

### Public

- Clinic Homepage
- Browse Doctors
- Search by Specialty
- View Doctor Profile
- View Available Time Slots

### Patient

- Register/Login
- Book Appointment
- View Appointment History
- Cancel Appointment
- Update Profile

### Doctor

- View Daily Schedule
- Manage Appointments
- Update Appointment Status

### Admin

- Manage Doctors
- Manage Specialties
- View Dashboard Statistics

---

## Frontend Folder Structure

```
src/
│
├── components/
├── pages/
├── context/
├── hooks/
├── services/
├── utils/
├── types/
└── assets/
```

### Folder Responsibilities

| Folder | Purpose |
|---------|----------|
| components | Reusable UI components |
| pages | Route pages |
| context | Global state |
| hooks | Custom hooks |
| services | API calls |
| utils | Helper functions |
| types | TypeScript interfaces |
| assets | Images & icons |

---

## Frontend User Flow

### Patient Flow

```
Home
 │
 ▼
Doctor List
 │
 ▼
Doctor Detail
 │
 ▼
Book Appointment
 │
 ▼
Appointment History
```

### Doctor Flow

```
Login
 │
 ▼
Dashboard
 │
 ▼
Today's Schedule
 │
 ▼
Update Appointment
```

### Admin Flow

```
Admin Login
 │
 ▼
Dashboard
 ├── Doctors
 ├── Specialties
 ├── Patients
 └── Statistics
```

---

# Backend

## Technologies

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express | REST API |
| TypeScript | Type Safety |
| Prisma ORM | Database |
| PostgreSQL | Data Storage |
| JWT | Authentication |
| bcrypt | Password Hashing |

---

## Backend Architecture

```
Routes
 │
 ▼
Controllers
 │
 ▼
Services
 │
 ▼
Prisma ORM
 │
 ▼
PostgreSQL
```

### Responsibilities

| Layer | Purpose |
|--------|---------|
| Routes | API endpoints |
| Controllers | Handle requests |
| Services | Business logic |
| Prisma | Database access |
| PostgreSQL | Persistent storage |

---

# Backend API Usage

## Authentication

### Register

`POST /api/v1/auth/register`

Create a new account.

**Request**

```json
{
  "email": "patient@example.com",
  "password": "123456",
  "fullName": "John Doe"
}
```

---

### Login

`POST /api/v1/auth/login`

Returns JWT tokens.

**Response**

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

### Refresh Token

`POST /api/v1/auth/refresh`

Generate a new access token.

---

## Doctor APIs

### Get Doctor List

`GET /api/v1/doctors`

Example

```
GET /api/v1/doctors?specialty=Cardiology&page=1
```

---

### Doctor Detail

`GET /api/v1/doctors/:id`

Returns doctor profile and available schedules.

---

### Create Doctor

`POST /api/v1/doctors`

Admin only.

---

### Update Doctor

`PUT /api/v1/doctors/:id`

Admin only.

---

### Delete Doctor

`DELETE /api/v1/doctors/:id`

Admin only.

---

## Specialty APIs

| Method | Endpoint |
|---------|----------|
| GET | /specialties |
| POST | /specialties |
| PUT | /specialties/:id |
| DELETE | /specialties/:id |

---

## Timeslot APIs

### Create Timeslot

`POST /api/v1/timeslots`

Doctor creates available schedules.

```json
{
  "date":"2026-09-20",
  "startTime":"09:00",
  "endTime":"10:00"
}
```

---

### Get Doctor Timeslots

`GET /api/v1/doctors/:id/timeslots`

Used by patients during booking.

---

## Appointment APIs

### Book Appointment

`POST /api/v1/appointments`

Patient books a schedule.

```json
{
  "doctorId":1,
  "timeslotId":12,
  "reason":"General consultation"
}
```

---

### My Appointments

`GET /api/v1/appointments/me`

View booking history.

---

### Doctor Appointments

`GET /api/v1/doctors/me/appointments`

View assigned appointments.

---

### Update Status

`PATCH /api/v1/appointments/:id/status`

```json
{
  "status":"COMPLETED"
}
```

Status values:

- PENDING
- CONFIRMED
- CANCELLED
- COMPLETED

---

### Cancel Appointment

`DELETE /api/v1/appointments/:id`

Patient cancels booking.

---

## Patient APIs

| Method | Endpoint |
|---------|----------|
| GET | /patients/me |
| PUT | /patients/me |

---

## Review APIs

### Create Review

`POST /api/v1/appointments/:id/review`

```json
{
  "rating":5,
  "comment":"Excellent doctor."
}
```

---

### Get Reviews

`GET /api/v1/doctors/:id/reviews`

Returns doctor reviews.

---

## Admin Dashboard

### Statistics

`GET /api/v1/admin/dashboard`

Example response

```json
{
  "totalDoctors":25,
  "totalPatients":540,
  "totalAppointments":1320,
  "completed":1180,
  "cancelled":95
}
```

---

# API Summary

| Module | APIs |
|----------|------|
| Authentication | 3 |
| Doctors | 5 |
| Specialties | 4 |
| Timeslots | 2 |
| Appointments | 5 |
| Patients | 2 |
| Reviews | 2 |
| Dashboard | 1 |
| **Total** | **24** |

---

# Authentication Flow

```
Login
 │
 ▼
Access Token
Refresh Token
 │
 ▼
Protected APIs
 │
 ▼
Refresh Token when expired
```

---

# Role Permissions

| Feature | Patient | Doctor | Admin |
|---------|:------:|:------:|:------:|
| View Doctors | ✅ | ✅ | ✅ |
| Book Appointment | ✅ | ❌ | ❌ |
| View Own Appointments | ✅ | ✅ | ✅ |
| Manage Schedule | ❌ | ✅ | ❌ |
| Create Review | ✅ | ❌ | ❌ |
| Manage Doctors | ❌ | ❌ | ✅ |
| Manage Specialties | ❌ | ❌ | ✅ |
| Dashboard Statistics | ❌ | ❌ | ✅ |

---

# Example Booking Workflow

### Step 1

Open the homepage.

### Step 2

Browse doctors.

### Step 3

Open doctor details.

### Step 4

Choose an available time slot.

### Step 5

Submit the appointment.

### Step 6

Doctor confirms the appointment.

### Step 7

Patient leaves a review after completion.

---

# Future Improvements

- JWT Refresh Rotation
- Email Notifications
- Payment Gateway
- Real-time Appointment Updates
- Doctor Calendar Integration
- Admin Analytics Dashboard
- File Upload for Medical Records

---

# Learning Outcomes

This project demonstrates practical experience with:

- ReactJS + TypeScript development
- Component-based architecture
- React Router
- Context API
- RESTful API design
- JWT Authentication
- Role-Based Authorization
- Express + Prisma
- PostgreSQL
- CRUD operations
- Scalable frontend/backend separation
