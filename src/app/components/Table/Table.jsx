import TableHead from './TableHead'
import TableBody from './TableBody'
import TableWrapper from './TableWrapper'

const Table = ({ columns = [], data, onOpenEditModal, titleFontSize, setEmployeeId, isEdit, onClickItem }) => {
  return (
    <TableWrapper>
      <TableHead titleFontSize={titleFontSize} columns={columns} />
      <TableBody onClickItem={onClickItem} isEdit={isEdit} columns={columns} data={data} onOpenEditModal={onOpenEditModal} setEmployeeId={setEmployeeId} />
    </TableWrapper>
  )
}

export default Table
