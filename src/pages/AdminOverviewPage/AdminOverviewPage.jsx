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



function AdminOverviewPage() {
  
  return (
    <>
      <Navbar />
      <Flex>
        <Box ms='24px' mt={5}  align="center"  borderRadius='50px' gap='20px' padding={'5px'}  bg={'white'} fontWeight={600}  >
        {/* <Breadcrumb spacing="8px"  mb={4}>
      {breadcrumbItems.map((item, index) => (
        <BreadcrumbItem key={index}>
          <Flex align="center" bg="#CFF0E6" borderRadius="40px" w="141px" h="40px" padding="10px" gap="10px" >
            {item.imageSrc && (
              <Image src={item.imageSrc} bgColor="#1BA076" padding="4px" w="30px" h="25px" borderRadius="20px" />
            )}
            <BreadcrumbLink as={Link} to={item.link}>
              {item.text}
            </BreadcrumbLink>
          </Flex>
        </BreadcrumbItem>
      ))}
    </Breadcrumb> */}
        <Breadcrumb>
          <BreadcrumbItem bg='#CFF0E6' borderRadius='40px' w='141px' h='40px' padding='10px'  gap='10px'>
             <Box w='30px' display='flex' h='30px' borderRadius={'full'} backgroundColor={'green'} align='center'padding='7px'  >
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
    </>
  )
}

export default AdminOverviewPage
