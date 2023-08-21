import { useDispatch, useSelector } from 'react-redux'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Flex, useColorModeValue, Image, Button, MenuButton, Menu, MenuList, MenuItem } from '@chakra-ui/react'

import NavItems from './NavItems'
import assets from '../../assets/assets'
import colors from '../../config/colors'
import { logout } from '../../redux/reducers/auth/auth'

const Navbar = () => {
  const userInfo = useSelector(state => state.auth.userInfo)
  const dispatch = useDispatch()

  const logoutUser = () => {
    dispatch(logout())
  }
  return (
    <Box position='sticky' top={0} boxShadow={'sm'} zIndex={99}>
      <Flex bg={useColorModeValue('white', 'gray.800')} color={useColorModeValue('gray.600', 'white')} minH='60px' py={{ base: 2 }} px='30px' align='center'>
        <Flex flex={1} alignItems='center'>
          <Image src={assets.images.logoHeading} w={136} h={22} mt={1} />
          <Flex align='center' flex={1} ml={'25px'} padding={0}>
            <NavItems />
          </Flex>
          <Menu>
            <MenuButton ml='5px' padding={0} as={Button} backgroundColor='transparent' fontWeight={700} _hover={{ backgroundColor: 'transparent' }} _active={{ backgroundColor: 'transparent' }} rightIcon={<ChevronDownIcon />}>
              {userInfo.first_name}
            </MenuButton>
            <MenuList p={3} minWidth={170}>
              <MenuItem onClick={logoutUser} as={Button} fontWeight={600} backgroundColor={colors.lightGrey} textColor={colors.black} _hover={{ backgroundColor: colors.lightGrey }}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
