import { useState } from 'react'
import { Box } from '@chakra-ui/react'

import { Table, columns } from '../../components/Table'
import { ButtonWithIcon } from '../../components/Form'
import AddEmployee from '../../components/Modal/AddEmployee'
import Breadcrumbs from '../../components/Breadcrumbs'
import TableFoot from '../../components/Table/TableFoot'
import TableWrapper from '../../components/Table/TableWrapper'
import DATA from '../../assets/MOCK_DATA.json'
import assets from '../../assets/assets'
import colors from '../../config/colors'
import addEmployeeSchema from '../../validations/addEmployeeSchema'
import useForm from '../../hooks/useForm'

const Employees = () => {
  const navigationLocation = ['employess']
  const [openAddEmployee, setOpenAddEmployee] = useState(false)
  const { errorMessages, isInvalid, onChange, onSubmit } = useForm({ firstname: '', lastname: '', username: '', password: '', confirmPassword: '' })

  const addEmployee = async () => {
    const result = await onSubmit(addEmployeeSchema)
    if (!result) return
    setOpenAddEmployee(false)
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' my='20px' mx='30px'>
        <Breadcrumbs navigationLocation={navigationLocation} iconImage={assets.icons.employees} />
        <ButtonWithIcon onClick={() => setOpenAddEmployee(true)} />
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
      <AddEmployee isInvalid={isInvalid} errorMessage={errorMessages} onChangeInput={onChange} isOpen={openAddEmployee} onClose={() => setOpenAddEmployee(false)} onAddEmployee={addEmployee} />
    </>
  )
}

export default Employees
