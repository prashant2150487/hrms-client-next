# Simplified Axios Setup

This project uses a single enhanced axios instance for all API calls, without RTK Query complexity.

## Setup

The axios instance is configured with:

- Base URL from environment variables
- Automatic authentication token handling
- Request/response interceptors for error handling
- TypeScript support

## File Structure

```
config/
├── axios/
│   └── axiosInstance.ts    # Enhanced axios instance with interceptors
features/
├── auth/
│   ├── authApi.ts          # Auth service class with static methods
│   └── authSlice.ts        # Redux state management
```

## Usage

### Auth Service

```typescript
import { AuthService } from "@/features/auth/authApi";

// Login
const response = await AuthService.login({ email, password });
// Returns: { accessToken: string, refreshToken?: string, user: User }

// Register
const response = await AuthService.register({ name, email, password });

// Logout
await AuthService.logout();

// Get profile
const user = await AuthService.getProfile();

// Refresh token
const tokens = await AuthService.refreshToken();
```

### In Components

```typescript
import { AuthService } from "@/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";

function LoginForm() {
  const dispatch = useDispatch();

  const handleLogin = async (credentials) => {
    try {
      const response = await AuthService.login(credentials);
      dispatch(
        setCredentials({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: response.user,
        })
      );
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
}
```

### Direct Axios Usage

```typescript
import axiosInstance from "@/config/axios/axiosInstance";

// GET request
const data = await axiosInstance.get("/users");

// POST request
const result = await axiosInstance.post("/users", userData);

// PUT request
await axiosInstance.put("/users/123", updateData);

// DELETE request
await axiosInstance.delete("/users/123");
```

## Features

✅ **Single Axios Instance** - No multiple layers or base queries  
✅ **Automatic Auth** - Tokens added to requests automatically  
✅ **Error Handling** - Interceptors handle 401/403/5xx errors  
✅ **TypeScript Support** - Fully typed responses  
✅ **Redux Integration** - Works with existing auth slice

## Environment Variables

Make sure to set:

```
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
```

## Error Handling

The axios instance automatically:

- Handles 401 errors by clearing tokens
- Shows appropriate error messages for 403/5xx errors
- Rejects promises with proper error objects

All API calls return promises that can be handled with try/catch blocks.
