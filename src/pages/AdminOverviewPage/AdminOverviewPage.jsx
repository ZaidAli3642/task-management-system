import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Button, Flex, Image } from '@chakra-ui/react'
import ButtonwithIcon from '../../components/Form/ButtonwithIcon'
import { Link } from 'react-router-dom'
import empicon from '../../assets/icons/emp.svg'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spacer,
  Box,
} from '@chakra-ui/react'
import Icon from '../../components/Icon'
import Customer from '../Login/Customer/Customer'



function AdminOverviewPage() {
  
  return (
    <>
      <Navbar />
      <Flex>
        <Box ms='24px' mt={5}  align="center"  borderRadius='50px' gap='20px' padding={'5px'}  bg={'white'} fontWeight={600}  >
      
        <Breadcrumb>
          <BreadcrumbItem bg='#CFF0E6' borderRadius='40px' w='141px' h='40px' padding='10px'  gap='10px'>
             <Box w='30px' display='flex' h='30px' borderRadius={'full'} backgroundColor={'#1BA076'} align='center'padding='7px'  >
              <Icon image={empicon}  />
             </Box>
            <BreadcrumbLink to='/login' >Employees</BreadcrumbLink>
          </BreadcrumbItem>
       
        
          
          
        </Breadcrumb>
        </Box>

        <Spacer />
        <Flex>
          <ButtonwithIcon title='Employee' />
        </Flex>
      </Flex>
      <Customer/>
    </>
  )
}

export default AdminOverviewPage
