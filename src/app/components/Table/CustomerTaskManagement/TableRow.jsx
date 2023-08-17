import { Tr } from '@chakra-ui/react'
import colors from '../../../config/colors'

const TableRow = ({ children, ...props }) => {
  return (
    <Tr {...props} w={'100%'} display={'flex'} h='auto' borderBottom={1} borderStyle={'solid'} borderColor={colors.borderGrey} alignItems={'center'} textDecoration={'none'}>
      {children}
    </Tr>
  )
}

export default TableRow
