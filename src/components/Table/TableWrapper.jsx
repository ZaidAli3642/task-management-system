import { Table } from '@chakra-ui/react'

const TableWrapper = ({ children, ...props }) => {
  return <Table {...props}>{children}</Table>
}

export default TableWrapper
