import apiClient from '../client'

export const customerTaskManagement = authToken => {
  const headers = {
    Authorization: `Bearer ${authToken}`, // Set the Authorization header with the token
  }

  return {
    fetchTaskGroupWithSchedules: async (customerId, selectedTaskGroups, selectedTasks, selectedResponsibles) => {
      try {
        const response = await apiClient.get(`/customers_task_management/get_task_groups_with_schedules?selectedTaskGroups=${JSON.stringify(selectedTaskGroups)}&selectedTasks=${JSON.stringify(selectedTasks)}&selectedResponsibles=${JSON.stringify(selectedResponsibles)}&customer_id=${customerId}&timestamp=${Date.now()}`, { headers })
        return response
      } catch (error) {
        console.log('Error : ', error)
        throw error
      }
    },
    addResponsible: async data => {
      try {
        const response = await apiClient.post(`/customers_task_management/manage_responsible`, data, { headers })
        return response
      } catch (error) {
        console.log('Error : ', error)
        throw error
      }
    },
  }
}
