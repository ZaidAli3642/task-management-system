import { Box, useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import { Table } from '../../components/Table'
import employeeColumns from './employeeColumns'
import { ButtonWithIcon } from '../../components/Form'
import { employeeAdd, employeeAddModal, employeeDelete, employeeDeleteModal, employeeEdit, employeeEditModal, employeeFetch } from '../../redux/reducers/employee/employees'
import AddEmployee from '../../components/Modal/Employee/AddEmployee'
import Breadcrumbs from '../../components/Breadcrumbs'
import TableFoot from '../../components/Table/TableFoot'
import TableWrapper from '../../components/Table/TableWrapper'
import DATA from '../../assets/MOCK_DATA.json'
import assets from '../../assets/assets'
import employeeSchema from '../../validations/employeeSchema'
import useForm from '../../hooks/useForm'
import EditEmployee from '../../components/Modal/Employee/EditEmployee'
import DeleteEmployee from '../../components/Modal/Employee/DeleteEmployee'
import employeeBreadcrumb from './employeeBreadcrumbs'
import { useEffect, useState } from 'react'
import axios from 'axios'
import apiClient from '../../api/client'

const Employees = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const employeeData = useSelector(state => state.employees.employeeData)
  const isEmployeeAddModal = useSelector(state => state.employees.employeeAddModal)
  const isEmployeeEditModal = useSelector(state => state.employees.employeeEditModal)
  const isEmployeeDeleteModal = useSelector(state => state.employees.employeeDeleteModal)
  const [errorMessages, isInvalid, inputFields, , , onChange, onSubmit] = useForm({ firstname: '', lastname: '', username: '', password: '', confirmPassword: '' })
  const [errorMessagesEdit, isInvalidEdit, inputFieldsEdit, setInputFieldsEdit, , onChangeEdit, onSubmitEdit] = useForm({ firstname: '', lastname: '', username: '', password: '', confirmPassword: '' })
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [employeeId, setEmployeeId] = useState('')

  const addEmployee = async () => {
    const result = await onSubmit(employeeSchema, () => dispatch(employeeAdd({ userCredentials: inputFields })))

    if (!result) return
    dispatch(employeeAddModal(false))
  }

  const editEmployee = async () => {
    const result = await onSubmitEdit(employeeSchema, () => dispatch(employeeEdit({ updatedUser: inputFieldsEdit, userId: employeeId.uuid })))
    if (!result) return
    dispatch(employeeEditModal(false))
  }

  const onSubmitForm = async (edit = false) => {
    if (!edit) return await addEmployee()

    await editEmployee()
  }

  const deleteEmployee = () => {
    dispatch(employeeDelete({ userId: employeeId.uuid }))
    dispatch(employeeDeleteModal(false))
    toast({
      title: 'Deleted',
      description: 'Your have successfully delete employee',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  const showDeleteModal = () => {
    dispatch(employeeEditModal(false))
    dispatch(employeeDeleteModal(true))
  }

  const openEditModal = data => {
    setInputFieldsEdit({ firstname: data.first_name, lastname: data.last_name, username: data.username, password: '', confirmPassword: '' })
    dispatch(employeeEditModal(true))
  }

  useEffect(() => {
    dispatch(employeeFetch({ perPage, page }))
  }, [perPage, page])

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' my='20px' mx='30px'>
        <Breadcrumbs navigationLocation={employeeBreadcrumb} iconImage={assets.icons.employees} />
        <ButtonWithIcon onClick={() => dispatch(employeeAddModal(true))} size='medium' />
      </Box>
      <Box mx='30px'>
        {employeeData.length > 0 && <Table setEmployeeId={setEmployeeId} columns={employeeColumns} data={employeeData} onOpenEditModal={openEditModal} />}
        <TableWrapper tableBoxStyles={{ marginTop: '30px', marginBottom: '30px' }}>{employeeData.length > 0 && <TableFoot columns={employeeColumns} data={[employeeData[0]]} />}</TableWrapper>
      </Box>
      <AddEmployee isInvalid={isInvalid} errorMessage={errorMessages} onChangeInput={onChange} isOpen={isEmployeeAddModal} onClose={() => dispatch(employeeAddModal(false))} onAddEmployee={() => onSubmitForm(false)} />
      <EditEmployee inputEditFields={inputFieldsEdit} showDeleteModal={showDeleteModal} isInvalid={isInvalidEdit} errorMessage={errorMessagesEdit} onChangeInput={onChangeEdit} isOpen={isEmployeeEditModal} onClose={() => dispatch(employeeEditModal(false))} onEditEmployee={() => onSubmitForm(true)} />
      <DeleteEmployee employee={employeeId} isOpen={isEmployeeDeleteModal} onClose={() => dispatch(employeeDeleteModal(false))} onDeleteEmployee={() => deleteEmployee()} />
    </>
  )
}

export default Employees
