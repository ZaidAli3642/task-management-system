import { Checkbox } from '@chakra-ui/react'
import colors from '../../config/colors'

const CheckBox = ({ label, checked, onChange, ...props }) => {
  return (
    <Checkbox defaultChecked={checked} onChange={e => onChange(e.target.checked)} sx={{ 'span.chakra-checkbox__control': { borderRadius: '5px', borderWidth: 1, width: '20px', height: '20px' }, 'span.chakra-checkbox__label': { fontSize: '14px', fontWeight: 500, marginLeft: '5px' } }} borderRadius={'lg'} colorScheme='green' _hover={{ borderColor: colors.darkGreen }} {...props}>
      {label}
    </Checkbox>
  )
}

export default CheckBox
