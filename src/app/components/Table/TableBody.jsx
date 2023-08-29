import { Tbody, Tr } from '@chakra-ui/react'

import TableRow from './TableRow'

const TableBody = ({ columns, data, onOpenEditModal, setEmployeeId, isEdit, onCustomerClick }) => {
  return (
    <Tbody h='auto' display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} w={'100%'}>
      <TableRow onCustomerClick={onCustomerClick} isEdit={isEdit} onOpenEditModal={onOpenEditModal} columns={columns} data={data} setEmployeeId={setEmployeeId} />
    </Tbody>
  )
}

export default TableBody
