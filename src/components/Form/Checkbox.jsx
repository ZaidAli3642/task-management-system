import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import colors from '../../config/colors'

const CheckBox = () => {
  return (
    <Checkbox
      defaultChecked
      colorScheme='green'
      _hover={{ borderColor: colors.darkGreen }}
    />
  )
}

export default CheckBox
