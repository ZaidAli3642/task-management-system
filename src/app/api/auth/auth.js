import apiClient from '../client'

export const auth = () => {
  return {
    login: async userCredentials => {
      try {
        const response = await apiClient.post('/users/login', userCredentials)
        return response
      } catch (error) {
        throw error
      }
    },
  }
}
