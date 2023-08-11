import TableHead from './TableHead'
import TableBody from './TableBody'
import TableWrapper from './TableWrapper'

const Table = ({ columns = [], data }) => {
  return (
    <TableWrapper>
      <TableHead columns={columns} />
      <TableBody columns={columns} data={data} />
    </TableWrapper>
  )
}

export default Table
