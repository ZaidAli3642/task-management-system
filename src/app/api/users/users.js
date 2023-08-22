import apiClient from '../client'

export const users = authToken => {
  const headers = {
    Authorization: `Bearer ${authToken}`, // Set the Authorization header with the token
  }

  return {
    fetchUsers: async (perPage, page) => {
      try {
        const response = await apiClient.get(`/users?per_page=${perPage}&page=${page}&timestamp=${Date.now()}`, { headers })
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
        console.log('Error : ', error)
        throw error
      }
    },
    editEmployee: async (updatedUser, userId) => {
      try {
        console.log('updated : ', updatedUser)
        const response = await apiClient.put('/users/' + userId, updatedUser, { headers })
        return response
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  }
}
