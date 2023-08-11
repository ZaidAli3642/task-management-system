import { useState } from 'react'
import { Box, useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import { Table, columns } from '../../components/Table'
import { ButtonWithIcon } from '../../components/Form'
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
import { employeeAddModal, employeeDeleteModal, employeeEditModal } from '../../redux/reducers/employee/employees'

const Employees = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const isEmployeeAddModal = useSelector(state => state.employees.employeeAddModal)
  const isEmployeeEditModal = useSelector(state => state.employees.employeeEditModal)
  const isEmployeeDeleteModal = useSelector(state => state.employees.employeeDeleteModal)
  const navigationLocation = ['employess']
  const [errorMessages, isInvalid, , , onChange, onSubmit] = useForm({ firstname: '', lastname: '', username: '', password: '', confirmPassword: '' })

  const addEmployee = async () => {
    const result = await onSubmit(employeeSchema)
    if (!result) return
    dispatch(employeeAddModal(false))
  }

  const editEmployee = async () => {
    const result = await onSubmit(employeeSchema)
    if (!result) return
    dispatch(employeeEditModal(false))
  }

  const onSubmitForm = async (edit = false) => {
    if (!edit) return await addEmployee()

    await editEmployee()
  }

  const deleteEmployee = () => {
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

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' my='20px' mx='30px'>
        <Breadcrumbs navigationLocation={navigationLocation} iconImage={assets.icons.employees} />
        <ButtonWithIcon onClick={() => dispatch(employeeAddModal(true))} size='medium' />
      </Box>
      <Box mx='30px'>
        <Table columns={columns} data={DATA} />
        <TableWrapper tableBoxStyles={{ marginTop: '30px' }}>
          <TableFoot columns={columns} data={[DATA[0]]} />
        </TableWrapper>
      </Box>
      <AddEmployee isInvalid={isInvalid} errorMessage={errorMessages} onChangeInput={onChange} isOpen={isEmployeeAddModal} onClose={() => dispatch(employeeAddModal(false))} onAddEmployee={() => onSubmitForm(false)} />
      <EditEmployee showDeleteModal={showDeleteModal} isInvalid={isInvalid} errorMessage={errorMessages} onChangeInput={onChange} isOpen={isEmployeeEditModal} onClose={() => dispatch(employeeEditModal(false))} onEditEmployee={() => onSubmitForm(true)} />
      <DeleteEmployee isOpen={isEmployeeDeleteModal} onClose={() => dispatch(employeeDeleteModal(false))} onDeleteEmployee={() => deleteEmployee()} />
    </>
  )
}

export default Employees
