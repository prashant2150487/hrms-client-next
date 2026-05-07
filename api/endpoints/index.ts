export const endPoints = {
  auth: {
    login: "auth/login",
    register: "auth/register",
    logout: "auth/logout",
    getProfile: "auth/profile",
    refreshToken: "auth/refresh",
    verifyEmail: "auth/verify-email",
    getMe: "auth/me",
  },
  employees: {
    getAll: "employees",
    create: "employees",
    getById: (id: string) => `employees/${id}`,
    update: (id: string) => `employees/${id}`,
    delete: (id: string) => `employees/${id}/remove`,
  },
};
