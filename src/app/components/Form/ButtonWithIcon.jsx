import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import colors from '../../config/colors'
import { mediumButtonSize } from '../../constants/styleConfig'
import Icon from '../Icon'
import assets from '../../assets/assets'

const ButtonWithIcon = ({ IconComponent = AddIcon, title = 'Add employee', size = 'small', onClick, ...props }) => {
  return (
    <Button onClick={onClick} w={'fit-content'} className={`button-with-icon ${mediumButtonSize[size]}`} _hover={{ backgroundColor: colors.white }} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} {...props}>
      <Icon display='flex' w='12px' h='12px' justifyContent='center' alignItems='center' marginRight='8px' image={assets.icons.plusGreen} />
      <Text>{title}</Text>
    </Button>
  )
}

export default ButtonWithIcon
