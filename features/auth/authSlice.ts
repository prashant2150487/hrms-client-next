import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Employee } from "@/types/auth";

interface AuthState {
  user: User | null;
  employee: Employee | null;
  permissions: string[];
}

const initialState: AuthState = {
  user: null,
  employee: null,
  permissions: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setEmployee: (state, action: PayloadAction<Employee>) => {
      state.employee = action.payload;
    },
    setPermissions: (state, action: PayloadAction<string[]>) => {
      state.permissions = action.payload;
    },
    setAuthData: (
      state,
      action: PayloadAction<{
        userDetails: User;
        employeeDetails: Employee;
        permissions: string[];
      }>
    ) => {
      state.user = action.payload.userDetails;
      state.employee = action.payload.employeeDetails;
      state.permissions = action.payload.permissions;
    },
    logout: (state) => {
      state.user = null;
      state.employee = null;
      state.permissions = [];
    },
  },
});

export const { setUser, setEmployee, setPermissions, setAuthData, logout } =
  authSlice.actions;
export default authSlice.reducer;
