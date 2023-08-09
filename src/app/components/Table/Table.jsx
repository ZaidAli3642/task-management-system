import { Table as ChakraTable, Td, Text, Tfoot, Tr } from '@chakra-ui/react'

import TableHead from './TableHead'
import colors from '../../config/colors'
import TableBody from './TableBody'

const Table = ({ columns = [], data }) => {
  return (
    <ChakraTable w={'100%'} variant={'simple'} className='table' backgroundColor={colors.white} outline={'none'}>
      <TableHead columns={columns} />
      <TableBody columns={columns} data={data} />
    </ChakraTable>
  )
}

export default Table
