import React from 'react'
import logo from '../../assets/images/logo-heading.png'
import {
  Box,
  Image,
  Flex,
  Button,
  useDisclosure,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  useColorModeValue,
  Spacer,
  AspectRatio,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { useState } from 'react'

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activeLink, setActiveLink] = useState(null)

  const handleNavLinkClick = link => {
    setActiveLink(link)
  }

  return (
    <>
      <Box bg={'white'} letterSpacing='2%'>
        <Flex>
          <Image
            width='136px'
            h='22px'
            mt={27}
            ms={5}
            src={logo}
            className='logo'
          />

          <NavLink
          
            isActive={() => activeLink === 'link1'}
            onClick={() => handleNavLinkClick('link1')}
          >
            <Flex
              style={{ color: activeLink === 'link1' ? '#1BA076' : 'black' }}
              padding={2}
              variant='ghost'
              aria-label='employess'
              mt={24}
              my={5}
              mx={5}
              w={100}
              fontWeight={500}
              fontSize='16px'
              lineHeight='20px'
              
            >
              Employess
            </Flex>
          </NavLink>

          <NavLink
            isActive={() => activeLink === 'link2'}
            onClick={() => handleNavLinkClick('link2')}
          >
            <Flex
              style={{ color: activeLink === 'link2' ? '#1BA076' : 'black' }}
              padding={2}
              variant='ghost'
              aria-label='employess'
              mt={24}
              my={5}
              mx={5}
              w={100}
              fontWeight={500}
              fontSize='16px'
              lineHeight='20px'
            >
              Customers
            </Flex>
          </NavLink>
          <NavLink
            isActive={() => activeLink === 'link3'}
            onClick={() => handleNavLinkClick('link3')}
          >
            <Flex
              style={{ color: activeLink === 'link3' ? '#1BA076' : 'black' }}
              padding={2}
              variant='ghost'
              aria-label='tasks'
              mt={24}
              my={5}
              mx={5}
              fontSize='16px'
              w={100}
              fontWeight={500}
              lineHeight='20px'
            >
              Tasks
            </Flex>
          </NavLink>
          <Spacer />
          <Flex>
            <Menu ml={1300} w={116} h={20} mt={24} isOpen={isOpen}>
              <MenuButton
                variant='ghost'
                mx={1}
                py={[1, 2, 2]}
                px={4}
                borderRadius={5}
                gap='10px'                // _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                aria-label='Courses'
                fontWeight={700}
                onClick={onOpen}
                onDoubleClick={onClose}
              >
                James Smith {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </MenuButton>
              <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                <MenuItem>Menu Item 1</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
                <MenuItem>Menu Item 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Navbar
