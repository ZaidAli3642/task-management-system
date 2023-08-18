import { Checkbox } from '@chakra-ui/react'
import colors from '../../config/colors'

const CheckBox = () => {
  return <Checkbox fontSize={'14px'} defaultChecked colorScheme='green' _hover={{ borderColor: colors.darkGreen }} />
}

export default CheckBox
