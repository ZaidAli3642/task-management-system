import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, useToast } from '@chakra-ui/react'

import Breadcrumbs from '../../components/Breadcrumbs'
import { ButtonWithIcon } from '../../components/Form'
import taskBreadcrumb from './taskBreakcrumbs'
import TaskTable from '../../components/Table/Task/Task'
import { addTaskGroup, deleteTaskGroup, fetchTaskGroup, taskGroupAddModal, taskGroupDeleteModal, taskGroupEditModal, editTaskGroup as editTaskGroupAction, taskAddModal, addTask, taskEditModal, taskDeleteModal, deleteTask, editTask as editTaskAction } from '../../redux/reducers/taskGroup/taskGroup'
import AddTaskGroup from '../../components/Modal/TaskGroup/AddTaskGroup'
import useForm from '../../hooks/useForm'
import EditTaskGroup from '../../components/Modal/TaskGroup/EditTaskGroup'
import DeleteTaskGroup from '../../components/Modal/TaskGroup/DeleteTaskGroup'
import taskGroupSchema from '../../validations/taskGroupSchema'
import AddTask from '../../components/Modal/TaskGroup/AddTask'
import taskSchema from '../../validations/taskSchema'
import EditTask from '../../components/Modal/TaskGroup/EditTask'
import DeleteTask from '../../components/Modal/TaskGroup/DeleteTask'

const Task = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const taskGroupsAndTasks = useSelector(state => state.taskGroup.taskGroupsAndTasks)
  const isTaskGroupAddModal = useSelector(state => state.taskGroup.taskGroupAddModal)
  const isTaskGroupEditModal = useSelector(state => state.taskGroup.taskGroupEditModal)
  const isTaskGroupDeleteModal = useSelector(state => state.taskGroup.taskGroupDeleteModal)
  const isTaskAddModal = useSelector(state => state.taskGroup.taskAddModal)
  const isTaskEditModal = useSelector(state => state.taskGroup.taskEditModal)
  const isTaskDeleteModal = useSelector(state => state.taskGroup.taskDeleteModal)
  const [taskGroupId, setTaskGroupId] = useState('')
  const [taskId, setTaskId] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [errorMessages, isInvalid, inputFields, , , onChange, onSubmit] = useForm({ name: '' })
  const [errorMessagesTask, isInvalidTask, inputFieldsTask, , , onChangeTask, onSubmitTask] = useForm({ name: '', id: '' })
  const [errorMessagesTaskEdit, isInvalidTaskEdit, inputFieldsTaskEdit, setInputFieldEditTask, , onChangeTaskEdit, onSubmitTaskEdit] = useForm({ name: '', id: '' })
  const [errorMessagesEdit, isInvalidEdit, inputFieldsEdit, setInputFieldsEdit, , onChangeEdit, onSubmitEdit] = useForm({ name: '' })

  const editTaskGroup = data => {
    setInputFieldsEdit({ name: data.name })
    setTaskGroupId(data.uuid)
    dispatch(taskGroupEditModal(true))
  }

  const deleteTaskGroupModal = () => {
    handleDeleteTaskGroup()
    dispatch(taskGroupDeleteModal(false))
  }

  const handleAddTaskGroup = async () => {
    await onSubmit(taskGroupSchema, () => dispatch(addTaskGroup({ taskGroup: inputFields, toast })))
  }

  const handleEditTaskGroup = async () => {
    await onSubmitEdit(taskGroupSchema, () => dispatch(editTaskGroupAction({ updatedTaskGroup: inputFieldsEdit, taskGroupId: taskGroupId, toast })))
    dispatch(taskGroupEditModal(false))
  }

  const handleDeleteTaskGroup = () => {
    dispatch(deleteTaskGroup({ taskGroupId: taskGroupId }))
  }

  const addTaskModal = data => {
    handleOptionSelect(data)
    dispatch(taskAddModal(true))
  }

  const handleOptionSelect = option => {
    onChangeTask({ target: { value: option.id, name: 'id' } })
    setSelectedOption(option.name)
  }

  const handleEditOptionSelect = option => {
    onChangeTaskEdit({ target: { value: option.id, name: 'id' } })
    setSelectedOption(option.name)
  }

  const handleAddTask = async () => {
    await onSubmitTask(taskSchema, () => dispatch(addTask({ task: { ...inputFieldsTask, task_group_id: inputFieldsTask.id }, toast })))
    setSelectedOption(null)
  }

  const handleEditTask = async () => {
    await onSubmitTaskEdit(taskSchema, () => dispatch(editTaskAction({ updatedTask: inputFieldsTaskEdit, taskId: taskId.uuid, toast })))
  }

  const editTask = (taskGroup, task) => {
    setSelectedOption(taskGroup.name)
    setInputFieldEditTask({ name: task.name, id: task.task_group_id })
    setTaskId(task)
    dispatch(taskEditModal(true))
  }

  const handleDeleteTask = () => {
    dispatch(deleteTask({ taskId: taskId.uuid, task: taskId }))
    dispatch(taskDeleteModal(false))
  }

  useEffect(() => {
    dispatch(fetchTaskGroup({ perPage: 10, page: 1 }))
  }, [])

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' my='20px' mx='30px'>
        <Breadcrumbs navigationLocation={taskBreadcrumb} />
        <Box>
          <ButtonWithIcon onClick={() => dispatch(taskGroupAddModal(true))} title='Add task group' size='medium' marginRight='10px' />
          <ButtonWithIcon onClick={() => dispatch(taskAddModal(true))} title='Add task' size='medium' />
        </Box>
      </Box>

      <Box mx='30px'>{taskGroupsAndTasks.length > 0 && <TaskTable onAddTask={addTaskModal} onEditTaskGroup={editTaskGroup} taskGroupsAndTasks={taskGroupsAndTasks} onEditTask={editTask} />}</Box>
      <AddTaskGroup isOpen={isTaskGroupAddModal} onClose={() => dispatch(taskGroupAddModal(false))} errorMessages={errorMessages} isInvalid={isInvalid} onChangeInput={onChange} onAddTaskGroup={handleAddTaskGroup} />
      <EditTaskGroup
        deleteTaskGroupModal={() => {
          dispatch(taskGroupEditModal(false))
          dispatch(taskGroupDeleteModal(true))
        }}
        inputFields={inputFieldsEdit}
        isOpen={isTaskGroupEditModal}
        onClose={() => dispatch(taskGroupEditModal(false))}
        errorMessage={errorMessagesEdit}
        isInvalid={isInvalidEdit}
        onEditTaskGroup={handleEditTaskGroup}
        onChangeInput={onChangeEdit}
      />
      <DeleteTaskGroup taskGroupName={inputFieldsEdit.name} onDeleteTaskGroup={deleteTaskGroupModal} onClose={() => dispatch(taskGroupDeleteModal(false))} isOpen={isTaskGroupDeleteModal} />
      <AddTask isOpen={isTaskAddModal} onAddTask={handleAddTask} onChangeInput={onChangeTask} onClose={() => dispatch(taskAddModal(false))} isInvalid={isInvalidTask} errorMessage={errorMessagesTask} onSelect={handleOptionSelect} selectedOption={selectedOption} options={taskGroupsAndTasks} showOption='name' />
      <EditTask
        deleteTaskModal={() => {
          dispatch(taskEditModal(false))
          dispatch(taskDeleteModal(true))
        }}
        inputFields={inputFieldsTaskEdit}
        isOpen={isTaskEditModal}
        onEditTask={handleEditTask}
        onChangeInput={onChangeTaskEdit}
        onClose={() => dispatch(taskEditModal(false))}
        isInvalid={isInvalidTaskEdit}
        errorMessage={errorMessagesTaskEdit}
        onSelect={handleEditOptionSelect}
        selectedOption={selectedOption}
        options={taskGroupsAndTasks}
        showOption='name'
      />
      <DeleteTask isOpen={isTaskDeleteModal} onClose={() => dispatch(taskDeleteModal(false))} onDeleteTask={handleDeleteTask} />
    </>
  )
}

export default Task
