import { Td, Text, Tfoot, Tr } from '@chakra-ui/react'

import columns from '../../pages/Employee/employeeColumns'
import TableRow from './TableRow'

const TableFoot = ({ data, onClickItem }) => {
  return (
    <Tfoot display='flex' justifyContent='center' alignItems='center' flexDirection='column' w='100%'>
      <TableRow onClickItem={onClickItem} columns={columns} data={data} isEdit={false} />
    </Tfoot>
  )
}

export default TableFoot
