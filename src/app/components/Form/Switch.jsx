import { Switch as ChakraSwitch } from '@chakra-ui/react'
import colors from '../../config/colors'

const Switch = ({ size = 'lg', onChange, checked }) => {
  return (
    <ChakraSwitch
      value={checked}
      isChecked={checked}
      checked={checked}
      defaultChecked={checked}
      onChange={onChange}
      size={size}
      outline={0}
      border={0}
      colorScheme='green'
      sx={{
        'span.chakra-switch__track:not([data-checked])': { backgroundColor: colors.mediumGrey },
      }}
      css={{
        'span.chakra-switch__track:focus-visible': {
          boxShadow: '0 0 0 0 rgba(0,0,0,0) !important',
          outline: 'none !important',
        },
        'span.chakra-switch__track[data-focus-visible]': {
          boxShadow: '0 0 0 0 rgba(0,0,0,0) !important',
          outline: 'none !important',
        },
      }}
    />
  )
}

export default Switch
