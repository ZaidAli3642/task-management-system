import { Thead, Tr } from '@chakra-ui/react'

import TableColumnTitle from './TableColumnTitle'

const TableHead = ({ columns }) => {
  return (
    <Thead display={'flex'} justifyContent={'center'} alignItems={'center'} w={'100%'}>
      <Tr h={'75px'} w={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} textDecoration={'none'}>
        {columns.map(value => (
          <TableColumnTitle key={value.id} value={value} />
        ))}
      </Tr>
    </Thead>
  )
}

export default TableHead
