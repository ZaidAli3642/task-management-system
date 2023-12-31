import apiClient from '../client'

export const users = authToken => {
  const headers = {
    Authorization: `Bearer ${authToken}`, // Set the Authorization header with the token
  }

  return {
    fetchUsers: async (perPage, page) => {
      try {
        const response = await apiClient.get(`/counts_data_list/get_tasks_count_for_all_employees?timestamp=${Date.now()}`, { headers })

        return response
      } catch (error) {
        throw error
      }
    },
    fetchCustomersAssignedTask: async (perPage, page) => {
      try {
        const response = await apiClient.get(`/counts_data_list/get_customers_assigned_tasks?timestamp=${Date.now()}`, { headers })

        return response
      } catch (error) {
        throw error
      }
    },
    fetchActiveEmployees: async () => {
      try {
        const response = await apiClient.get(`/users/activeEmployees?timestamp=${Date.now()}`, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    addEmployee: async userCredentials => {
      try {
        const response = await apiClient.post('/users/register', userCredentials)
        return response
      } catch (error) {
        throw error
      }
    },
    deleteEmployee: async userId => {
      try {
        const response = await apiClient.delete('/users/' + userId, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    editEmployee: async (updatedUser, userId) => {
      try {
        const response = await apiClient.put('/users/' + userId, updatedUser, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
  }
}
