import { Text, Th } from '@chakra-ui/react'

import colors from '../../config/colors'

const TableColumnTitle = ({ value }) => {
  return (
    <Th key={value.id} h={'100%'} w={'100%'} display={'flex'} alignItems={'space-around'} justifyContent={'center'} flexDirection={'column'} borderBottom={2} borderStyle={'solid'} borderBottomColor={value.highlight ? value.color : colors.lightGrey} color={colors.black} className='table-heading' textTransform={'none'} fontSize={'14px'} fontWeight={600} letterSpacing={'1px'} textColor={value.highlight ? value.color : colors.black}>
      <Text>{value.title}</Text>
      {value.subTitle && (
        <Text marginTop={'10px'} fontWeight={400}>
          {value.subTitle}
        </Text>
      )}
    </Th>
  )
}
export default TableColumnTitle
