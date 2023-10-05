import { Text, Th } from '@chakra-ui/react'

import colors from '../../config/colors'

const indexColor = {
  1: colors.red,
  2: colors.darkGreen,
}

const TableColumnTitle = ({ width, value, index, titleFontSize = '12px' }) => {
  return (
    <Th key={value.id} h={'100%'} border={0} p={0} px={0} w={width || '100%'} display={'flex'} alignItems={'space-around'} justifyContent={'center'} flexDirection={'column'} color={colors.black} className='table-heading' textTransform={'none'} fontSize={'14px'} fontWeight={600} letterSpacing={'1px'} textColor={indexColor[index] ? indexColor[index] : colors.black}>
      <Text width={'100px'} fontSize={titleFontSize} fontStyle='normal' fontWeight={600} letterSpacing={0}>
        {value?.title || `${value.weekFirstDate} - ${value.weekLastDate}`}
      </Text>
      {value?.week && (
        <Text marginTop={'3px'} fontSize='12px' fontStyle='normal' fontWeight={400}>
          {`Week ${value.week}`}
        </Text>
      )}
    </Th>
  )
}
export default TableColumnTitle
