import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  taskGroupWithSchedules: [],
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
  error: null,
}

const customerTaskManagementSlice = createSlice({
  name: 'customerTaskManagement',
  initialState: initialState,
  reducers: {
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
    bulkAssignModal: (state, action) => {
      state.bulkAssignModal = action.payload
    },
    bulkAssignEditModal: (state, action) => {
      state.bulkAssignEditModal = action.payload
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
      state.loading = true
      state.error = null
      const { data } = action.payload
      state.responsibles = [...state.responsibles, data]
      let taskGroupWithSchedules = [...state.taskGroupWithSchedules]
      console.log('data task groups : ', JSON.parse(JSON.stringify(taskGroupWithSchedules)))

      console.log('data task 1 : ', data)
      let taskGroupIndex = taskGroupWithSchedules.findIndex(taskGroup => taskGroup.id === data.task_group_id)
      console.log('data task 1 : ', taskGroupIndex)
      for (let tasks of taskGroupWithSchedules[taskGroupIndex].tasks) {
        console.log('data task 1 : ', tasks)
        if (tasks.id === data.task_id) {
          tasks.task_item.responsible = data
        }
      }
      const dataTask = JSON.parse(JSON.stringify(taskGroupWithSchedules))
      console.log('data task : ', dataTask)
    },
    addResponsibleFailed: (state, action) => {
      state.loading = true
      state.error = action.payload.error
    },
    filters: (state, action) => {
      const taskGroupsWithSchedules = action.payload

      state.taskGroups = taskGroupsWithSchedules
      for (let taskGroupsWithSchedule of taskGroupsWithSchedules) {
        state.tasks = [...state.tasks, ...taskGroupsWithSchedule.tasks]

        for (let tasks of taskGroupsWithSchedule.tasks) {
          if (tasks?.task_item && tasks?.task_item?.responsible) {
            const found = state.responsibles.find(responsible => responsible.id === tasks?.task_item?.responsible.id)
            if (!found) state.responsibles = [...state.responsibles, tasks?.task_item?.responsible]
          }
        }
      }
    },
  },
})

export default customerTaskManagementSlice.reducer
export const { addResponsible, addResponsibleFailed, addResponsibleSuccess, filters, addNoteModal, addResponsibleModal, bulkAssignEditModal, bulkAssignModal, clearSectionModal, editNoteModal, editRepeatModal, editResponsibleModal, repeatModal, fetchTaskGroupWithSchedules, fetchTaskGroupWithSchedulesFailed, fetchTaskGroupWithSchedulesSuccess } = customerTaskManagementSlice.actions
