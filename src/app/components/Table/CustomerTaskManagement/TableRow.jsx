import { Tr } from '@chakra-ui/react'
import colors from '../../../config/colors'

const TableRow = ({ children, ...props }) => {
  return (
    <Tr w={'100%'} display={'flex'} h='auto' borderBottom={1} borderStyle={'solid'} borderColor={colors.borderGrey} alignItems={'center'} textDecoration={'none'} {...props}>
      {children}
    </Tr>
  )
}

export default TableRow
