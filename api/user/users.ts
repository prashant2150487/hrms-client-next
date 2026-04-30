// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: string;
//   department?: string;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateUserRequest {
//   email: string;
//   name: string;
//   role: string;
//   department?: string;
// }

// export interface UpdateUserRequest {
//   name?: string;
//   role?: string;
//   department?: string;
//   isActive?: boolean;
// }

// /**
//  * User management API endpoints
//  */
// export class UserEndpoints {
//   /**
//    * Get all users
//    */
//   static async getUsers(params?: {
//     page?: number;
//     limit?: number;
//     search?: string;
//     role?: string;
//     department?: string;
//   }): Promise<{
//     users: User[];
//     total: number;
//     page: number;
//     limit: number;
//   }> {
//     return BaseApiService.get('/users', params);
//   }

//   /**
//    * Get user by ID
//    */
//   static async getUserById(id: string): Promise<User> {
//     return BaseApiService.get(`/users/${id}`);
//   }

//   /**
//    * Create new user
//    */
//   static async createUser(userData: CreateUserRequest): Promise<User> {
//     return BaseApiService.post('/users', userData);
//   }

//   /**
//    * Update user
//    */
//   static async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
//     return BaseApiService.put(`/users/${id}`, userData);
//   }

//   /**
//    * Delete user
//    */
//   static async deleteUser(id: string): Promise<{ message: string }> {
//     return BaseApiService.delete(`/users/${id}`);
//   }

//   /**
//    * Get user roles
//    */
//   static async getUserRoles(): Promise<string[]> {
//     return BaseApiService.get('/users/roles');
//   }

//   /**
//    * Bulk update users
//    */
//   static async bulkUpdateUsers(updates: Array<{ id: string; data: UpdateUserRequest }>): Promise<{ updated: number }> {
//     return BaseApiService.put('/users/bulk', { updates });
//   }
// }
