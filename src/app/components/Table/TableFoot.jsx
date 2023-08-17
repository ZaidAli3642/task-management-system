import { Td, Text, Tfoot, Tr } from '@chakra-ui/react'

import columns from '../../pages/Employee/employeeColumns'
import TableRow from './TableRow'

const TableFoot = ({ data }) => {
  return (
    <Tfoot display='flex' justifyContent='center' alignItems='center' flexDirection='column' w='100%'>
      <TableRow columns={columns} data={data} isEdit={false} />
    </Tfoot>
  )
}

export default TableFoot
