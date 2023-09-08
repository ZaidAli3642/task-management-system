import apiClient from '../client'

export const employeeCustomer = authToken => {
  const headers = {
    Authorization: `Bearer ${authToken}`, // Set the Authorization header with the token
  }

  return {
    fetchEmployeeCustomer: async (perPage, page, employeeId) => {
      try {
        const response = await apiClient.get(`/counts_data_list/get_tasks_count_for_customers?employeeId=${employeeId}&timestamp=${Date.now()}`, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
  }
}
