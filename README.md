# Slot-Management

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# Slot Management API

A backend API built with **NestJS** and **Prisma**, designed for managing users, slots, displays, bookings, and payments.

---

## 🚀 Getting Started

### 📦 Requirements

- Node.js >= 18
- MongoDB or any database compatible with Prisma
- `pnpm` or `npm`

```

### ENV DETAIL ARE GIVEN HERE USE THEM IN THE .env FILE

```bash

PORT = 8080
DATABASE_URL = "mongodb://localhost:27017/slot-management"
JWT_SECRET_KEY = "your_secret_key"
JWT_REFRESH_TOKEN = "your_refresh_token"

```

### RUN THIS COMMAND TO RUN THE PRISMA CLIENT

```bash
$ npx prisma generate


# Swagger Documentation for API

http://localhost:3000/api-docs

```

## Step-by-Step Usage

```bash

1. Register a User
2. Login User
3. Create a Display
4. Create Slots
5. Get Available Slots
6. Book a Slot - Booking API (/bookings)
7. Initiate Payment
8. Confirm Payment
9. View User Bookings

```
