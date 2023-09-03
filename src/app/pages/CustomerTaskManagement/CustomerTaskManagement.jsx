import { useEffect, useState } from 'react'
import { Box, useToast } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

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
import { getActiveCustomers } from '../../redux/reducers/customer/customer'
import DropDown from '../../components/DropDown'
import { addResponsibleModal, bulkAssignModal, fetchTaskGroupWithSchedules, fetchTaskGroupWithSchedulesSuccess, addResponsible as addResponsibleAction, editResponsibleModal, addNoteModal, editNoteModal, addEditRemoveNote, fetchCustomersWithTaskGroup, repeatModal, manageRepetition, fetchCustomersWithTaskGroupSuccess, clearSectionModal, clearSection, bulkAssign, editRepeatModal, setPerPage, setPageCount, setPageNo, clientInfoModal } from '../../redux/reducers/customerTaskManagement/customerTaskManagement'
import { activeEmployeeFetch } from '../../redux/reducers/employee/employees'
import useForm from '../../hooks/useForm'
import addResponsible from '../../validations/addResponsible'
import noteSchema from '../../validations/noteSchema'
import AllCustomerTaskManagement from '../../components/Table/AllCustomerTaskManagement/AllCustomerTaskManagement'
import repeatWeeklySchema from '../../validations/repeatWeeklySchema'
import repeatMonthlySchema from '../../validations/repeatMontlySchema'
import bulkAssignSchema from '../../validations/bulkAssignSchema'
import EditRepeat from '../../components/Modal/CustomerTaskManagement/EditRepeat'
import { getDate, getDay, getMonth, getWeekNo } from '../../utils/taskManagement'
import Pagination from '../../components/Pagination/Pagination'
import ClientInfo from '../../components/Modal/ClientInfo'

const CustomerTaskManagement = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()
  const activeCustomers = useSelector(state => state.customers.activeCustomers)
  const activeEmployees = useSelector(state => state.employees.activeEmployees)
  const { clientInfoModal: isClientInfoModal, clientInfo, taskGroupWithSchedules, customersWithTaskGroup, bulkAssignModal: isBulkAssignModal, taskGroups, tasks, responsibles, addResponsibleModal: isAddResponsibleModal, editResponsibleModal: isEditResponsibleModal, addNoteModal: isAddNoteModal, editNoteModal: isEditNoteModal, repeatModal: isRepeatModal, clearSectionModal: isClearSectionModal, editRepeatModal: isEditRepeatModal, perPage, pageCount, pageNo, perPageCustomersWithTaskGroup, perPageTaskGroupWithSchedules } = useSelector(state => state.customerTaskManagement)
  const [taskGroupsFilter, setTaskGroupsFilter] = useState([])
  const [tasksFilter, setTasksFilter] = useState([])
  const [responsiblesFilter, setResponsiblesFilter] = useState([])
  const [selectedCustomerOption, setSelectedCustomerOption] = useState('')
  const [customer, setCustomer] = useState(null)
  const [taskGroup, setTaskGroup] = useState(null)
  const [task, setTask] = useState(null)
  const [responsibleSelectedOption, setResponsibleSelectedOption] = useState(null)
  const [taskGroupSort, setTaskGroupSort] = useState('desc')
  const [customersSort, setCustomersSort] = useState('desc')
  const [repetitionType, setRepetitionType] = useState('')
  const [repetitionWeeklyDays, setRepetitionWeeklyDays] = useState([])
  const [monthlyRadio, setMonthlyRadio] = useState(1)
  const [yearlyRadio, setYearlyRadio] = useState(1)
  const [clearSectionButtonEnabled, setClearSectionButtonEnabled] = useState(false)
  const [bulkAssignErrorMessage, setBulkAssignErrorMessage] = useState({ note: '', repetitionWeeklyNo: '', repetitionMonthlyNo: '', responsibleId: '' })
  const [isInvalidBulkAssign, setIsInvalidBulkAssign] = useState(false)
  const [errorMessagesResponsible, isInvalidResponsible, inputFieldsResponsible, setInputFieldsResponsible, , onChangeResponsible, onSubmitResponsible] = useForm({ id: '', first_name: '' })
  const [errorMessagesNote, isInvalidNote, inputFieldsNote, setInputFieldsNote, , onChangeNote, onSubmitNote] = useForm({ note: '' })
  const [errorMessagesWeekly, isInvalidWeekly, inputFieldsWeekly, setInputFieldsWeekly, , onChangeWeekly, onSubmitWeekly] = useForm({ repetitionWeeklyNo: '1' }, {})
  const [errorMessagesMonthly, isInvalidMonthly, inputFieldsMonthly, setInputFieldsMonthly, , onChangeMonthly, onSubmitMonthly] = useForm({ repetitionMonthlyNo: '1', repetitionMonthlyWeekDay: { id: 1, day: 'Monday' }, repetitionMonthlyWeekNo: { id: 1, week: 'First' }, repetitionMonthlyDate: { id: 1, label: '1st' } }, {})
  const [errorMessagesYearly, isInvalidYearly, inputFieldsYearly, setInputFieldsYearly, , onChangeYearly, onSubmitYearly] = useForm({ repetitionYearlyWeekNo: { id: 1, week: 'First' }, repetitionYearlyMonth: { id: 1, month: 'January' }, repetitionYearlyMonthDate: { id: 1, label: '1st' }, repetitionYearlyDay: { id: 1, day: 'Monday' } }, {})
  const { state } = useLocation()

  const isCustomerAll = () => (selectedCustomerOption === 'All' ? true : false)

  const selectCustomer = customer => {
    dispatch(setPageNo({ pageNo: 0 }))
    setSelectedCustomerOption(customer.name)
    setCustomer(customer)
    selectFetchApi(customer)
  }

  const changeSortingOrder = (order, onChangeOrder) => {
    if (order === 'desc') {
      onChangeOrder('asc')
    } else {
      onChangeOrder('desc')
    }
  }

  const sortCustomers = () => {
    let sortedCustomersWithTaskGroups
    changeSortingOrder(customersSort, setCustomersSort)
    sortedCustomersWithTaskGroups = _.orderBy(customersWithTaskGroup, ['name'], customersSort)

    dispatch(fetchCustomersWithTaskGroupSuccess(sortedCustomersWithTaskGroups))
  }

  const sortTaskGroup = () => {
    let sortedTaskGroupsWithSchedules
    changeSortingOrder(taskGroupSort, setTaskGroupSort)

    if (customer.name === 'All') {
      let customerWithTaskGroupsCopy = [...customersWithTaskGroup]
      const sortedByTaskGroup = _.map(customerWithTaskGroupsCopy, customer => ({
        ...customer,
        taskGroups: _.orderBy(customer.taskGroups, ['name'], taskGroupSort),
      }))

      dispatch(fetchCustomersWithTaskGroupSuccess(sortedByTaskGroup))
    } else {
      sortedTaskGroupsWithSchedules = _.orderBy(taskGroupWithSchedules, ['name'], taskGroupSort)

      dispatch(fetchTaskGroupWithSchedulesSuccess(sortedTaskGroupsWithSchedules))
    }
  }

  const selectFetchApi = (option, taskGroupsFilter, selectedTasks, selectedResponsibles) => {
    if (option.name === 'All') {
      dispatch(fetchCustomersWithTaskGroup({ customerId: option?.id, selectedTaskGroups: taskGroupsFilter, selectedTasks, selectedResponsibles, pageNo, isCustomerAll: true }))
    } else {
      dispatch(fetchTaskGroupWithSchedules({ customerId: option?.id, selectedTaskGroups: taskGroupsFilter, selectedTasks, selectedResponsibles, pageNo, isCustomerAll: false }))
    }
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

    selectFetchApi(customer, taskGroups, tasksFilter, responsiblesFilter)
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
    selectFetchApi(customer, taskGroupsFilter, tasks, responsiblesFilter)
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
    selectFetchApi(customer, taskGroupsFilter, tasksFilter, responsibles)
  }

  const handleFilters = (checked, key, item) => {
    if (key === 'taskGroup') return handleTaskGroupsFilter(checked, item)
    if (key === 'tasks') return handleTaskFilter(checked, item)
    if (key === 'responsibles') return handleResponsiblesFilter(checked, item)
  }

  const openBulkAssign = taskGroup => {
    const found = taskGroup.tasks.find(task => task.task_item !== null)
    setClearSectionButtonEnabled(found ? true : false)
    setTaskGroup(taskGroup)
    dispatch(bulkAssignModal(true))
  }

  const openClearSectionModal = () => {
    dispatch(bulkAssignModal(false))
    dispatch(clearSectionModal(true))
  }

  const clearSections = () => {
    const data = {
      task_group_id: taskGroup.id,
      customer_id: customer.id,
    }
    dispatch(clearSection({ data, customerId: customer.id, isCustomerAll: isCustomerAll() }))
  }

  const handleBulkAssignSubmit = async () => {
    if (!repetitionType)
      return toast({
        title: 'Bulk assign failed',
        description: 'You need to select a repetition',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    const validateData = {
      note: inputFieldsNote.note,
      repetitionMonthlyNo: inputFieldsMonthly.repetitionMonthlyNo,
      repetitionWeeklyNo: inputFieldsWeekly.repetitionWeeklyNo,
      responsibleId: inputFieldsResponsible.id,
    }
    const data = {
      task_group_id: taskGroup.id,
      customer_id: customer.id,
      repetition_type: repetitionType,
      repetition_yearly_month: inputFieldsYearly.repetitionYearlyMonth.id,
      repetition_weekly_no: inputFieldsWeekly.repetitionWeeklyNo,
      repetition_monthly_no: inputFieldsMonthly.repetitionMonthlyNo,
      repetition_weekly_days: JSON.stringify(repetitionWeeklyDays.sort()),
      responsible_role: !inputFieldsResponsible.id ? inputFieldsResponsible.first_name : 'employee',
      responsible_id: inputFieldsResponsible.id,
      notes: inputFieldsNote.note,
    }

    setMonthlyRepetitionData(monthlyRadio, data)
    setYearlyRepetitionData(yearlyRadio, data)

    try {
      setBulkAssignErrorMessage({})
      setIsInvalidBulkAssign(false)
      await bulkAssignSchema.validate(validateData)

      dispatch(bulkAssign({ data, customerId: customer.id, isCustomerAll: isCustomerAll(), inputFieldsSet: { setInputFieldsNote, setInputFieldsResponsible, setRepetitionType, setResponsibleSelectedOption } }))
    } catch (error) {
      if (error.name === 'ValidationError') {
        setIsInvalidBulkAssign(true)
        setBulkAssignErrorMessage(prevState => ({ ...prevState, [error.path]: error.message }))
      }
    }
  }

  const changeEditWeeklyRepetition = ({ repetition_type, repetition_weekly_no, repetition_weekly_days }) => {
    if (repetition_type !== 'weekly') return

    handleOnChangeWeekly({ target: { value: repetition_weekly_no, name: 'repetitionWeeklyNo' } })
    setRepetitionWeeklyDays(repetition_weekly_days)
  }

  const changeEditMonthlyRepetition = ({ repetition_type, repetition_monthly_no, repetition_monthly_date, repetition_monthly_week_day, repetition_monthly_week_no }) => {
    if (repetition_type !== 'monthly') return

    setMonthlyRadio(1)
    handleOnChangeMonthly({ target: { value: repetition_monthly_no, name: 'repetitionMonthlyNo' } })
    if (repetition_monthly_date) handleOnChangeMonthly({ target: { value: { id: repetition_monthly_date, label: getDate(repetition_monthly_date).label }, name: 'repetitionMonthlyDate' } })
    else {
      setMonthlyRadio(2)
      handleOnChangeMonthly({ target: { value: { id: repetition_monthly_week_day, day: getDay(repetition_monthly_week_day).day }, name: 'repetitionMonthlyWeekDay' } })
      handleOnChangeMonthly({ target: { value: { id: repetition_monthly_week_no, week: getWeekNo(repetition_monthly_week_no).week }, name: 'repetitionMonthlyWeekNo' } })
    }
  }

  const changeEditYearlyRepetition = ({ repetition_type, repetition_yearly_month_date, repetition_yearly_day, repetition_yearly_week_no, repetition_yearly_month }) => {
    if (repetition_type !== 'yearly') return
    setYearlyRadio(1)

    if (repetition_yearly_month_date) {
      handleOnChangeYearly({ target: { value: { id: repetition_yearly_month_date, label: getDate(repetition_yearly_month_date).label }, name: 'repetitionYearlyMonthDate' } })
    } else {
      setYearlyRadio(2)
      handleOnChangeYearly({ target: { value: { id: repetition_yearly_day, day: getDay(repetition_yearly_day).day }, name: 'repetitionYearlyDay' } })
      handleOnChangeYearly({ target: { value: { id: repetition_yearly_week_no, week: getWeekNo(repetition_yearly_week_no).week }, name: 'repetitionYearlyWeekNo' } })
    }
    handleOnChangeYearly({ target: { value: { id: repetition_yearly_month, month: getMonth(repetition_yearly_month).month }, name: 'repetitionYearlyMonth' } })
  }
  const onEditRepetition = task => {
    const tasksRepetition = task?.task_item?.tasks_repetition
    if (!tasksRepetition) return
    setRepetitionType(tasksRepetition?.repetition_type)
    changeEditWeeklyRepetition(tasksRepetition)
    changeEditMonthlyRepetition(tasksRepetition)
    changeEditYearlyRepetition(tasksRepetition)
  }

  const selectStates = (taskGroup, task) => {
    setTaskGroup(taskGroup)
    setTask(task)
  }

  const handleNoteToggle = (taskGroup, task, edit) => {
    if (edit) {
      onChangeNote({ target: { name: 'note', value: task?.task_item.notes } })
      dispatch(editNoteModal(true))
    } else {
      onChangeNote({ target: { name: 'note', value: '' } })
      dispatch(addNoteModal(true))
    }

    selectStates(taskGroup, task)
  }

  const handleNoteChange = e => {
    onChangeNote(e)
  }

  const handleNoteSubmit = async isDelete => {
    const data = {
      notes: isDelete ? null : inputFieldsNote.note,
      task_group_id: taskGroup.id,
      task_id: task.id,
      customer_id: customer.id,
    }

    await onSubmitNote(noteSchema, () => {
      dispatch(addEditRemoveNote({ data, customerId: customer.id, isCustomerAll: isCustomerAll() }))
      dispatch(editNoteModal(false))
      dispatch(addNoteModal(false))
    })
  }

  const handleResponsibleToggle = (taskGroup, task, edit) => {
    if (edit) {
      const { id, first_name } = task.task_item.responsible
      handleAddResponsibleSelection({ id: id, first_name: first_name })
      dispatch(editResponsibleModal(true))
    } else {
      setResponsibleSelectedOption(null)
      dispatch(addResponsibleModal(true))
    }
    selectStates(taskGroup, task)
  }

  const handleAddResponsibleSelection = option => {
    onChangeResponsible({ target: { value: option.id, name: 'id' } })
    onChangeResponsible({ target: { value: option.first_name, name: 'first_name' } })
    setResponsibleSelectedOption(option.first_name)
  }

  const handleSubmitResponsible = async isDelete => {
    const data = {
      customer_id: customer.id,
      responsible_id: isDelete ? null : inputFieldsResponsible.id,
      responsible_role: !inputFieldsResponsible.id ? inputFieldsResponsible.first_name : 'employee',
      task_group_id: taskGroup.id,
      task_id: task.id,
    }
    await onSubmitResponsible(addResponsible, () => {
      dispatch(addResponsibleAction({ data, customerId: customer?.id, isCustomerAll: isCustomerAll() }))
    })
  }

  const handleOpenRepeatModal = (taskGroup, task) => {
    selectStates(taskGroup, task)
    dispatch(repeatModal(true))
  }

  const handleOpenEditRepeatModal = (taskGroup, task) => {
    onEditRepetition(task)
    selectStates(taskGroup, task)
    dispatch(editRepeatModal(true))
  }

  const handleOnChangeWeekly = e => {
    const { target } = e
    if (target.name === 'repetitionWeeklyDays') {
      target.checked ? setRepetitionWeeklyDays([...repetitionWeeklyDays, target.value]) : setRepetitionWeeklyDays([...repetitionWeeklyDays.filter(r => r !== target.value)])
    } else {
      onChangeWeekly(e)
    }
  }

  const handleWeeklyRepetition = () => {
    const data = {
      task_group_id: taskGroup.id,
      task_id: task.id,
      customer_id: customer.id,
      repetition_type: repetitionType,
      repetition_weekly_no: inputFieldsWeekly.repetitionWeeklyNo,
      repetition_weekly_days: JSON.stringify(repetitionWeeklyDays.sort()),
    }

    onSubmitWeekly(repeatWeeklySchema, () => {
      dispatch(manageRepetition({ data, customerId: customer.id, isCustomerAll: isCustomerAll() }))
    })
  }

  const handleOnChangeMonthly = e => {
    onChangeMonthly(e)
  }

  const setMonthlyRepetitionData = (radioOption, data) => {
    if (radioOption === 1) {
      data.repetition_monthly_date = inputFieldsMonthly.repetitionMonthlyDate.id
    } else {
      data.repetition_monthly_week_no = inputFieldsMonthly.repetitionMonthlyWeekNo.id
      data.repetition_monthly_week_day = inputFieldsMonthly.repetitionMonthlyWeekDay.id
    }
  }

  const handleMonthlyRepetition = async () => {
    const data = {
      task_group_id: taskGroup.id,
      task_id: task.id,
      customer_id: customer.id,
      repetition_type: repetitionType,
      repetition_monthly_no: inputFieldsMonthly.repetitionMonthlyNo,
    }

    setMonthlyRepetitionData(monthlyRadio, data)

    await onSubmitMonthly(repeatMonthlySchema, () => dispatch(manageRepetition({ data, customerId: customer.id, isCustomerAll: isCustomerAll() })))
  }

  const handleOnChangeYearly = e => {
    onChangeYearly(e)
  }

  const setYearlyRepetitionData = (radioOption, data) => {
    if (radioOption === 1) {
      data.repetition_yearly_month_date = inputFieldsYearly.repetitionYearlyMonthDate.id
    } else {
      data.repetition_yearly_day = inputFieldsYearly.repetitionYearlyDay.id
      data.repetition_yearly_week_no = inputFieldsYearly.repetitionYearlyWeekNo.id
    }
  }

  const handleYearlyRepetition = async () => {
    const data = {
      task_group_id: taskGroup.id,
      task_id: task.id,
      customer_id: customer.id,
      repetition_type: repetitionType,
      repetition_yearly_month: inputFieldsYearly.repetitionYearlyMonth.id,
    }

    setYearlyRepetitionData(yearlyRadio, data)

    await onSubmitYearly(null, () => dispatch(manageRepetition({ data, customerId: customer.id, isCustomerAll: isCustomerAll() })))
  }

  const handleSubmitRepetition = () => {
    if (!repetitionType)
      return toast({
        title: 'Repetition failed',
        description: 'You need to select a repetition',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })

    if (repetitionType === 'weekly') return handleWeeklyRepetition()
    if (repetitionType === 'monthly') return handleMonthlyRepetition()
    if (repetitionType === 'yearly') return handleYearlyRepetition()
  }

  const handleOnChangePerPage = perPage => {
    dispatch(setPerPage({ perPage, isCustomerAll: isCustomerAll() }))
  }

  const handleChangePage = ({ selected }) => {
    dispatch(setPageNo({ pageNo: selected }))
    dispatch(setPageCount({ pageNo: selected, isCustomerAll: isCustomerAll() }))
  }

  useEffect(() => {
    if (state?.customerData) {
      selectCustomer(state?.customerData)
    }
  }, [])

  useEffect(() => {
    dispatch(getActiveCustomers())
    dispatch(activeEmployeeFetch())
  }, [])

  console.log('qwfsfnsalkfnkqjwn  : ', isClientInfoModal)

  return (
    <>
      <Box display='flex' alignItems='center' my='20px' mx='30px'>
        <Breadcrumbs onClick={() => navigate('/customers')} navigationLocation={customerTaskManagementBreadcrumbs} iconImage={assets.icons.employees} />
        <DropDown label={selectedCustomerOption || 'Select'} data={activeCustomers || []} optionKey='name' onSelectItem={selectCustomer} />
      </Box>

      <Box mx='30px'>
        {selectedCustomerOption === 'All' && <AllCustomerTaskManagement onOpenEditRepeat={handleOpenEditRepeatModal} onSortCustomers={sortCustomers} onOpenRepeat={(taskGroup, task) => handleOpenRepeatModal(taskGroup, task)} setCustomer={setCustomer} onOpenNoteModal={(taskGroup, task, edit) => handleNoteToggle(taskGroup, task, edit)} onOpenAddResponsible={(taskGroup, task, edit) => handleResponsibleToggle(taskGroup, task, edit)} responsiblesFilter={responsiblesFilter} taskGroupsFilter={taskGroupsFilter} tasksFilter={tasksFilter} onFilter={handleFilters} responsibles={responsibles} tasks={tasks} taskGroups={taskGroups} activeCustomers={activeCustomers} onOpenBulkAssign={openBulkAssign} data={perPageCustomersWithTaskGroup} onSortTaskGroup={sortTaskGroup} />}
        {selectedCustomerOption !== 'All' && <CustomerTaskManagementTable onOpenEditRepeat={handleOpenEditRepeatModal} onOpenRepeat={(taskGroup, task) => handleOpenRepeatModal(taskGroup, task)} onOpenNoteModal={(taskGroup, task, edit) => handleNoteToggle(taskGroup, task, edit)} onOpenAddResponsible={(taskGroup, task, edit) => handleResponsibleToggle(taskGroup, task, edit)} responsiblesFilter={responsiblesFilter} taskGroupsFilter={taskGroupsFilter} tasksFilter={tasksFilter} onFilter={handleFilters} responsibles={responsibles} tasks={tasks} taskGroups={taskGroups} activeCustomers={activeCustomers} onOpenBulkAssign={openBulkAssign} data={perPageTaskGroupWithSchedules} onSortTaskGroup={sortTaskGroup} />}
        {selectedCustomerOption && <Pagination pageNo={pageNo} pageCount={pageCount} perPage={perPage} onChangePerPage={handleOnChangePerPage} onChangePage={handleChangePage} />}
      </Box>

      <BulkAssign
        setRepetitionType={setRepetitionType}
        onAddBulkAssign={handleBulkAssignSubmit}
        errorMessagesNote={bulkAssignErrorMessage}
        onChangeNoteInput={handleNoteChange}
        inputFieldsYearly={inputFieldsYearly}
        onChangeYearly={handleOnChangeYearly}
        yearlyRadio={yearlyRadio}
        setYearlyRadio={setYearlyRadio}
        monthlyRadio={monthlyRadio}
        onChangeMonthly={handleOnChangeMonthly}
        setMonthlyRadio={setMonthlyRadio}
        errorMessagesMonthly={bulkAssignErrorMessage}
        inputFieldsMonthly={inputFieldsMonthly}
        onChangeWeekly={handleOnChangeWeekly}
        errorMessagesWeekly={bulkAssignErrorMessage}
        inputFieldsWeekly={inputFieldsWeekly}
        responsibleOptions={activeEmployees}
        errorMessagesResponsible={bulkAssignErrorMessage}
        onAddResponsible={handleSubmitResponsible}
        selectedOptionResponsible={responsibleSelectedOption}
        isInvalid={isInvalidBulkAssign}
        onSelectResponsible={data => handleAddResponsibleSelection(data)}
        onOpenClearSectionModal={openClearSectionModal}
        clearSectionButtonEnabled={clearSectionButtonEnabled}
        isOpen={isBulkAssignModal}
        onClose={() => dispatch(bulkAssignModal(false))}
      />
      <BulkAssignClearSections isOpen={false} />
      <ClearSection subHeading={taskGroup?.name} onClose={() => dispatch(clearSectionModal(false))} onClearSectionEmployee={clearSections} isOpen={isClearSectionModal} />
      <AddResponsible subHeading={task?.name} errorMessage={errorMessagesResponsible} onAddResponsible={handleSubmitResponsible} selectedOption={responsibleSelectedOption} isInvalid={isInvalidResponsible} onSelect={data => handleAddResponsibleSelection(data)} isOpen={isAddResponsibleModal} options={activeEmployees} showOption={'first_name'} onClose={() => dispatch(addResponsibleModal(false))} />
      <EditResponsible onDeleteResponsible={isDelete => handleSubmitResponsible(isDelete)} onEditResponsible={handleSubmitResponsible} selectedOption={responsibleSelectedOption} isInvalid={isInvalidResponsible} subHeading={task?.name} errorMessage={errorMessagesResponsible} onClose={() => dispatch(editResponsibleModal(false))} onSelect={data => handleAddResponsibleSelection(data)} isOpen={isEditResponsibleModal} options={activeEmployees} showOption={'first_name'} />
      <AddNote subHeading={task?.name} isInvalid={isInvalidNote} errorMessage={errorMessagesNote} onChangeInput={handleNoteChange} onAddNote={handleNoteSubmit} onClose={() => dispatch(addNoteModal(false))} isOpen={isAddNoteModal} />
      <EditNote subHeading={task?.name} onDeleteNote={isDelete => handleNoteSubmit(isDelete)} isInvalid={isInvalidNote} value={inputFieldsNote} errorMessage={errorMessagesNote} onChangeInput={handleNoteChange} onClose={() => dispatch(editNoteModal(false))} isOpen={isEditNoteModal} onEditNote={handleNoteSubmit} />
      <Repeat subHeading={task?.name} inputFieldsYearly={inputFieldsYearly} onChangeYearly={handleOnChangeYearly} yearlyRadio={yearlyRadio} setYearlyRadio={setYearlyRadio} monthlyRadio={monthlyRadio} onChangeMonthly={handleOnChangeMonthly} setMonthlyRadio={setMonthlyRadio} errorMessagesMonthly={errorMessagesMonthly} inputFieldsMonthly={inputFieldsMonthly} inputFieldsWeekly={inputFieldsWeekly} onSaveRepetition={handleSubmitRepetition} isInvalid={isInvalidWeekly || isInvalidMonthly} onChangeWeekly={handleOnChangeWeekly} errorMessagesWeekly={errorMessagesWeekly} setRepetitionType={setRepetitionType} onClose={() => dispatch(repeatModal(false))} isOpen={isRepeatModal} />
      <EditRepeat subHeading={task?.name} radioCheckedYearly={yearlyRadio} radioCheckedMonthly={monthlyRadio} repetitionWeeklyDays={repetitionWeeklyDays} repetitionType={repetitionType} inputFieldsYearly={inputFieldsYearly} onChangeYearly={handleOnChangeYearly} yearlyRadio={yearlyRadio} setYearlyRadio={setYearlyRadio} monthlyRadio={monthlyRadio} onChangeMonthly={handleOnChangeMonthly} setMonthlyRadio={setMonthlyRadio} errorMessagesMonthly={errorMessagesMonthly} inputFieldsMonthly={inputFieldsMonthly} inputFieldsWeekly={inputFieldsWeekly} onSaveRepetition={handleSubmitRepetition} isInvalid={isInvalidWeekly || isInvalidMonthly} onChangeWeekly={handleOnChangeWeekly} errorMessagesWeekly={errorMessagesWeekly} setRepetitionType={setRepetitionType} onClose={() => dispatch(editRepeatModal(false))} isOpen={isEditRepeatModal} />
      <ClientInfo isOpen={isClientInfoModal} onClose={() => dispatch(clientInfoModal(false))} clientInfo={clientInfo} />
    </>
  )
}

export default CustomerTaskManagement
