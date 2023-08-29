import { Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import customerTaskManagementBreadcrumbs from './customerTaskManagementBreadcrumbs'
import assets from '../../assets/assets'
import CustomerTaskManagementTable from '../../components/Table/CustomerTaskManagement/CustomerTaskManagement'
import BulkAssign from '../../components/Modal/CustomerTaskManagement/BulkAssign'
import BulkAssignClearSections from '../../components/Modal/CustomerTaskManagement/BuldAssignClearSections'
import ClearSection from '../../components/Modal/CustomerTaskManagement/ClearSection'
import AddResponsible from '../../components/Modal/CustomerTaskManagement/AddResponsible'
import EditResponsible from '../../components/Modal/CustomerTaskManagement/EditResponsible'
import AddNote from '../../components/Modal/CustomerTaskManagement/AddNote'
import EditNote from '../../components/Modal/CustomerTaskManagement/EditNote'
import Repeat from '../../components/Modal/CustomerTaskManagement/Repeat'
import { useEffect, useState } from 'react'
import { getActiveCustomers } from '../../redux/reducers/customer/customer'
import { useDispatch, useSelector } from 'react-redux'
import DropDown from '../../components/DropDown'
import { addResponsibleModal, bulkAssignModal, fetchTaskGroupWithSchedules, fetchTaskGroupWithSchedulesSuccess, addResponsible as addResponsibleAction } from '../../redux/reducers/customerTaskManagement/customerTaskManagement'
import _ from 'lodash'
import { activeEmployeeFetch } from '../../redux/reducers/employee/employees'
import useForm from '../../hooks/useForm'
import addResponsible from '../../validations/addResponsible'

const CustomerTaskManagement = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const activeCustomers = useSelector(state => state.customers.activeCustomers)
  const activeEmployees = useSelector(state => state.employees.activeEmployees)
  const { taskGroupWithSchedules, bulkAssignModal: isBulkAssignModal, taskGroups, tasks, responsibles, addResponsibleModal: isAddResponsibleModal } = useSelector(state => state.customerTaskManagement)
  const [taskGroupsFilter, setTaskGroupsFilter] = useState([])
  const [tasksFilter, setTasksFilter] = useState([])
  const [responsiblesFilter, setResponsiblesFilter] = useState([])
  const [selectedCustomerOption, setSelectedCustomerOption] = useState('')
  const [customer, setCustomer] = useState(null)
  const [taskGroup, setTaskGroup] = useState(null)
  const [task, setTask] = useState(null)
  const [responsibleSelectedOption, setResponsibleSelectedOption] = useState(null)
  const [taskGroupSort, setTaskGroupSort] = useState('desc')
  const [errorMessagesResponsible, isInvalidResponsible, inputFieldsResponsible, , , onChangeResponsible, onSubmitResponsible] = useForm({ id: '', first_name: '' })

  const options = [{ name: 'Joe' }, { name: 'Marco' }, { name: 'Franco' }, { name: 'Customer' }]

  const selectCustomer = customer => {
    setSelectedCustomerOption(customer.name)
    setCustomer(customer)
    dispatch(fetchTaskGroupWithSchedules({ customerId: customer?.id, selectedTaskGroups: taskGroupsFilter }))
  }

  const sortTaskGroup = () => {
    let sortedTaskGroupsWithSchedules
    if (taskGroupSort === 'desc') {
      setTaskGroupSort('asc')
    } else {
      setTaskGroupSort('desc')
    }

    sortedTaskGroupsWithSchedules = _.orderBy(taskGroupWithSchedules, ['name'], taskGroupSort)

    dispatch(fetchTaskGroupWithSchedulesSuccess(sortedTaskGroupsWithSchedules))
  }

  const handleTaskGroupsFilter = (checked, item) => {
    let taskGroups = []
    if (checked) {
      setTaskGroupsFilter([...taskGroupsFilter, item.id])
      taskGroups = [...taskGroupsFilter, item.id]
    } else {
      const filters = taskGroupsFilter.filter(data => data !== item.id)
      taskGroups = filters
      setTaskGroupsFilter(filters)
    }

    dispatch(fetchTaskGroupWithSchedules({ customerId: customer?.id, selectedTaskGroups: taskGroups, selectedTasks: tasksFilter }))
  }

  const handleTaskFilter = (checked, item) => {
    let tasks = []
    if (checked) {
      setTasksFilter([...tasksFilter, item.id])
      tasks = [...tasksFilter, item.id]
    } else {
      const filters = tasksFilter.filter(data => data !== item.id)
      tasks = filters
      setTasksFilter(filters)
    }

    dispatch(fetchTaskGroupWithSchedules({ customerId: customer?.id, selectedTaskGroups: taskGroupsFilter, selectedTasks: tasks }))
  }

  const handleResponsiblesFilter = (checked, item) => {
    let responsibles = []
    if (checked) {
      setResponsiblesFilter([...responsiblesFilter, item.id])
      responsibles = [...responsiblesFilter, item.id]
    } else {
      const filters = responsiblesFilter.filter(data => data !== item.id)
      responsibles = filters
      setResponsiblesFilter(filters)
    }

    dispatch(fetchTaskGroupWithSchedules({ customerId: customer?.id, selectedTaskGroups: taskGroupsFilter, selectedTasks: tasksFilter, selectedResponsibles: responsibles }))
  }

  const handleFilters = (checked, key, item) => {
    if (key === 'taskGroup') return handleTaskGroupsFilter(checked, item)
    if (key === 'tasks') return handleTaskFilter(checked, item)
    if (key === 'responsibles') return handleResponsiblesFilter(checked, item)
  }

  const openBulkAssign = () => {
    dispatch(bulkAssignModal(true))
  }

  const handleAddResponsible = (taskGroup, task) => {
    dispatch(addResponsibleModal(true))
    setTaskGroup(taskGroup)
    setTask(task)
  }

  const handleAddResponsibleSelection = option => {
    onChangeResponsible({ target: { value: option.id, name: 'id' } })
    onChangeResponsible({ target: { value: option.first_name, name: 'first_name' } })
    setResponsibleSelectedOption(option.first_name)
  }

  const handleSubmitResponsible = async () => {
    const data = {
      customer_id: customer.id,
      responsible_id: inputFieldsResponsible.id,
      responsible_role: inputFieldsResponsible.first_name,
      task_group_id: taskGroup.id,
      task_id: task.id,
    }
    await onSubmitResponsible(addResponsible, () => dispatch(addResponsibleAction({ data })))
  }

  useEffect(() => {
    dispatch(getActiveCustomers())
    dispatch(activeEmployeeFetch())
  }, [])

  return (
    <>
      <Box display='flex' alignItems='center' my='20px' mx='30px'>
        <Breadcrumbs onClick={() => navigate('/customers')} navigationLocation={customerTaskManagementBreadcrumbs} iconImage={assets.icons.employees} />
        <DropDown label={selectedCustomerOption || 'Select'} data={activeCustomers || []} optionKey='name' onSelectItem={selectCustomer} />
      </Box>

      <Box mx='30px'>
        <CustomerTaskManagementTable onOpenAddResponsible={(taskGroup, task) => handleAddResponsible(taskGroup, task)} responsiblesFilter={responsiblesFilter} taskGroupsFilter={taskGroupsFilter} tasksFilter={tasksFilter} onFilter={handleFilters} responsibles={responsibles} tasks={tasks} taskGroups={taskGroups} activeCustomers={activeCustomers} onOpenBulkAssign={openBulkAssign} data={taskGroupWithSchedules} onSortTaskGroup={sortTaskGroup} />
      </Box>

      <BulkAssign isOpen={isBulkAssignModal} onClose={() => dispatch(bulkAssignModal(false))} />
      <BulkAssignClearSections isOpen={false} />
      <ClearSection isOpen={false} />
      <AddResponsible errorMessage={errorMessagesResponsible} onAddResponsible={handleSubmitResponsible} selectedOption={responsibleSelectedOption} isInvalid={isInvalidResponsible} onSelect={data => handleAddResponsibleSelection(data)} isOpen={isAddResponsibleModal} options={activeEmployees} showOption={'first_name'} onClose={() => dispatch(addResponsibleModal(false))} />
      <EditResponsible isOpen={false} options={options} showOption={'name'} />
      <AddNote isOpen={false} />
      <EditNote isOpen={false} />
      <Repeat isOpen={false} />
    </>
  )
}

// sx={{ 'span.chakra-radio__control[data-checked]': { background: 'red' } }}
// sx={{ 'span.chakra-radio__control[data-checked]': { backgroundColor: 'red' } }}

export default CustomerTaskManagement
