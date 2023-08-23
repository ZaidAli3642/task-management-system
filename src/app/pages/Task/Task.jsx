import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@chakra-ui/react'

import Breadcrumbs from '../../components/Breadcrumbs'
import { ButtonWithIcon } from '../../components/Form'
import taskBreadcrumb from './taskBreakcrumbs'
import TaskTable from '../../components/Table/Task/Task'
import { addTaskGroup, deleteTaskGroup, fetchTaskGroup, taskGroupAddModal, taskGroupDeleteModal, taskGroupEditModal, editTaskGroup as editTaskGroupAction } from '../../redux/reducers/taskGroup/taskGroup'
import AddTaskGroup from '../../components/Modal/TaskGroup/AddTaskGroup'
import useForm from '../../hooks/useForm'
import EditTaskGroup from '../../components/Modal/TaskGroup/EditTaskGroup'
import DeleteTaskGroup from '../../components/Modal/TaskGroup/DeleteTaskGroup'
import taskGroupSchema from '../../validations/taskGroupSchema'

const Task = () => {
  const dispatch = useDispatch()
  const taskGroupsAndTasks = useSelector(state => state.taskGroup.taskGroupsAndTasks)
  const isTaskGroupAddModal = useSelector(state => state.taskGroup.taskGroupAddModal)
  const isTaskGroupEditModal = useSelector(state => state.taskGroup.taskGroupEditModal)
  const isTaskGroupDeleteModal = useSelector(state => state.taskGroup.taskGroupDeleteModal)
  const [taskGroupId, setTaskGroupId] = useState('')
  const [errorMessages, isInvalid, inputFields, , , onChange, onSubmit] = useForm({ name: '' })
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
    await onSubmit(taskGroupSchema, () => dispatch(addTaskGroup({ taskGroup: inputFields })))
  }

  const handleEditTaskGroup = async () => {
    await onSubmitEdit(taskGroupSchema, () => dispatch(editTaskGroupAction({ updatedTaskGroup: inputFieldsEdit, taskGroupId: taskGroupId })))
    dispatch(taskGroupEditModal(false))
  }

  const handleDeleteTaskGroup = () => {
    dispatch(deleteTaskGroup({ taskGroupId: taskGroupId }))
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
          <ButtonWithIcon title='Add task' size='medium' />
        </Box>
      </Box>

      <Box mx='30px'>{taskGroupsAndTasks.length > 0 && <TaskTable onEditTaskGroup={editTaskGroup} taskGroupsAndTasks={taskGroupsAndTasks} />}</Box>
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
    </>
  )
}

export default Task
