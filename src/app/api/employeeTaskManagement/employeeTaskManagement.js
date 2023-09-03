import apiClient from '../client'

export const employeeTaskManagement = authToken => {
  const headers = {
    Authorization: `Bearer ${authToken}`, // Set the Authorization header with the token
  }

  return {
    fetchAllEmployees: async () => {
      try {
        const response = await apiClient.get(`/employees_task_management/all_employees?timestamp=${Date.now()}`, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    fetchAllCustomers: async () => {
      try {
        const response = await apiClient.get(`/customers/allCustomers?timestamp=${Date.now()}`, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    fetchTaskForEmployees: async (responsibleId, customerId, { year, week, taskGroup, task, solvedUnsolved }) => {
      try {
        const response = await apiClient.get(`/employees_task_management/get_tasks_for_employee?customer_id=${JSON.stringify(customerId)}&responsible_id=${JSON.stringify(responsibleId)}&selectedTaskGroups=${JSON.stringify(taskGroup)}&selectedTasks=${JSON.stringify(task)}&year=${year}&weekNumber=${week}&status=${solvedUnsolved}&timestamp=${Date.now()}`, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    fetchTaskForEmployeesAllCustomers: async (responsibleId, { year, week, taskGroup, task, solvedUnsolved }) => {
      try {
        const response = await apiClient.get(`/employees_task_management/get_tasks_for_employee_from_all_customers?responsible_id=${responsibleId}&year=${year}&weekNumber=${week}&selectedTaskGroups=${JSON.stringify(taskGroup)}&selectedTasks=${JSON.stringify(task)}&status=${solvedUnsolved}&timestamp=${Date.now()}`, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
    updateTaskByEmployee: async data => {
      try {
        const response = await apiClient.post(`/employees_task_management/update_task_by_employee`, data, { headers })
        return response
      } catch (error) {
        throw error
      }
    },
  }
}
