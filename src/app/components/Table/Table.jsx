import TableHead from './TableHead'
import TableBody from './TableBody'
import TableWrapper from './TableWrapper'

const Table = ({ columns = [], data, onOpenEditModal, titleFontSize, setEmployeeId, isEdit }) => {
  return (
    <TableWrapper>
      <TableHead titleFontSize={titleFontSize} columns={columns} />
      <TableBody isEdit={isEdit} columns={columns} data={data} onOpenEditModal={onOpenEditModal} setEmployeeId={setEmployeeId} />
    </TableWrapper>
  )
}

export default Table
