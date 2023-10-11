import { Box } from '@chakra-ui/react'
import Breadcrumbs from '../../components/Breadcrumbs'
import DropDown from '../../components/DropDown'
import employeeTaskManagementBreadcrumb from './employeeTaskManagementBreadcrumb'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clientInfo, clientInfoModal, fetchAllCustomers, fetchAllCustomersSuccess, fetchAllEmployees, fetchTaskForEmployees, fetchTaskForEmployeesAllCustomers, fetchTaskForEmployeesAllCustomersSuccess, fetchTaskForEmployeesSuccess, noteModal, setPageCount, setPerPage, updateTaskByEmployee } from '../../redux/reducers/employeeTaskManagement/employeeTaskManagement'
import EmployeeTaskManagementTable from '../../components/Table/EmployeeTaskManagement/EmployeeTaskManagement'
import { generateWeeksInYear } from '../../utils/dates'
import moment from 'moment'
import { Navigate, useLocation } from 'react-router-dom'
import useFilter from '../../hooks/useFilter'
import Pagination from '../../components/Pagination/Pagination'
import _ from 'lodash'
import Note from '../../components/Modal/EmployeeTaskManagement/Note'
import ClientInfo from '../../components/Modal/ClientInfo'

const EmployeeTaskManagement = () => {
  const dispatch = useDispatch()
  const { state } = useLocation()
  const tableRef = useRef()
  const { allCustomers, allEmployees, taskForEmployees, taskForEmployeesAllCustomers, noteText, taskGroups, tasks, perPage, pageCount, perPageAllCustomerTaskEmployees, noteModal: isNoteModal, clientInfoModal: isClientInfoModal, clientInfo } = useSelector(state => state.employeeTaskManagement)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [shouldRun, setShouldRun] = useState(false)
  const [pageNo, setPageNo] = useState(0)
  const [sortOrderTimestamp, setSortOrderTimestamp] = useState('desc')
  const [selectedYear, setSelectedYear] = useState(moment().year())
  const [task, setTask] = useState(null)
  const [weekNumber, setWeekNumber] = useState(null)
  const [filterChanged, setFilterChanged] = useState(false)
  const [changeFilter, setChangeFiler] = useState(true)
  const [showStickyFilter, setShowStickyFilter] = useState('')
  const [offsetTop, setTopOffset] = useState('')
  const [stickyText, setStickyText] = useState('')
  let stickyTextIndex = 2
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
    if (changeFilter) {
      setWeekNumber(weekNo)
      setFilters(currentWeek, true, 'week')
      setFilters(solvedUnSolvedFilters[1], true, 'solvedUnsolved', true)
      setChangeFiler(false)
    }
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
    dispatch(fetchTaskForEmployees({ responsibleId: employeeId, customerId: customerId, filters, setFilterChanged, filterChanged }))
  }

  const fetchTaskDataAllCustomer = (employeeId, filters, pageNo) => {
    dispatch(fetchTaskForEmployeesAllCustomers({ responsibleId: employeeId, filters, pageNo, setFilterChanged, filterChanged }))
  }

  const isCustomerAll = () => selectedCustomer?.id === null

  const changeSolvedUnsolved = (taskItemId, weekNo, weekDay, checked, completionStatus, occurance_date, isPast) => {
    const data = {
      task_item_id: taskItemId,
      week_no: weekNo,
      week_day: weekDay,
      completion_status: checked ? completionStatus : null,
      occurance_date: occurance_date,
    }
    dispatch(updateTaskByEmployee({ data, pageNo, isCustomerAll: isCustomerAll(), responsibleId: selectedEmployee?.id, customerId: selectedCustomer?.id, filters: { ...filterIds, year: selectedYear, weekNumber }, setFilterChanged, filterChanged, isPast }))
  }

  const handleChangePage = ({ selected }) => {
    setPageNo(selected)
    dispatch(setPageCount({ pageNo: selected }))
  }

  const handleChangePerPage = perPage => {
    dispatch(setPerPage({ perPage }))
  }

  const getTopOffset = () => {
    const tableFilter = document.getElementById('sticky-ref')
    return tableFilter.offsetTop
  }

  function getTopRow() {
    const table = tableRef.current
    const rows = table.querySelectorAll('tr')
    let visibleRows = []
    const offsetTop = getTopOffset()
    // let row
    let top = 105

    for (let i = 2; i < rows.length; i++) {
      const rowRect = rows[i].getBoundingClientRect()
      if (rowRect.top < window.innerHeight - 10 && rowRect.bottom > 0) {
        if (rowRect.top <= top) {
          const innerText = getInnerTextInRow(rows[i])
          visibleRows.push(innerText)
        }
      }
    }

    return visibleRows
  }

  function getInnerTextInRow(row) {
    const pTag = row.querySelector('p')
    return pTag ? pTag.textContent : null
  }

  const handleScroll = () => {
    const tableFilter = document.getElementById('sticky-ref')
    const offsetTop = tableFilter.offsetTop
    if (window.scrollY >= offsetTop) {
      const row = getTopRow()
      setStickyText(row.at(-1))
      if (!tableFilter.classList.contains('sticky-filters')) tableFilter.classList.add('sticky-filters')
      return
    }

    stickyTextIndex = 2
    setStickyText('')
    if (tableFilter.classList.contains('sticky-filters')) tableFilter.classList.remove('sticky-filters')
  }

  useEffect(() => {
    dispatch(fetchAllCustomersSuccess([]))
    dispatch(fetchAllEmployees())
    dispatch(fetchAllCustomers({ employeeId: state?.employeeData?.id }))
    if (state?.employeeData && state?.customerData) {
      setSelectedEmployee(state.employeeData)
      setSelectedCustomer(state.customerData)
    }

    setShouldRun(true)
  }, [])

  useEffect(() => {
    if (!selectedCustomer?.id && selectedEmployee) {
      return fetchTaskDataAllCustomer(selectedEmployee?.id, { ...filterIds, year: selectedYear, weekNumber }, pageNo, setFilterChanged)
    }

    if (shouldRun) {
      fetchTaskData(selectedEmployee?.id, selectedCustomer?.id, { ...filterIds, year: selectedYear, weekNumber }, setFilterChanged)
    }
  }, [selectedCustomer, selectedEmployee, filters])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    tableRef.current = document.getElementById('table-ref')
  }, [perPageAllCustomerTaskEmployees])

  if (!state?.employeeData) return <Navigate to='/employees' />
  if (!state?.customerData) return <Navigate to='/employees/customers' />

  return (
    <>
      <Box display='flex' alignItems='center' my='20px' mx='30px'>
        <Breadcrumbs navigationLocation={employeeTaskManagementBreadcrumb} navigationState={{ employeeData: selectedEmployee }} />
        <DropDown label={selectedEmployee?.first_name || 'Select'} data={allEmployees || []} optionKey='first_name' onSelectItem={option => selectEmployeeOption(option)} />
        <DropDown label={selectedCustomer?.name || 'Select'} data={allCustomers || []} optionKey='name' onSelectItem={option => selectCustomerOption(option)} />
      </Box>
      <Box mx='30px' mb={'32px'}>
        <EmployeeTaskManagementTable name={stickyText} onClearKeyValues={onClearKeyValues} filterChanged={filterChanged} setFilterChanged={setFilterChanged} setTask={setTask} sortOrderTimestamp={sortOrderTimestamp} weekNumber={weekNumber} setWeekNumber={setWeekNumber} onSortByTimeStamp={sortByTimeStamp} filters={filters} onChangeSolvedUnSolved={changeSolvedUnsolved} filterIds={filterIds} solvedUnSolvedFilters={solvedUnSolvedFilters} setFilters={setFilters} taskGroupsFilter={taskGroups} tasksFilter={tasks} data={selectedCustomer?.id ? taskForEmployees : perPageAllCustomerTaskEmployees} selectYear={selectYear} allWeeksInYear={allWeeksInYear} selectedYear={selectedYear} />
        {selectedCustomer?.id === null && <Pagination name='Task groups' totalItems={taskForEmployeesAllCustomers.length} pageNo={pageNo} onChangePerPage={handleChangePerPage} pageCount={pageCount} perPage={perPage} onChangePage={handleChangePage} />}
      </Box>

      <Note subHeading={task?.name} isOpen={isNoteModal} onClose={() => dispatch(noteModal(false))} noteText={noteText} />
      <ClientInfo isOpen={isClientInfoModal} onClose={() => dispatch(clientInfoModal(false))} clientInfo={clientInfo} />
    </>
  )
}

export default EmployeeTaskManagement
