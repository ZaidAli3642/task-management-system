import { Box } from '@chakra-ui/react'
import Breadcrumbs from '../../components/Breadcrumbs'
import DropDown from '../../components/DropDown'
import employeeTaskManagementBreadcrumb from './employeeTaskManagementBreadcrumb'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clientInfo, clientInfoModal, fetchAllCustomers, fetchAllEmployees, fetchTaskForEmployees, fetchTaskForEmployeesAllCustomers, fetchTaskForEmployeesAllCustomersSuccess, fetchTaskForEmployeesSuccess, noteModal, setPageCount, setPerPage, updateTaskByEmployee } from '../../redux/reducers/employeeTaskManagement/employeeTaskManagement'
import EmployeeTaskManagementTable from '../../components/Table/EmployeeTaskManagement/EmployeeTaskManagement'
import { generateWeeksInYear } from '../../utils/dates'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import useFilter from '../../hooks/useFilter'
import Pagination from '../../components/Pagination/Pagination'
import _ from 'lodash'
import Note from '../../components/Modal/EmployeeTaskManagement/Note'
import ClientInfo from '../../components/Modal/ClientInfo'

const EmployeeTaskManagement = () => {
  const dispatch = useDispatch()
  const { state } = useLocation()
  const { allCustomers, allEmployees, taskForEmployees, taskForEmployeesAllCustomers, noteText, taskGroups, tasks, perPage, pageCount, perPageAllCustomerTaskEmployees, noteModal: isNoteModal, clientInfoModal: isClientInfoModal, clientInfo } = useSelector(state => state.employeeTaskManagement)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [shouldRun, setShouldRun] = useState(false)
  const [pageNo, setPageNo] = useState(0)
  const [sortOrderTimestamp, setSortOrderTimestamp] = useState('desc')
  const [selectedYear, setSelectedYear] = useState(moment().year())
  const [weekNumber, setWeekNumber] = useState(null)
  const solvedUnSolvedFilters = [
    { id: 1, value: 'solved', name: 'Solved' },
    { id: 3, value: 'unsolved', name: 'Unsolved' },
  ]
  const [filters, filterIds, onChangeFilters, onClearKeyValues] = useFilter({
    week: [],
    taskGroup: [],
    task: [],
    solvedUnsolved: [],
  })
  const allWeeksInYear = useMemo(() => {
    const allWeeks = generateWeeksInYear(selectedYear)
    const weekNo = moment().week()
    const currentWeek = allWeeks.find(week => week.week === weekNo)
    setWeekNumber(weekNo)
    setFilters(currentWeek, true, 'week')
    localStorage.setItem('weekNo', weekNo)
    return allWeeks
  }, [selectedYear])

  function setFilters(data, checked, key, isPreviousRemove = false) {
    onChangeFilters({ target: { key, checked, value: data, isPreviousRemove } })
  }

  const changeSortingOrder = (order, onChangeOrder) => {
    if (order === 'desc') {
      onChangeOrder('asc')
    } else {
      onChangeOrder('desc')
    }
  }

  const sortByTimeStamp = () => {
    const data = isCustomerAll() ? perPageAllCustomerTaskEmployees : taskForEmployees
    changeSortingOrder(sortOrderTimestamp, setSortOrderTimestamp)
    const sortedData = _.map(data, customerTask => {
      return {
        ...customerTask,
        currentTasks: _.orderBy(customerTask.currentTasks, ['done_at'], sortOrderTimestamp),
        futureTasks: _.orderBy(customerTask.futureTasks, ['done_at'], sortOrderTimestamp),
        pastTasks: _.orderBy(customerTask.pastTasks, ['done_at'], sortOrderTimestamp),
      }
    })

    if (isCustomerAll()) {
      dispatch(fetchTaskForEmployeesAllCustomersSuccess(sortedData))
      dispatch(setPageCount({ pageNo: pageNo }))
    } else {
      dispatch(fetchTaskForEmployeesSuccess(sortedData))
    }
  }

  const selectEmployeeOption = option => {
    setSelectedEmployee(option)
  }

  const selectCustomerOption = option => {
    setSelectedCustomer(option)
  }

  const selectYear = option => {
    setSelectedYear(Number(option))
  }

  const fetchTaskData = (employeeId, customerId, filters) => {
    dispatch(fetchTaskForEmployees({ responsibleId: employeeId, customerId: customerId, filters }))
  }

  const fetchTaskDataAllCustomer = (employeeId, filters, pageNo) => {
    dispatch(fetchTaskForEmployeesAllCustomers({ responsibleId: employeeId, filters, pageNo }))
  }

  const isCustomerAll = () => selectedCustomer?.id === null

  const changeSolvedUnsolved = (taskItemId, weekNo, weekDay, checked, completionStatus, occurance_date) => {
    const data = {
      task_item_id: taskItemId,
      week_no: weekNo,
      week_day: weekDay,
      completion_status: checked ? completionStatus : null,
      occurance_date: occurance_date,
    }
    dispatch(updateTaskByEmployee({ data, pageNo, isCustomerAll: isCustomerAll(), responsibleId: selectedEmployee?.id, customerId: selectedCustomer?.id, filters: { ...filterIds, year: selectedYear, weekNumber } }))
  }

  const handleChangePage = ({ selected }) => {
    setPageNo(selected)
    dispatch(setPageCount({ pageNo: selected }))
  }

  const handleChangePerPage = perPage => {
    dispatch(setPerPage({ perPage }))
  }

  useEffect(() => {
    dispatch(fetchAllEmployees())
    dispatch(fetchAllCustomers())
    if (state?.employeeData && state?.customerData) {
      // fetchTaskData(state?.employeeData.id, state?.customerData.id, { ...filterIds, year: selectedYear, weekNumber })
      setSelectedEmployee(state.employeeData)
      setSelectedCustomer(state.customerData)
    }

    setShouldRun(true)
  }, [])

  useEffect(() => {
    if (!selectedCustomer?.id && selectedEmployee) {
      return fetchTaskDataAllCustomer(selectedEmployee?.id, { ...filterIds, year: selectedYear, weekNumber }, pageNo)
    }

    if (shouldRun) {
      console.log('Hiiiiiii', shouldRun)
      fetchTaskData(selectedEmployee?.id, selectedCustomer?.id, { ...filterIds, year: selectedYear, weekNumber })
    }
  }, [selectedCustomer, selectedEmployee, filters])

  return (
    <>
      <Box display='flex' alignItems='center' my='20px' mx='30px'>
        <Breadcrumbs onClick={() => navigate('/customers')} navigationLocation={employeeTaskManagementBreadcrumb} />
        <DropDown label={selectedEmployee?.first_name || 'Select'} data={allEmployees || []} optionKey='first_name' onSelectItem={option => selectEmployeeOption(option)} />
        <DropDown label={selectedCustomer?.name || 'Select'} data={allCustomers || []} optionKey='name' onSelectItem={option => selectCustomerOption(option)} />
      </Box>
      <Box mx='30px'>
        <EmployeeTaskManagementTable weekNumber={weekNumber} setWeekNumber={setWeekNumber} onSortByTimeStamp={sortByTimeStamp} filters={filters} onChangeSolvedUnSolved={changeSolvedUnsolved} filterIds={filterIds} solvedUnSolvedFilters={solvedUnSolvedFilters} onClearKeyValues={onClearKeyValues} setFilters={setFilters} taskGroupsFilter={taskGroups} tasksFilter={tasks} data={selectedCustomer?.id ? taskForEmployees : perPageAllCustomerTaskEmployees} selectYear={selectYear} allWeeksInYear={allWeeksInYear} selectedYear={selectedYear} />
        {selectedCustomer?.id === null && <Pagination pageNo={pageNo} onChangePerPage={handleChangePerPage} pageCount={pageCount} perPage={perPage} onChangePage={handleChangePage} />}
      </Box>

      <Note isOpen={isNoteModal} onClose={() => dispatch(noteModal(false))} noteText={noteText} />
      <ClientInfo isOpen={isClientInfoModal} onClose={() => dispatch(clientInfoModal(false))} clientInfo={clientInfo} />
    </>
  )
}

export default EmployeeTaskManagement
