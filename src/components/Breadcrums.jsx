import React from 'react'
import empicon from '../assets/icons/emp.svg'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Spacer,
    Box,
  } from '@chakra-ui/react'

function Breadcrums() {
  return (
    
    <Breadcrumb>
      <BreadcrumbItem bg='#CFF0E6' borderRadius='40px' w='141px' h='40px' padding='10px' gap='10px'>
      <Image src={empicon} bgColor={'#1BA076'}   padding='4px' w='30px' h='25px'  borderRadius='20px' />
        <BreadcrumbLink as={Link} to='/login' >Employees</BreadcrumbLink>
      </BreadcrumbItem>
   
      <BreadcrumbItem bg='#CFF0E6' borderRadius='40px' w='141px' h='40px' padding='10px' gap='10px' >
      <Image src={empicon} bgColor={'#1BA076'}   padding='4px' w='30px' h='25px'  borderRadius='20px' />
        <BreadcrumbLink as={Link} to='/login' >Employees</BreadcrumbLink>
      </BreadcrumbItem>
      
      
    </Breadcrumb>
  )
}

export default Breadcrums
