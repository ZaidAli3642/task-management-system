import { AddIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import colors from '../../config/colors'
import { mediumButtonSize } from '../../constants/styleConfig'

const ButtonWithIcon = ({ IconComponent = AddIcon, title = 'Add employee', size = 'small', onClick }) => {
  return (
    <Button onClick={onClick} className={`button-with-icon ${mediumButtonSize[size]}`} _hover={{ backgroundColor: colors.white }} leftIcon={<IconComponent boxSize={3} />}>
      {title}
    </Button>
  )
}

export default ButtonWithIcon
