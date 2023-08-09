import { useState } from 'react'
import { Box, useToast } from '@chakra-ui/react'

import { Table, columns } from '../../components/Table'
import { ButtonWithIcon } from '../../components/Form'
import AddEmployee from '../../components/Modal/Employee/AddEmployee'
import Breadcrumbs from '../../components/Breadcrumbs'
import TableFoot from '../../components/Table/TableFoot'
import TableWrapper from '../../components/Table/TableWrapper'
import DATA from '../../assets/MOCK_DATA.json'
import assets from '../../assets/assets'
import colors from '../../config/colors'
import employeeSchema from '../../validations/employeeSchema'
import useForm from '../../hooks/useForm'
import EditEmployee from '../../components/Modal/Employee/EditEmployee'
import DeleteEmployee from '../../components/Modal/Employee/DeleteEmployee'

const Employees = () => {
  const toast = useToast()
  const navigationLocation = ['employess']
  const [openAddEmployee, setOpenAddEmployee] = useState(false)
  const [openEditEmployee, setOpenEditEmployee] = useState(false)
  const [openDeleteEmployee, setOpenDeleteEmployee] = useState(false)
  const [errorMessages, isInvalid, , , onChange, onSubmit] = useForm({ firstname: '', lastname: '', username: '', password: '', confirmPassword: '' })

  const addEmployee = async () => {
    const result = await onSubmit(employeeSchema)
    if (!result) return
    setOpenAddEmployee(false)
  }

  const editEmployee = async () => {
    const result = await onSubmit(employeeSchema)
    if (!result) return
    setOpenEditEmployee(false)
  }

  const onSubmitForm = async (edit = false) => {
    if (!edit) return await addEmployee()

    await editEmployee()
  }

  const deleteEmployee = () => {
    setOpenDeleteEmployee(false)
    toast({
      title: 'Deleted',
      description: 'Your have successfully delete employee',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  const showDeleteModal = () => {
    setOpenEditEmployee(false)
    setOpenDeleteEmployee(true)
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' my='20px' mx='30px'>
        <Breadcrumbs navigationLocation={navigationLocation} iconImage={assets.icons.employees} />
        <ButtonWithIcon onClick={() => setOpenEditEmployee(true)} />
      </Box>
      <Box mx='30px'>
        <Box border={1} borderColor={colors.lightGrey} borderStyle='solid' borderRadius='20px' overflow='hidden'>
          <Table columns={columns} data={DATA} />
        </Box>
        <Box marginY={'30px'} border={1} borderColor={colors.lightGrey} borderStyle='solid' borderRadius='20px' overflow='hidden'>
          <TableWrapper>
            <TableFoot columns={columns} data={[DATA[0]]} />
          </TableWrapper>
        </Box>
      </Box>
      <AddEmployee isInvalid={isInvalid} errorMessage={errorMessages} onChangeInput={onChange} isOpen={openAddEmployee} onClose={() => setOpenAddEmployee(false)} onAddEmployee={() => onSubmitForm(false)} />
      <EditEmployee showDeleteModal={showDeleteModal} isInvalid={isInvalid} errorMessage={errorMessages} onChangeInput={onChange} isOpen={openEditEmployee} onClose={() => setOpenEditEmployee(false)} onEditEmployee={() => onSubmitForm(true)} />
      <DeleteEmployee isOpen={openDeleteEmployee} onClose={() => setOpenDeleteEmployee(false)} onDeleteEmployee={() => deleteEmployee()} />
    </>
  )
}

export default Employees
