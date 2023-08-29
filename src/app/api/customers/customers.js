import apiClient from '../client'

export const customers = authToken => {
  const headers = {
    Authorization: `Bearer ${authToken}`, // Set the Authorization header with the token
  }

  return {
    fetchCustomers: async (perPage, page) => {
      try {
        const response = await apiClient.get(`/customers?per_page=${perPage}&page=${page}&timestamp=${Date.now()}`, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    fetchActiveCustomers: async () => {
      try {
        const response = await apiClient.get(`/customers/activeCustomers?timestamp=${Date.now()}`, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    addCustomer: async userCredentials => {
      try {
        const response = await apiClient.post('/customers/add', userCredentials, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    editCustomer: async (updatedUser, userId) => {
      try {
        const response = await apiClient.put('/customers/' + userId, updatedUser, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
  }
}
