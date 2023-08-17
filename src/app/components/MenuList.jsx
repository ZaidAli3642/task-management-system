import { Menu, MenuList as ChakraMenuList, MenuButton, MenuItem, Button } from '@chakra-ui/react'
import colors from '../config/colors'
import { ChevronDownIcon } from '@chakra-ui/icons'

const MenuList = ({ onClickMenuItem, options = [], defaultTitle, ...props }) => {
  return (
    <Menu>
      <MenuButton {...props} borderRadius='full' textColor={colors.white} as={Button} backgroundColor={colors.darkGreen} fontWeight={600} fontSize='16px' _hover={{ backgroundColor: colors.darkGreen }} _active={{ backgroundColor: colors.darkGreen }} rightIcon={<ChevronDownIcon />}>
        {defaultTitle}
      </MenuButton>
      <ChakraMenuList>
        <MenuItem onClick={onClickMenuItem} fontWeight={600} backgroundColor={colors.lightGrey} textColor={colors.black} _hover={{ backgroundColor: colors.lightGrey }}>
          Logout
        </MenuItem>
      </ChakraMenuList>
    </Menu>
  )
}

export default MenuList
