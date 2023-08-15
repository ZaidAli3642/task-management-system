import { useDispatch, useSelector } from 'react-redux'
import { Box, useToast } from '@chakra-ui/react'

import { ButtonWithIcon } from '../../components/Form'
import { Table } from '../../components/Table'
import { customerAddModal, customerEditModal } from '../../redux/reducers/customer/customer'
import Breadcrumbs from '../../components/Breadcrumbs'
import assets from '../../assets/assets'
import customerColumns from './customerColumns'
import DATA from '../../assets/MOCK_DATA.json'
import customerBreadcrumb from './customerBreadcrumbs'
import AddCustomer from '../../components/Modal/Customer/AddCustomer'
import useForm from '../../hooks/useForm'
import customerSchema from '../../validations/customerSchema'
import EditCustomer from '../../components/Modal/Customer/EditCustomer'

const Customers = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const isCustomerAddModal = useSelector(state => state.customers.customerAddModal)
  const isCustomerEditModal = useSelector(state => state.customers.customerEditModal)
  const [errorMessages, isInvalid, , , onChange, onSubmit] = useForm({ name: '', description: '', code: '' })

  const addCustomer = async () => {
    const result = await onSubmit(customerSchema)
    if (!result) return
    dispatch(customerAddModal(false))
  }

  const editCustomer = async () => {
    const result = await onSubmit(customerSchema)
    if (!result) return
    dispatch(customerEditModal(false))
  }

  const onSubmitForm = async (edit = false) => {
    if (!edit) return await addCustomer()

    await editCustomer()
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' my='20px' mx='30px'>
        <Breadcrumbs navigationLocation={customerBreadcrumb} iconImage={assets.icons.employees} />
        <ButtonWithIcon title='Add customer' onClick={() => dispatch(customerAddModal(true))} size='medium' />
      </Box>
      <Box mx='30px' mb='20px'>
        <Table columns={customerColumns} data={DATA} onOpenEditModal={() => dispatch(customerEditModal(true))} />
      </Box>
      <AddCustomer isInvalid={isInvalid} errorMessage={errorMessages} onChangeInput={onChange} isOpen={isCustomerAddModal} onClose={() => dispatch(customerAddModal(false))} onAddCustomer={() => onSubmitForm()} />
      <EditCustomer isInvalid={isInvalid} errorMessage={errorMessages} onChangeInput={onChange} isOpen={isCustomerEditModal} onClose={() => dispatch(customerEditModal(false))} onEditCustomer={() => onSubmitForm(true)} />
    </>
  )
}

export default Customers
