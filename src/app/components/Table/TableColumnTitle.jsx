import { Text, Th } from '@chakra-ui/react'

import colors from '../../config/colors'

const TableColumnTitle = ({ value }) => {
  return (
    <Th key={value.id} h={'100%'} border={0} p={0} px={0} w={'100%'} display={'flex'} alignItems={'space-around'} justifyContent={'center'} flexDirection={'column'} color={colors.black} className='table-heading' textTransform={'none'} fontSize={'14px'} fontWeight={600} letterSpacing={'1px'} textColor={value.highlight ? value.color : colors.black}>
      <Text fontSize='12px' fontStyle='normal' fontWeight={600}>
        {value.title}
      </Text>
      {value.subTitle && (
        <Text marginTop={'3px'} fontSize='12px' fontStyle='normal' fontWeight={400}>
          {value.subTitle}
        </Text>
      )}
    </Th>
  )
}
export default TableColumnTitle
