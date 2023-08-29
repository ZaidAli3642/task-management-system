import { Switch as ChakraSwitch } from '@chakra-ui/react'
import colors from '../../config/colors'

const Switch = ({ size = 'lg', onChange, checked }) => {
  return <ChakraSwitch value={checked} isChecked={checked} checked={checked} defaultChecked={checked} onChange={onChange} size={size} outline={0} border={0} colorScheme='green' sx={{ 'span.chakra-switch__track:not([data-checked])': { backgroundColor: colors.mediumGrey } }} />
}

export default Switch
