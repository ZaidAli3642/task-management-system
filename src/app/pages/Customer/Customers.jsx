import React from 'react'

import { Table,columns } from '../../components/Table'
import employeeSchema from '../../validations/employeeSchema'
import useForm from '../../hooks/useForm'
import DATA from '../../assets/MOCK_DATA.json'
import Breadcrumbs from '../../components/Breadcrumbs'
import assets from '../../assets/assets'
import {Box,Image,useToast} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonWithIcon } from '../../components/Form'
import AddCustomer from '../../components/Modal/Customer/AddCustomer'
import EditCustomer from '../../components/Modal/Customer/EditCustomer'
import DeleteEmployee from '../../components/Modal/Employee/DeleteEmployee'
import { employeeAddModal,employeeDeleteModal,employeeEditModal } from '../../redux/reducers/employee/employees'

const Customers = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const isEmployeeAddModal = useSelector(state => state.employees.employeeAddModal)
  const isEmployeeEditModal = useSelector(state => state.employees.employeeEditModal)
  const isEmployeeDeleteModal = useSelector(state => state.employees.employeeDeleteModal)
  const navigationLocation = ['customers']
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
        <Breadcrumbs title="Customers" navigationLocation={navigationLocation} iconImage={assets.icons.customer} />
        <ButtonWithIcon title='Add customer' onClick={() => dispatch(employeeAddModal(true))}   size='medium' />
       
      </Box>
      <Box mx='30px'>
        <Table columns={columns} data={DATA} />
        {/* <TableWrapper tableBoxStyles={{ marginTop: '30px', marginBottom: '30px' }}>
          <TableFoot columns={columns} data={[DATA[0]]} />
        </TableWrapper> */}
      </Box>

      
      <AddCustomer isInvalid={isInvalid} errorMessage={errorMessages} onChangeInput={onChange} isOpen={isEmployeeAddModal} onClose={() => dispatch(employeeAddModal(false))} onAddCustomer={() => onSubmitForm(false)} />
      <EditCustomer showDeleteModal={showDeleteModal} isInvalid={isInvalid} errorMessage={errorMessages} onChangeInput={onChange} isOpen={isEmployeeEditModal} onClose={() => dispatch(employeeEditModal(false))} onEditEmployee={() => onSubmitForm(true)} />
      <DeleteEmployee isOpen={isEmployeeDeleteModal} onClose={() => dispatch(employeeDeleteModal(false))} onDeleteEmployee={() => deleteEmployee()} />
      
   </>
  )
}

export default Customers
