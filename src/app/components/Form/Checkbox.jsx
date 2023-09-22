import { Checkbox } from '@chakra-ui/react'
import colors from '../../config/colors'

const CheckBox = ({ label, checked, isChecked = false, onChange, isInvalid = false, ...props }) => {
  return (
    <Checkbox
      css={{
        'span.chakra-checkbox__control:not([data-checked])': {
          background: colors.white,
        },
        'span.chakra-checkbox__control:focus-visible': {
          boxShadow: '0 0 0 0 rgba(0,0,0,0) !important',
          outline: 'none !important',
        },
        'span.chakra-checkbox__control[data-focus-visible]': {
          boxShadow: '0 0 0 0 rgba(0,0,0,0) !important',
          outline: 'none !important',
        },
      }}
      isInvalid={isInvalid}
      defaultChecked={checked}
      isChecked={isChecked && checked}
      checked={checked}
      value={checked}
      onChange={e => onChange(e.target.checked)}
      sx={{ 'span.chakra-checkbox__control': { borderRadius: '5px', borderWidth: 1, width: '20px', height: '20px' }, 'span.chakra-checkbox__label': { fontSize: '14px', fontWeight: 500, marginLeft: '5px' } }}
      borderRadius={'lg'}
      colorScheme='green'
      borderColor={colors.greyGreen}
      _hover={{ borderColor: colors.darkGreen }}
      {...props}
    >
      {label}
    </Checkbox>
  )
}

export default CheckBox
