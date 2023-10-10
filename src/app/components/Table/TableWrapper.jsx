import { Box, Table } from '@chakra-ui/react'
import colors from '../../config/colors'
import React from 'react'

const TableWrapper = React.forwardRef(({ children, id, tableBoxStyles, borderRadius = '10px', ...props }, ref) => {
  return (
    <Box style={tableBoxStyles} fontFamily={"'Roboto', sans-serif"} border={1} borderColor={colors.borderGrey} borderStyle='solid' borderRadius={borderRadius} overflow='hidden'>
      <Table id={id} ref={ref} borderRadius={'0'} w='100%' variant={'simple'} className='table' backgroundColor={colors.white} outline={'none'} {...props}>
        {children}
      </Table>
    </Box>
  )
})

export default TableWrapper
