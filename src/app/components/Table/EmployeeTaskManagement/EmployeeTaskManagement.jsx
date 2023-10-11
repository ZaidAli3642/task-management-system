import { Box, Flex, Tbody, Td, Text } from '@chakra-ui/react'

import assets from '../../../assets/assets'
import TableWrapper from '../TableWrapper'
import TableHead from './TableHead'
import TableRow from './TableRow'
import Icon from '../../Icon'
import colors from '../../../config/colors'
import TableHeadColumn from './TableHeadColumn'
import TableFilter from './TableFilter'
import Tasks from './Tasks'
import { useDispatch } from 'react-redux'
import { clientInfo, clientInfoModal } from '../../../redux/reducers/employeeTaskManagement/employeeTaskManagement'
import { useState } from 'react'

const EmployeeTaskManagement = ({ name, position, offsetTop, onClearKeyValues, filterChanged, setFilterChanged, setTask, sortOrderTimestamp, weekNumber, setWeekNumber, onSortByTimeStamp, filters, onChangeSolvedUnSolved, filterIds, solvedUnSolvedFilters, setFilters, selectedYear, allWeeksInYear, selectYear, data, taskGroupsFilter, tasksFilter }) => {
  const dispatch = useDispatch()

  const isSelectedSolved = filters.solvedUnsolved.length !== 0 && filters.solvedUnsolved[0].value === 'solved'

  const length = data?.length

  return (
    <TableWrapper>
      <TableHead>
        <TableHeadColumn sortOrderTimestamp={sortOrderTimestamp} onSortByTimeStamp={onSortByTimeStamp} isSelectedSolved={isSelectedSolved} />
        <Box id='sticky-ref' zIndex={1} background={'transparent'} width={'100%'}>
          <Box background={'white'}>
            <TableFilter name={name} filterChanged={filterChanged} setFilterChanged={setFilterChanged} setWeekNumber={setWeekNumber} onClearKeyValues={onClearKeyValues} filters={filters} filterIds={filterIds} solvedUnSolvedFilters={solvedUnSolvedFilters} setFilters={setFilters} taskGroupsFilter={taskGroupsFilter} tasksFilter={tasksFilter} selectYear={selectYear} selectedYear={selectedYear} allWeeksInYear={allWeeksInYear} isSelectedSolved={isSelectedSolved} />
          </Box>
        </Box>

        {/* {name && <Box h={'45px'} paddingTop='5px'></Box>} */}
      </TableHead>
      <Tbody h='auto' display={'flex'} flexDirection={'column'} w={'100%'} paddingBottom={'20px'}>
        {data.length > 0 &&
          data?.map((data, index) =>
            data.customer_info ? (
              <TableRow borderBottom={index === length - 1 ? 0 : 1} key={index} alignItems={'flex-start'}>
                <Td paddingLeft={'20px'} h={'45px'} w={isSelectedSolved ? '13.8%' : '15%'} fontWeight={600} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} fontSize={'14px'} border={0}>
                  <Text fontWeight={600} fontSize={'14px'}>
                    {data.customer_info.name}
                  </Text>
                  {(data?.customer_info?.description || data?.customer_info?.code) && (
                    <Icon
                      cursor='pointer'
                      onClick={() => {
                        dispatch(clientInfo({ clientInfo: data?.customer_info || {} }))
                        dispatch(clientInfoModal(true))
                      }}
                      marginLeft='5px'
                      image={assets.icons.info}
                      hoveredImage={assets.icons.infoHovered}
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                      h='14px'
                      w='14px'
                    />
                  )}
                </Td>
                <Td w={isSelectedSolved ? '87%' : '85%'} marginBottom={'20px'} border={0} padding={0}>
                  {/* Previous Tasks */}
                  <Tasks filterChanged={filterChanged} setTask={setTask} filters={filters} onChangeSolvedUnSolved={(...rest) => onChangeSolvedUnSolved(...rest, 'past')} data={data.pastTasks} isSelectedSolved={isSelectedSolved} backgroundColor={colors.veryLightRed} isShowBorderByDefault={true} borderLeftColor={colors.lightRed} />
                  {/* Current Tasks */}
                  <Tasks filterChanged={filterChanged} setTask={setTask} filters={filters} onChangeSolvedUnSolved={onChangeSolvedUnSolved} data={data.currentTasks} isSelectedSolved={isSelectedSolved} isCurrentTask={true} borderLeft={weekNumber && 1} />
                  {/* Future Tasks */}
                  <Tasks filterChanged={filterChanged} setTask={setTask} filters={filters} onChangeSolvedUnSolved={onChangeSolvedUnSolved} data={data.futureTasks} isSelectedSolved={isSelectedSolved} />
                </Td>
              </TableRow>
            ) : null,
          )}
      </Tbody>
    </TableWrapper>
  )
}

export default EmployeeTaskManagement
