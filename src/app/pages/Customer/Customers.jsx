import { useDispatch, useSelector } from 'react-redux'
import { Box, useToast } from '@chakra-ui/react'

import { ButtonWithIcon } from '../../components/Form'
import { Table } from '../../components/Table'
import { customerAdd, customerAddModal, customerEdit, customerEditModal, customerFetch } from '../../redux/reducers/customer/customer'
import Breadcrumbs from '../../components/Breadcrumbs'
import assets from '../../assets/assets'
import customerColumns from './customerColumns'
import customerBreadcrumb from './customerBreadcrumbs'
import AddCustomer from '../../components/Modal/Customer/AddCustomer'
import useForm from '../../hooks/useForm'
import customerSchema from '../../validations/customerSchema'
import EditCustomer from '../../components/Modal/Customer/EditCustomer'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner'

const Customers = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.auth.userInfo)
  const customersData = useSelector(state => state.customers.customersData)
  const isCustomerAddModal = useSelector(state => state.customers.customerAddModal)
  const isCustomerEditModal = useSelector(state => state.customers.customerEditModal)
  const isCustomersDataFetch = useSelector(state => state.customers.customersDataFetch)
  const [errorMessages, isInvalid, inputFields, , , onChange, onSubmit] = useForm({ name: '', description: '', code: '' })
  const [errorMessagesEdit, isInvalidEdit, inputFieldsEdit, setInputFieldsEdit, , onChangeEdit, onSubmitEdit] = useForm({ name: '', description: '', code: '' })
  const [employeeId, setEmployeeId] = useState('')

  const addCustomer = async () => {
    const result = await onSubmit(customerSchema, () => dispatch(customerAdd({ customerCredentials: inputFields, toast })))
    if (!result) return
    dispatch(customerAddModal(false))
  }

  const editCustomer = async () => {
    const result = await onSubmitEdit(customerSchema, () => dispatch(customerEdit({ updatedUser: inputFieldsEdit, userId: employeeId.uuid })))
    if (!result) return
    dispatch(customerEditModal(false))
  }

  const onSubmitForm = async (edit = false) => {
    if (!edit) return await addCustomer()

    await editCustomer()
  }

  const openEditModal = data => {
    setInputFieldsEdit(data)
    dispatch(customerEditModal(true))
  }

  useEffect(() => {
    dispatch(customerFetch({ perPage: 10, page: 1 }))
  }, [])

  if (isCustomersDataFetch) return <Spinner marginTop={20} isLoading={isCustomersDataFetch} />

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' my='20px' mx='30px'>
        <Breadcrumbs navigationLocation={customerBreadcrumb} iconImage={assets.icons.employees} />
        {userInfo.role === 'admin' && <ButtonWithIcon title='Add customer' onClick={() => dispatch(customerAddModal(true))} size='medium' />}
      </Box>
      {customersData.length > 0 && (
        <Box mx='30px' mb='20px'>
          <Table
            onClickItem={item => {
              navigate('/customers/task-management', { state: { customerData: item } })
            }}
            setEmployeeId={setEmployeeId}
            columns={customerColumns}
            data={customersData}
            onOpenEditModal={openEditModal}
          />
        </Box>
      )}
      <AddCustomer isInvalid={isInvalid} errorMessage={errorMessages} onChangeInput={onChange} isOpen={isCustomerAddModal} onClose={() => dispatch(customerAddModal(false))} onAddCustomer={() => onSubmitForm()} />
      <EditCustomer inputFields={inputFieldsEdit} isInvalid={isInvalidEdit} errorMessage={errorMessagesEdit} onChangeInput={onChangeEdit} isOpen={isCustomerEditModal} onClose={() => dispatch(customerEditModal(false))} onEditCustomer={() => onSubmitForm(true)} />
    </>
  )
}

export default Customers
