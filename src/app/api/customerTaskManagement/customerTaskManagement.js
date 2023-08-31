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
        throw error
      }
    },
    fetchCustomersWithTaskGroup: async (customerId, selectedTaskGroups, selectedTasks, selectedResponsibles) => {
      try {
        const response = await apiClient.get(`/customers_task_management/get_customers_with_task_groups?selectedTaskGroups=${JSON.stringify(selectedTaskGroups)}&selectedTasks=${JSON.stringify(selectedTasks)}&selectedResponsibles=${JSON.stringify(selectedResponsibles)}&customer_id=${customerId}&timestamp=${Date.now()}`, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    addResponsible: async data => {
      try {
        const response = await apiClient.post(`/customers_task_management/manage_responsible`, data, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    addEditRemoveNote: async data => {
      try {
        const response = await apiClient.post(`/customers_task_management/manage_notes`, { ...data, responsible_role: 'employee' }, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    manageRepetition: async data => {
      try {
        console.log('data : ', data)
        const response = await apiClient.post(`/customers_task_management/manage_repetition`, data, { headers })
        console.log('Response call : ', response)
        return response
      } catch (error) {
        console.log('Error : ', error)
        throw error
      }
    },
    clearSection: async data => {
      try {
        const response = await apiClient.delete(`/customers_task_management/clear_all_selection`, { headers, data: data })
        return response
      } catch (error) {
        throw error
      }
    },
    bulkAssign: async data => {
      try {
        const response = await apiClient.post(`/customers_task_management/assign_bulk`, data, { headers })
        console.log('Bulk assign : ', response)
        return response
      } catch (error) {
        console.log('Bulk assign Error: ', error)
        throw error
      }
    },
  }
}
