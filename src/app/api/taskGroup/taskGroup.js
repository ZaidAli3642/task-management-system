import apiClient from '../client'

export const taskGroup = authToken => {
  const headers = {
    Authorization: `Bearer ${authToken}`, // Set the Authorization header with the token
  }

  return {
    fetchTaskGroups: async () => {
      try {
        const response = await apiClient.get(`/task_group/getTaskGroupsAndTasks?timestamp=${Date.now()}`, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    addTaskGroups: async taskGroup => {
      try {
        const response = await apiClient.post(`/task_group/add`, taskGroup, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    editTaskGroups: async (taskGroup, taskGroupId) => {
      try {
        const response = await apiClient.put(`/task_group/` + taskGroupId, taskGroup, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    deleteTaskGroups: async taskGroupId => {
      try {
        const response = await apiClient.delete(`/task_group/` + taskGroupId, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
  }
}
