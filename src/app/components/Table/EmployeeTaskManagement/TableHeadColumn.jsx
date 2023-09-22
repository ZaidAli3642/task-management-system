import { Box, Td, Text } from '@chakra-ui/react'
import TableRow from './TableRow'
import Icon from '../../Icon'
import assets from '../../../assets/assets'

const TableHeadColumn = ({ sortOrderTimestamp, onSortByTimeStamp, isSelectedSolved }) => {
  return (
    <TableRow>
      <Td w='15%' borderBottom={0} padding={0} margin={0}>
        <Box display={'flex'} alignItems={'center'}>
          <Text marginLeft={'20px'} cursor={'pointer'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
            Name
          </Text>
        </Box>
      </Td>
      <Td w='23%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Text marginLeft={'10px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
            Date
          </Text>
          <Box display={'flex'} w={'50%'} justifyContent={'flex-start'}>
            <Text paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Week
            </Text>
            <Text marginLeft={'20px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Day
            </Text>
          </Box>
        </Box>
      </Td>
      <Td w='10%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
        <Text marginLeft={'10px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
          Task group
        </Text>
      </Td>
      <Td w='20%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
        <Text marginLeft={'10px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
          Task
        </Text>
      </Td>
      <Td w='10%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
        <Text marginLeft={'10px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
          Repetition
        </Text>
      </Td>
      <Td w='10%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Text marginLeft={'10px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
            Solve
          </Text>
          <Text marginRight={'40px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
            Skip
          </Text>
        </Box>
      </Td>
      <Td w='5%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
        <Text marginLeft={'10px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
          Note
        </Text>
      </Td>
      <Td w='7%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
        <Text marginLeft={'10px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
          Responsible
        </Text>
      </Td>
      {isSelectedSolved && (
        <Td w='10%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
          <Box cursor={'pointer'} onClick={() => onSortByTimeStamp()} w={'fit-content'} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
            <Text marginLeft={'10px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Timestamp
            </Text>
            <Icon display='flex' justifyContent='center' alignItems='center' image={sortOrderTimestamp === 'desc' ? assets.icons.swap : assets.icons.swap2} />
          </Box>
        </Td>
      )}
    </TableRow>
  )
}

export default TableHeadColumn
