import TableHead from './TableHead'
import TableBody from './TableBody'
import TableWrapper from './TableWrapper'

const Table = ({ columns = [], data, onOpenEditModal, titleFontSize }) => {
  return (
    <TableWrapper>
      <TableHead titleFontSize={titleFontSize} columns={columns} />
      <TableBody columns={columns} data={data} onOpenEditModal={onOpenEditModal} />
    </TableWrapper>
  )
}

export default Table
