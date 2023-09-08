import { Box, Td } from '@chakra-ui/react'
import TableRow from './TableRow'
import Filter from '../../Filter'
import colors from '../../../config/colors'

const TableFilter = ({ setWeekNumber, filters, filterIds, solvedUnSolvedFilters, setFilters, selectYear, selectedYear, allWeeksInYear, taskGroupsFilter, tasksFilter }) => {
  const isSelectedSolved = filters.solvedUnsolved.length === 0

  return (
    <TableRow h={'40px'}>
      <Td w='15%' display={'flex'} alignItems={'center'} borderBottom={0} padding={0} margin={0}></Td>
      <Td w='23%' display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
        <Box paddingY={'10px'} position={'absolute'} w={!isSelectedSolved ? '20.2%' : '22.2%'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
          <Filter
            menuButtonMarginX='10px'
            selectYear={selectYear}
            selectedYear={selectedYear}
            data={allWeeksInYear}
            onSelectItem={(checked, item) => {
              setFilters(item, checked, 'week')
              setWeekNumber(null)
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
        <Box paddingY={'10px'} position={'absolute'} w={!isSelectedSolved ? '8.7%' : '9.7%'} cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
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
            dropDownContainerWidth='100px'
          />
        </Box>
      </Td>
      <Td w='20%' cursor={'pointer'} display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
        <Box paddingY={'10px'} position={'absolute'} w={!isSelectedSolved ? '17.5%' : '19.5%'} cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
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
        <Box paddingY={'10px'} position={'absolute'} w={!isSelectedSolved ? '9%' : '10%'} cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
          <Filter
            menuButtonMarginX='10px'
            data={solvedUnSolvedFilters}
            left={'-15px'}
            label={'All'}
            filterCheck={filterIds.solvedUnsolved}
            onSelectItem={(checked, item) => {
              setFilters(item, checked, 'solvedUnsolved', true)
            }}
            optionKey='name'
            dropDownContainerWidth={'250px'}
          />
        </Box>
      </Td>
      <Td w='5%' cursor={'pointer'} display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}></Td>
      <Td w='7%' cursor={'pointer'} display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}></Td>
      {!isSelectedSolved && <Td w='10%' cursor={'pointer'} display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}></Td>}
    </TableRow>
  )
}

export default TableFilter
