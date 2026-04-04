import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
// import { usersApi } from "@/features/users/usersApi";

const rootReducer = combineReducers({
  auth: authReducer,
//   [usersApi.reducerPath]: usersApi.reducer,
});

export default rootReducer;