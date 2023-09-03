import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  allEmployees: [],
  allCustomers: [],
  taskForEmployees: [],
  taskForEmployeesAllCustomers: [],
  perPageAllCustomerTaskEmployees: [],
  taskGroups: [],
  tasks: [],
  noteModal: false,
  noteText: '',
  clientInfoModal: false,
  clientInfo: {},
  perPage: 2,
  pageCount: 2,
  error: null,
}

const employeeTaskManagementSlice = createSlice({
  name: 'employeeTaskManagement',
  initialState: initialState,
  reducers: {
    clientInfoModal: (state, action) => {
      state.clientInfoModal = action.payload
    },
    clientInfo: (state, action) => {
      const { clientInfo } = action.payload
      state.clientInfo = clientInfo
    },
    noteModal: (state, action) => {
      state.noteModal = action.payload
    },
    setNoteText: (state, action) => {
      const { noteText } = action.payload
      state.noteText = noteText
    },
    setPerPage: (state, action) => {
      const { perPage } = action.payload
      state.perPage = perPage
      state.pageCount = Math.ceil(state.taskForEmployeesAllCustomers.length / perPage)

      state.perPageAllCustomerTaskEmployees = state.taskForEmployeesAllCustomers.slice(0, perPage + 1)
    },
    setPageCount: (state, action) => {
      const { pageNo } = action.payload

      if (state.taskForEmployeesAllCustomers.length > state.perPage) state.pageCount = Math.ceil(state.taskForEmployeesAllCustomers.length / state.perPage)
      let start = pageNo * state.perPage
      let end = (pageNo + 1) * state.perPage

      state.perPageAllCustomerTaskEmployees = state.taskForEmployeesAllCustomers.slice(start, end)
    },
    fetchAllEmployees: (state, action) => {
      state.loading = true
      state.error = null
    },
    fetchAllEmployeesSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.allEmployees = action.payload
    },
    fetchAllEmployeesFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    fetchAllCustomers: (state, action) => {
      state.loading = true
      state.error = null
    },
    fetchAllCustomersSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.allCustomers = action.payload
    },
    fetchAllCustomersFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    fetchTaskForEmployees: (state, action) => {
      state.loading = true
      state.error = null
    },
    fetchTaskForEmployeesSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.taskForEmployees = action.payload
    },
    fetchTaskForEmployeesFailed: (state, action) => {
      state.loading = true
      state.error = action.payload.error
    },
    fetchTaskForEmployeesAllCustomers: (state, action) => {
      state.loading = true
      state.error = null
    },
    fetchTaskForEmployeesAllCustomersSuccess: (state, action) => {
      state.loading = true
      state.error = null
      state.taskForEmployeesAllCustomers = action.payload
    },
    fetchTaskForEmployeesAllCustomersFailed: (state, action) => {
      state.loading = true
      state.error = action.payload.error
    },
    updateTaskByEmployee: (state, action) => {
      state.loading = true
      state.error = null
    },
    updateTaskByEmployeeSuccess: (state, action) => {
      state.loading = false
      state.error = null
    },
    updateTaskByEmployeeFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    setFilters: (state, action) => {
      const { data } = action.payload

      let taskGroups = []
      let tasks = []

      for (let item of data) {
        if (item.currentTasks.length) {
          for (let task of item.currentTasks) {
            const found = taskGroups.find(taskGroup => taskGroup.id === task.taskItem.task_group_id)
            const foundTask = tasks.find(taskVal => taskVal.id === task.taskItem.task_id)

            if (!foundTask) tasks.push({ id: task.taskItem.task_id, name: task.taskItem.task_name })
            if (!found) taskGroups.push({ id: task.taskItem.task_group_id, name: task.taskItem.task_group_name })
          }
        }
        if (item.futureTasks.length) {
          for (let task of item.futureTasks) {
            const found = taskGroups.find(taskGroup => taskGroup.id === task.taskItem.task_group_id)
            const foundTask = tasks.find(taskVal => taskVal.id === task.taskItem.task_id)

            if (!foundTask) tasks.push({ id: task.taskItem.task_id, name: task.taskItem.task_name })
            if (!found) taskGroups.push({ id: task.taskItem.task_group_id, name: task.taskItem.task_group_name })
          }
        }
        if (item.pastTasks.length) {
          for (let task of item.pastTasks) {
            const found = taskGroups.find(taskGroup => taskGroup.id === task.taskItem.task_group_id)
            const foundTask = tasks.find(taskVal => taskVal.id === task.taskItem.task_id)

            if (!foundTask) tasks.push({ id: task.taskItem.task_id, name: task.taskItem.task_name })
            if (!found) taskGroups.push({ id: task.taskItem.task_group_id, name: task.taskItem.task_group_name })
          }
        }
      }

      state.tasks = tasks
      state.taskGroups = taskGroups
    },
  },
})

export default employeeTaskManagementSlice.reducer
export const { clientInfo, clientInfoModal, setNoteText, noteModal, setPageCount, setPerPage, updateTaskByEmployee, updateTaskByEmployeeFailed, updateTaskByEmployeeSuccess, setFilters, fetchTaskForEmployeesAllCustomers, fetchTaskForEmployeesAllCustomersFailed, fetchTaskForEmployeesAllCustomersSuccess, fetchTaskForEmployees, fetchTaskForEmployeesFailed, fetchTaskForEmployeesSuccess, fetchAllCustomers, fetchAllCustomersFailed, fetchAllCustomersSuccess, fetchAllEmployees, fetchAllEmployeesFailed, fetchAllEmployeesSuccess } = employeeTaskManagementSlice.actions
