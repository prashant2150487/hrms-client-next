# API Endpoints Structure

This project uses a well-organized API endpoints structure for better maintainability and scalability.

## 📁 Folder Structure

```
api/
├── index.ts                    # Main exports
├── baseApiService.ts          # Base API service with common HTTP methods
└── endpoints/
    ├── auth.ts                # Authentication endpoints
    ├── users.ts               # User management endpoints
    ├── employees.ts           # Employee management endpoints
    ├── departments.ts         # Department management endpoints
    └── attendance.ts          # Attendance tracking endpoints
```

## 🚀 Usage

### Import Endpoints

```typescript
// Import specific endpoints
import { AuthEndpoints, UserEndpoints } from "@/api";

// Or import everything
import * as API from "@/api";
```

### Authentication

```typescript
import { AuthEndpoints } from "@/api";

// Login
const response = await AuthEndpoints.login({
  email: "user@example.com",
  password: "password123",
});

// Register
const response = await AuthEndpoints.register({
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
});

// Get profile
const user = await AuthEndpoints.getProfile();

// Logout
await AuthEndpoints.logout();
```

### User Management

```typescript
import { UserEndpoints } from "@/api";

// Get all users
const { users, total } = await UserEndpoints.getUsers({
  page: 1,
  limit: 10,
  search: "john",
});

// Create user
const newUser = await UserEndpoints.createUser({
  email: "newuser@example.com",
  name: "New User",
  role: "employee",
});

// Update user
const updatedUser = await UserEndpoints.updateUser("user-id", {
  role: "manager",
});
```

### Employee Management

```typescript
import { EmployeeEndpoints } from "@/api";

// Get employees
const { employees } = await EmployeeEndpoints.getEmployees({
  department: "engineering",
  status: "active",
});

// Create employee
const employee = await EmployeeEndpoints.createEmployee({
  userId: "user-id",
  employeeId: "EMP001",
  firstName: "John",
  lastName: "Doe",
  email: "john@company.com",
  department: "engineering",
  position: "Developer",
  hireDate: "2024-01-01",
});
```

### Department Management

```typescript
import { DepartmentEndpoints } from "@/api";

// Get departments
const { departments } = await DepartmentEndpoints.getDepartments();

// Create department
const department = await DepartmentEndpoints.createDepartment({
  name: "Engineering",
  description: "Software development department",
});
```

### Attendance Tracking

```typescript
import { AttendanceEndpoints } from "@/api";

// Check in
const attendance = await AttendanceEndpoints.checkIn({
  employeeId: "emp-id",
  location: "Office",
});

// Check out
await AttendanceEndpoints.checkOut(attendanceId, {
  notes: "Completed work",
});

// Get attendance report
const report = await AttendanceEndpoints.getAttendanceReport({
  startDate: "2024-01-01",
  endDate: "2024-01-31",
});
```

## 🏗️ Base API Service

The `BaseApiService` provides common HTTP methods:

```typescript
import { BaseApiService } from "@/api";

// GET request
const data = await BaseApiService.get("/custom-endpoint");

// POST request
const result = await BaseApiService.post("/custom-endpoint", payload);

// PUT request
await BaseApiService.put("/custom-endpoint", updates);

// DELETE request
await BaseApiService.delete("/custom-endpoint");
```

## 📝 Adding New Endpoints

1. Create a new file in `api/endpoints/`
2. Create a class with static methods
3. Use `BaseApiService` for HTTP calls
4. Export from `api/index.ts`
5. Add TypeScript interfaces for request/response types

Example:

```typescript
// api/endpoints/leaves.ts
import { BaseApiService } from "@/api/baseApiService";

export class LeaveEndpoints {
  static async getLeaves(employeeId: string) {
    return BaseApiService.get(`/leaves/${employeeId}`);
  }

  static async requestLeave(leaveData: LeaveRequest) {
    return BaseApiService.post("/leaves", leaveData);
  }
}
```

## 🔒 Authentication

All endpoints automatically include authentication headers via axios interceptors. The base axios instance handles:

- Automatic token attachment
- Token refresh on 401 errors
- Error handling for 403/5xx responses

## 📊 Response Types

All endpoints return properly typed responses. Check the endpoint files for specific TypeScript interfaces.

## 🧪 Error Handling

Endpoints throw errors that can be caught and handled:

```typescript
try {
  const result = await AuthEndpoints.login(credentials);
} catch (error) {
  console.error("Login failed:", error.response?.data?.message);
}
```
