import { Tr } from '@chakra-ui/react'

import TableData from './TableData'

const TableRow = ({ columns, data = [], isEdit }) => {
  return (
    <>
      {data.map((value, index) => (
        <Tr key={index} h='60px' w='100%' display='flex' justifyContent='space-between' alignItems='center' textDecoration='none'>
          <TableData item={value} columns={columns} isEdit={isEdit} />
        </Tr>
      ))}
    </>
  )
}

export default TableRow
