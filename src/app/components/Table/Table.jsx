import TableHead from './TableHead'
import TableBody from './TableBody'
import TableWrapper from './TableWrapper'

const Table = ({ columns = [], data, onOpenEditModal, titleFontSize, setEmployeeId, isEdit, onCustomerClick }) => {
  return (
    <TableWrapper>
      <TableHead titleFontSize={titleFontSize} columns={columns} />
      <TableBody onCustomerClick={onCustomerClick} isEdit={isEdit} columns={columns} data={data} onOpenEditModal={onOpenEditModal} setEmployeeId={setEmployeeId} />
    </TableWrapper>
  )
}

export default Table
