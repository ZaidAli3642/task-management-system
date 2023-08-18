import { Box, Table } from '@chakra-ui/react'
import colors from '../../config/colors'

const TableWrapper = ({ children, tableBoxStyles, ...props }) => {
  return (
    <Box style={tableBoxStyles} fontFamily={"'Roboto', sans-serif"} border={1} borderColor={colors.borderGrey} borderStyle='solid' borderRadius='10px' overflow='hidden'>
      <Table borderRadius={'0'} w='100%' variant={'simple'} className='table' backgroundColor={colors.white} outline={'none'} {...props}>
        {children}
      </Table>
    </Box>
  )
}

export default TableWrapper
