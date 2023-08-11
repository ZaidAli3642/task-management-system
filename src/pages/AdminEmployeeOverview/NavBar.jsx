import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoHeading from '../../assets/images/logo-heading.png'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons'

function NavBar() {
  const [activeLink, setActiveLink] = useState('') // Initialize the active link
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();

  const handleNavLinkClick = linkName => {
    setActiveLink(linkName)
  }

  const handleClick = ()=>{
    console.log('clicked');
    localStorage.setItem('isLogged', false)
    let auth = localStorage.getItem('isLogged');
    if(auth === 'false'){
      navigate('/login');
    }
  }

  return (
    <Box bg={useColorModeValue('white')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <a href='#'>
              <img
                src={logoHeading}
                alt='Logo Heading'
                width='136px'
                height='22px'
              />
            </a>
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink
              linkName='Employee'
              activeLink={activeLink}
              handleNavLinkClick={handleNavLinkClick}
            >
              Employees 
            </NavLink>
            <NavLink
              linkName='Customer'
              activeLink={activeLink}
              handleNavLinkClick={handleNavLinkClick}
            >
              Customer
            </NavLink>
            <NavLink
              linkName='Tasks'
              activeLink={activeLink}
              handleNavLinkClick={handleNavLinkClick}
            >
              Tasks
            </NavLink>
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
              fontWeight={700}
              fontFamily='roboto'
              color={'black'}
              rightIcon={<ChevronDownIcon />}
            >   
              James Smith
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleClick}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <HStack as={'nav'} spacing={4}>
            <NavLink
              linkName='Employee'
              activeLink={activeLink}
              handleNavLinkClick={handleNavLinkClick}
            >
              Employees
            </NavLink>
            <NavLink
              linkName='Customer'
              activeLink={activeLink}
              handleNavLinkClick={handleNavLinkClick}
            >
              Customer 
            </NavLink>
            <NavLink
              linkName='Tasks'
              activeLink={activeLink}
              handleNavLinkClick={handleNavLinkClick}
            >
              Tasks 
            </NavLink>
          </HStack>
        </Box>
      ) : null}
    </Box>
  )
}

const NavLink = props => {
  const { linkName, activeLink, handleNavLinkClick, children } = props

  return (
    <Box
      as='a'
      px={2}
      py={1}
      rounded='md'
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      color={activeLink === linkName ? 'green.500' : 'inherit'}
      href='#'
      onClick={() => handleNavLinkClick(linkName)}
      fontWeight={500}
      fontFamily='roboto'
    >
      {children}
    </Box>
  )
}

export default NavBar
