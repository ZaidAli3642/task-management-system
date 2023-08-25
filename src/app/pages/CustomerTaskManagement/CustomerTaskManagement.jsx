import { Box } from '@chakra-ui/react'
import Breadcrumbs from '../../components/Breadcrumbs'
import customerTaskManagementBreadcrumbs from './customerTaskManagementBreadcrumbs'
import assets from '../../assets/assets'
import MenuList from '../../components/MenuList'
import { Table } from '../../components/Table'
import taskManagementColumns from './taskManagementColumns'
import CustomerTaskManagementTable from '../../components/Table/CustomerTaskManagement/CustomerTaskManagement'
import { useNavigate } from 'react-router-dom'

const CustomerTaskManagement = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box display='flex' alignItems='center' my='20px' mx='30px'>
        <Breadcrumbs onClick={() => navigate('/customers')} navigationLocation={customerTaskManagementBreadcrumbs} iconImage={assets.icons.employees} />
        <MenuList defaultTitle='Hotel Nordbo' marginLeft='10px' />
      </Box>

      <Box mx='30px'>
        <CustomerTaskManagementTable />
      </Box>
    </>
  )
}

export default CustomerTaskManagement
