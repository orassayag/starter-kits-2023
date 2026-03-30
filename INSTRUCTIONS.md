# Instructions

## Project Overview

This repository contains multiple starter kits for React/Next.js applications with CRUD functionality. Each starter kit is designed as a boilerplate for rapid application development and can be used for job interviews, prototypes, or production applications.

## Available Starter Kits

### 1. client-nextjs-list-table-material-ui-yup-crud
A Next.js client application with table and list views featuring CRUD operations using Material-UI and Yup validation.

**Location:** `starter-kits/client-nextjs-list-table-material-ui-yup-crud/`

### 2. client-nextjs-list-table-material-ui-yup-crud-custom-hooks
Similar to the above but with custom React hooks for better code organization and reusability.

**Location:** `starter-kits/client-nextjs-list-table-material-ui-yup-crud-custom-hooks/`

### 3. javascript-server-node-rest-api-client-nextjs-list-table-material-ui-yup-crud
A full-stack solution with both server and client:
- **Server:** Node.js/Express REST API with Swagger documentation
- **Client:** Next.js application integrated with the server

**Location:** `starter-kits/javascript-server-node-rest-api-client-nextjs-list-table-material-ui-yup-crud/`

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/orassayag/starter-kits-2023.git
   cd starter-kits-2023
   ```

2. Navigate to the desired starter kit:
   ```bash
   cd starter-kits/[starter-kit-name]
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

## Running the Applications

### Client Applications

For client-only starter kits:

```bash
# Development mode
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Full-Stack Application

#### Server

Navigate to the server directory:
```bash
cd starter-kits/javascript-server-node-rest-api-client-nextjs-list-table-material-ui-yup-crud/server
```

Install and run:
```bash
npm install
npm run dev
```

Server features:
- REST API endpoints for CRUD operations
- Swagger documentation at `/api-docs`
- Winston logging
- Joi validation
- Integration with dummy data from [dummyjson.com](https://dummyjson.com/)

#### Client

Navigate to the client directory:
```bash
cd starter-kits/javascript-server-node-rest-api-client-nextjs-list-table-material-ui-yup-crud/client
```

Install and run:
```bash
npm install
npm run dev
```

## Project Structure

### Client Applications

```
client/
├── public/              # Static assets
├── src/
│   ├── components/      # React components (CrudTable, etc.)
│   ├── pages/          # Next.js pages
│   ├── styles/         # SCSS stylesheets
│   └── utils/          # Utility functions
├── package.json
└── next.config.js
```

### Server Application

```
server/
├── src/
│   ├── bin/            # Server entry point
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── custom/         # Custom classes and event emitters
│   ├── helpers/        # Helper functions
│   ├── middlewares/    # Express middlewares
│   ├── models/         # Data models and schemas
│   ├── routes/         # API routes
│   ├── services/       # Business logic services
│   ├── utils/          # Utility functions
│   └── validations/    # Joi validation schemas
├── logs/               # Application logs
└── package.json
```

## Key Features

### Client Features
- 📊 Material-UI table and list components
- ✏️ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Form validation with Yup
- 🎨 SCSS styling
- 🔄 Custom hooks for state management (custom-hooks variant)
- 📱 Responsive design

### Server Features
- 🚀 Express.js REST API
- 📚 Swagger/OpenAPI documentation
- ✅ Joi validation
- 📝 Winston logging
- 🔧 Error handling middleware
- 🔒 CORS support
- 📦 Compression middleware

## API Documentation

For the full-stack starter kit, once the server is running, visit:
- Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Available endpoints:
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Customization

### Changing the Port

**Client:**
Edit `package.json` scripts or set PORT environment variable

**Server:**
Create a `.env` file or edit the configuration in `src/config/env.js`

### Styling

All styles use SCSS and can be customized in the `src/styles/` directory

### Adding New Endpoints (Server)

1. Create validation schema in `src/validations/`
2. Add controller logic in `src/controllers/`
3. Define routes in `src/routes/`
4. Update Swagger documentation

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, either:
- Stop the application using that port
- Change the port in package.json scripts
- Set the PORT environment variable

### Dependencies Issues

If you encounter dependency issues:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Ensure you're using Node.js v18 or higher:
```bash
node --version
```

## Development Notes

- The applications are in development state and may require additional configuration for production use
- For production deployment, consider:
  - Setting up proper environment variables
  - Configuring a real database instead of dummy data
  - Implementing authentication and authorization
  - Adding proper error tracking and monitoring
  - Optimizing build and bundle sizes

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag
