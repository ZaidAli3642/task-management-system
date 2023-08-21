import { Tr } from '@chakra-ui/react'

import TableData from './TableData'

const TableRow = ({ columns, data = [], isEdit, onOpenEditModal, setEmployeeId }) => {
  return (
    <>
      {data.map((value, index) => (
        <Tr key={index} h='50px' px={'20px'} w='100%' display='flex' justifyContent='space-between' alignItems='center' textDecoration='none'>
          <TableData setEmployeeId={setEmployeeId} onOpenEditModal={onOpenEditModal} item={value} columns={columns} isEdit={isEdit} isLastIndex={index === data.length - 1} isFirstIndex={index === 0} />
        </Tr>
      ))}
    </>
  )
}

export default TableRow
