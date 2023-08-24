import { useEffect, useState } from 'react'

import { Box, useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import { Table } from '../../components/Table'
import employeeColumns from './employeeCustomerColumns'
import { ButtonWithIcon } from '../../components/Form'
import { employeeAddModal, employeeFetch } from '../../redux/reducers/employee/employees'
import Breadcrumbs from '../../components/Breadcrumbs'
import assets from '../../assets/assets'
import employeeCustomerBreadcrumb from './employeeCustomerBreadcrumb'
import DropDown from '../../components/DropDown'
import { employeeCustomerFetch } from '../../redux/reducers/employeeCustomer/employeeCustomer'

const EmployeeCustomer = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.userInfo)
  const employeeData = useSelector(state => state.employees.employeeData)
  const employeeCustomerData = useSelector(state => state.employeeCustomer.employeeCustomerData)
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [employeeId, setEmployeeId] = useState('')
  const [selectedEmployeeOption, setSelectedEmployeeOption] = useState('')

  const selectedEmployee = employee => {
    setSelectedEmployeeOption(employee.first_name)
    dispatch(employeeCustomerFetch({ perPage, page, employeeId: employee.id }))
  }

  useEffect(() => {
    dispatch(employeeFetch({ perPage, page }))
  }, [perPage, page])

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' my='20px' mx='30px'>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Breadcrumbs navigationLocation={employeeCustomerBreadcrumb} iconImage={assets.icons.employees} />
          <DropDown label={selectedEmployeeOption || 'Select'} data={employeeData} onSelectItem={selectedEmployee} />
        </Box>
      </Box>
      <Box mx='30px'>{employeeCustomerData.length > 0 && <Table isEdit={false} setEmployeeId={setEmployeeId} columns={employeeColumns} data={employeeCustomerData} />}</Box>
    </>
  )
}

export default EmployeeCustomer