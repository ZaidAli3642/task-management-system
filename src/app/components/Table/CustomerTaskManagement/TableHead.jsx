import { Thead, Tr } from '@chakra-ui/react'
import colors from '../../../config/colors'

const TableHead = ({ children, ...props }) => {
  return (
    <Thead display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} w='100%' h='auto' {...props}>
      {children}
    </Thead>
  )
}

export default TableHead
