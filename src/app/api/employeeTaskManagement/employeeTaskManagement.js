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
    fetchTaskForEmployees: async (responsibleId, customerId, { year, week = [36], taskGroup, task, solvedUnsolved = 'unsolved', weekNumber }) => {
      let apiRoute = `/employees_task_management/get_tasks_for_employee?customer_id=${JSON.stringify(customerId)}&selectedTaskGroups=${JSON.stringify(taskGroup)}&selectedTasks=${JSON.stringify(task)}&year=${year}`
      if (solvedUnsolved) apiRoute += `&status=${solvedUnsolved}`
      if (responsibleId) apiRoute += `&responsible_id=${JSON.stringify(responsibleId)}`
      if (!responsibleId) apiRoute += `&responsible_role=customer`
      if (weekNumber) apiRoute += `&weekNumber=${JSON.stringify(weekNumber)}`
      if (!weekNumber) apiRoute += `&selectedWeeks=${JSON.stringify(week)}`

      console.log('weekn umbqwe e: ', weekNumber)

      apiRoute += `&timestamp=${Date.now()}`

      try {
        const response = await apiClient.get(apiRoute, { headers })
        console.log('Response : ', response)
        return response
      } catch (error) {
        throw error
      }
    },
    fetchTaskForEmployeesAllCustomers: async (responsibleId, { year, week, taskGroup, task, solvedUnsolved, weekNumber }) => {
      let apiRoute = `/employees_task_management/get_tasks_for_employee_from_all_customers?year=${year}&selectedWeeks=${JSON.stringify(week)}&selectedTaskGroups=${JSON.stringify(taskGroup)}&selectedTasks=${JSON.stringify(task)}`

      if (solvedUnsolved) apiRoute += `&status=${solvedUnsolved}`
      if (responsibleId) apiRoute += `&responsible_id=${JSON.stringify(responsibleId)}`
      if (!responsibleId) apiRoute += `&responsible_role=customer`
      if (weekNumber) apiRoute += `&weekNumber=${JSON.stringify(weekNumber)}`
      if (!weekNumber) apiRoute += `&selectedWeeks=${JSON.stringify(week)}`

      apiRoute += `&timestamp=${Date.now()}`
      try {
        const response = await apiClient.get(apiRoute, { headers })

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
