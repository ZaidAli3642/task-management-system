import { Box, Td, Text } from '@chakra-ui/react'
import TableRow from './TableRow'
import Filter from '../../Filter'
import colors from '../../../config/colors'

const TableFilter = ({ name, onClearKeyValues, filterChanged, isSelectedSolved, setFilterChanged, setWeekNumber, filters, filterIds, solvedUnSolvedFilters, setFilters, selectYear, selectedYear, allWeeksInYear, taskGroupsFilter, tasksFilter }) => {
  return (
    <TableRow h={'45px'} paddingTop='5px'>
      <Td w='15%' display={'flex'} alignItems={'center'} borderBottom={0} padding={0} margin={0} paddingLeft={'20px'}>
        <Text fontWeight={600} fontSize={'14px'}>
          {name}
        </Text>
      </Td>
      <Td w='23%' display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
        <Box paddingY={'10px'} w={'100%'} borderLeftWidth={1} borderLeftColor={colors.borderGrey} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
          <Filter
            menuButtonMarginX='10px'
            selectYear={selectYear}
            selectedYear={selectedYear}
            data={allWeeksInYear}
            onClearKeyValues={onClearKeyValues}
            onSelectItem={(checked, item, isPreviousRemove) => {
              setFilters(item, checked, 'week', isPreviousRemove)
            }}
            filterCheck={filterIds.week}
            isClosable={false}
            left={'-15px'}
            label={'All'}
            optionKey='description'
          />
        </Box>
      </Td>
      <Td w='10%' cursor={'pointer'} display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
        <Box paddingY={'10px'} w={'100%'} cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
          <Filter
            menuButtonMarginX='10px'
            data={taskGroupsFilter}
            left={'-15px'}
            label={'All'}
            filterCheck={filterIds.taskGroup}
            onSelectItem={(checked, item) => {
              setFilters(item, checked, 'taskGroup')
            }}
            optionKey='name'
            // dropDownContainerWidth='100%'
          />
        </Box>
      </Td>
      <Td w='20%' cursor={'pointer'} display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
        <Box paddingY={'10px'} w={'100%'} cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
          <Filter
            menuButtonMarginX='10px'
            data={tasksFilter}
            left={'-15px'}
            filterCheck={filterIds.task}
            label={'All'}
            onSelectItem={(checked, item) => {
              setFilters(item, checked, 'task')
            }}
            optionKey='name'
            dropDownContainerWidth={'250px'}
          />
        </Box>
      </Td>
      <Td w='10%' cursor={'pointer'} display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}></Td>
      <Td w='10%' cursor={'pointer'} display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
        <Box paddingY={'10px'} w={'100%'} cursor={'pointer'} borderLeftWidth={1} borderLeftColor={colors.borderGrey} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
          <Filter
            menuButtonMarginX='10px'
            data={solvedUnSolvedFilters}
            left={'-15px'}
            label={'All'}
            filterCheck={filterIds.solvedUnsolved}
            onSelectItem={(checked, item) => {
              setFilterChanged(!filterChanged)
              setFilters(item, checked, 'solvedUnsolved', true)
            }}
            optionKey='name'
            dropDownContainerWidth={'134px'}
          />
        </Box>
      </Td>
      <Td w='5%' cursor={'pointer'} display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}></Td>
      <Td w='7%' cursor={'pointer'} display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}></Td>
      {isSelectedSolved && <Td w='10%' cursor={'pointer'} display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}></Td>}
    </TableRow>
  )
}

export default TableFilter
