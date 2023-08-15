import { Tbody, Tr } from '@chakra-ui/react'

import TableRow from './TableRow'

const TableBody = ({ columns, data, onOpenEditModal }) => {
  return (
    <Tbody h='auto' display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} w={'100%'}>
      <TableRow onOpenEditModal={onOpenEditModal} columns={columns} data={data} />
    </Tbody>
  )
}

export default TableBody
