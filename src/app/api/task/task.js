import apiClient from '../client'

export const task = authToken => {
  const headers = {
    Authorization: `Bearer ${authToken}`, // Set the Authorization header with the token
  }

  return {
    addTask: async task => {
      try {
        const response = await apiClient.post(`/task/add`, task, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    deleteTask: async taskId => {
      try {
        const response = await apiClient.delete(`/task/` + taskId, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    editTask: async (updatedTask, taskId) => {
      try {
        const response = await apiClient.put(`/task/` + taskId, updatedTask, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
  }
}
