import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  taskGroupWithSchedules: [],
  perPageTaskGroupWithSchedules: [],
  customersWithTaskGroup: [],
  perPageCustomersWithTaskGroup: [],
  taskGroups: [],
  tasks: [],
  responsibles: [],
  bulkAssignModal: false,
  bulkAssignEditModal: false,
  clearSectionModal: false,
  addResponsibleModal: false,
  editResponsibleModal: false,
  addNoteModal: false,
  editNoteModal: false,
  repeatModal: false,
  editRepeatModal: false,
  clientInfoModal: false,
  clientInfo: {},
  error: null,
  perPage: 10,
  pageCount: 10,
  pageNo: 0,
}

const customerTaskManagementSlice = createSlice({
  name: 'customerTaskManagement',
  initialState: initialState,
  reducers: {
    clientInfo: (state, action) => {
      const { clientInfo } = action.payload
      state.clientInfo = clientInfo
    },
    clientInfoModal: (state, action) => {
      state.clientInfoModal = action.payload
    },
    setPageNo: (state, action) => {
      const { pageNo } = action.payload
      state.pageNo = pageNo
    },
    setPerPage: (state, action) => {
      const { perPage, isCustomerAll } = action.payload
      state.perPage = perPage
      let length = isCustomerAll ? state.customersWithTaskGroup.length : state.taskGroupWithSchedules.length
      state.pageCount = Math.ceil(length / perPage)

      if (isCustomerAll) {
        state.perPageCustomersWithTaskGroup = state.customersWithTaskGroup.slice(0, perPage + 1)
      } else {
        state.perPageTaskGroupWithSchedules = state.taskGroupWithSchedules.slice(0, perPage + 1)
      }
    },
    setPageCount: (state, action) => {
      const { pageNo, isCustomerAll } = action.payload
      const length = isCustomerAll ? state.customersWithTaskGroup.length : state.taskGroupWithSchedules.length
      state.pageCount = Math.ceil(length / state.perPage)
      let start = pageNo * state.perPage
      let end = (pageNo + 1) * state.perPage

      if (isCustomerAll) {
        state.perPageCustomersWithTaskGroup = state.customersWithTaskGroup.slice(start, end)
      } else {
        state.perPageTaskGroupWithSchedules = state.taskGroupWithSchedules.slice(start, end)
      }
    },
    fetchTaskGroupWithSchedules: (state, action) => {
      state.loading = true
      state.error = null
    },
    fetchTaskGroupWithSchedulesSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.taskGroupWithSchedules = action.payload
    },
    fetchTaskGroupWithSchedulesFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    fetchCustomersWithTaskGroup: (state, action) => {
      state.loading = true
      state.error = null
    },
    fetchCustomersWithTaskGroupSuccess: (state, action) => {
      state.loading = false
      state.error = null
      state.customersWithTaskGroup = action.payload
    },
    fetchCustomersWithTaskGroupFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    manageRepetition: (state, action) => {
      state.loading = true
      state.error = null
    },
    manageRepetitionSuccess: (state, action) => {
      state.loading = false
      state.error = null
    },
    manageRepetitionError: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    removeRepetition: (state, action) => {
      state.loading = true
      state.error = null
    },
    removeRepetitionSuccess: (state, action) => {
      state.loading = false
      state.error = null
    },
    removeRepetitionError: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    bulkAssign: (state, action) => {
      state.loading = true
      state.error = null
    },
    bulkAssignSuccess: (state, action) => {
      state.loading = false
      state.error = null
    },
    bulkAssignFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    bulkAssignModal: (state, action) => {
      state.bulkAssignModal = action.payload
    },
    bulkAssignEditModal: (state, action) => {
      state.bulkAssignEditModal = action.payload
    },
    clearSection: (state, action) => {
      state.loading = true
      state.error = null
    },
    clearSectionSuccess: (state, action) => {
      state.loading = false
      state.error = null
    },
    clearSectionFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    clearSectionModal: (state, action) => {
      state.clearSectionModal = action.payload
    },
    addResponsibleModal: (state, action) => {
      state.addResponsibleModal = action.payload
    },
    editResponsibleModal: (state, action) => {
      state.editResponsibleModal = action.payload
    },
    addNoteModal: (state, action) => {
      state.addNoteModal = action.payload
    },
    editNoteModal: (state, action) => {
      state.editNoteModal = action.payload
    },
    repeatModal: (state, action) => {
      state.repeatModal = action.payload
    },
    editRepeatModal: (state, action) => {
      state.editRepeatModal = action.payload
    },
    addResponsible: (state, action) => {
      state.loading = true
      state.error = null
    },
    addResponsibleSuccess: (state, action) => {
      state.loading = false
      state.error = null
    },
    addResponsibleFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    removeResponsible: (state, action) => {
      state.loading = true
      state.error = null
    },
    removeResponsibleSuccess: (state, action) => {
      state.loading = false
      state.error = null
    },
    removeResponsibleFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    addEditRemoveNote: (state, action) => {
      state.loading = true
      state.error = null
    },
    addEditRemoveNoteSuccess: (state, action) => {
      state.loading = false
      state.error = null
    },
    addEditRemoveNoteFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    filters: (state, action) => {
      const taskGroupsWithSchedules = action.payload

      state.taskGroups = []
      state.tasks = []
      state.responsibles = []

      state.taskGroups = taskGroupsWithSchedules
      for (let taskGroupsWithSchedule of taskGroupsWithSchedules) {
        for (let tasks of taskGroupsWithSchedule.tasks) {
          const found = state.tasks.find(task => task.id === tasks?.id)
          if (!found) state.tasks = [...state.tasks, tasks]

          if (tasks?.task_item && tasks?.task_item?.responsible) {
            const found = state.responsibles.find(responsible => responsible.id === tasks?.task_item?.responsible.id)
            if (!found) state.responsibles = [...state.responsibles, tasks?.task_item?.responsible]
          }
        }
      }
    },
    allCustomerFilters: (state, action) => {
      const customersWithTaskGroups = action.payload

      state.taskGroups = []
      state.tasks = []
      state.responsibles = []

      for (let customers of customersWithTaskGroups) {
        for (let taskGroupValue of customers.taskGroups) {
          const found = state.taskGroups.find(taskGroup => taskGroup.id === taskGroupValue.id)
          if (!found) state.taskGroups = [...state.taskGroups, taskGroupValue]

          for (let taskValue of taskGroupValue.tasks) {
            const found = state.tasks.find(task => task.id === taskValue.id)
            if (!found) state.tasks = [...state.tasks, taskValue]

            if (taskValue?.task_item && taskValue?.task_item?.responsible) {
              const found = state.responsibles.find(responsible => responsible.id === taskValue?.task_item?.responsible.id)
              if (!found) state.responsibles = [...state.responsibles, taskValue?.task_item?.responsible]
            }
          }
        }
      }
    },
  },
})

export default customerTaskManagementSlice.reducer
export const { removeResponsible, removeResponsibleFailed, removeResponsibleSuccess, removeRepetition, removeRepetitionError, removeRepetitionSuccess, clientInfo, clientInfoModal, setPageNo, setPageCount, setPerPage, bulkAssign, bulkAssignFailed, bulkAssignSuccess, clearSection, clearSectionFailed, clearSectionSuccess, manageRepetition, manageRepetitionError, manageRepetitionSuccess, allCustomerFilters, fetchCustomersWithTaskGroup, fetchCustomersWithTaskGroupFailed, fetchCustomersWithTaskGroupSuccess, addEditRemoveNote, addEditRemoveNoteFailed, addEditRemoveNoteSuccess, addResponsible, addResponsibleFailed, addResponsibleSuccess, filters, addNoteModal, addResponsibleModal, bulkAssignEditModal, bulkAssignModal, clearSectionModal, editNoteModal, editRepeatModal, editResponsibleModal, repeatModal, fetchTaskGroupWithSchedules, fetchTaskGroupWithSchedulesFailed, fetchTaskGroupWithSchedulesSuccess } = customerTaskManagementSlice.actions
