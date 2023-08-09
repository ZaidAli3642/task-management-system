import { Box, Flex, useColorModeValue, Image, Button, MenuButton, Menu, MenuList, MenuItem } from '@chakra-ui/react'
import NavItems from './NavItems'
import assets from '../../assets/assets'
import { ChevronDownIcon } from '@chakra-ui/icons'
import colors from '../../config/colors'

const Navbar = () => {
  return (
    <Box>
      <Flex bg={useColorModeValue('white', 'gray.800')} color={useColorModeValue('gray.600', 'white')} minH='60px' py={{ base: 2 }} px={{ base: 4 }} align='center'>
        <Flex flex={1} alignItems='center'>
          <Image src={assets.images.logoHeading} w={136} h={22} mt={1} />
          <Flex align='center' flex={1} ml={12}>
            <NavItems />
          </Flex>
          <Menu>
            <MenuButton as={Button} backgroundColor='transparent' fontWeight={700} _hover={{ backgroundColor: 'transparent' }} _active={{ backgroundColor: 'transparent' }} rightIcon={<ChevronDownIcon />}>
              Dilawer
            </MenuButton>
            <MenuList p={3} minWidth={170}>
              <MenuItem as={Button} fontWeight={600} backgroundColor={colors.lightGrey} textColor={colors.black} _hover={{ backgroundColor: colors.lightGrey }}>
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
