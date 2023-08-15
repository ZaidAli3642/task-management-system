import { Thead, Tr } from '@chakra-ui/react'

import TableColumnTitle from './TableColumnTitle'
import colors from '../../config/colors'

const TableHead = ({ columns }) => {
  return (
    <Thead display={'flex'} justifyContent={'center'} alignItems={'center'} w='100%' h='auto'>
      <Tr w={'100%'} py={'10px'} display={'flex'} h='auto' borderBottom={1} borderStyle={'solid'} borderColor={colors.borderGrey} pl={'20px'} justifyContent={'space-between'} alignItems={'center'} textDecoration={'none'}>
        {columns.map((value, index) => (
          <TableColumnTitle key={value.id} value={value} index={index} />
        ))}
      </Tr>
    </Thead>
  )
}

export default TableHead
