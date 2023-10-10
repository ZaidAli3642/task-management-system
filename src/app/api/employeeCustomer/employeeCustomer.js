import apiClient from '../client'

export const employeeCustomer = authToken => {
  const headers = {
    Authorization: `Bearer ${authToken}`, // Set the Authorization header with the token
  }

  return {
    fetchEmployeeCustomer: async employeeId => {
      let apiRoute = `/counts_data_list/get_tasks_count_for_customers?timestamp=${Date.now()}`
      if (employeeId) apiRoute += `&employeeId=${employeeId}`
      if (!employeeId) apiRoute += `&responsible_role=customer`

      try {
        const response = await apiClient.get(apiRoute, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
  }
}
