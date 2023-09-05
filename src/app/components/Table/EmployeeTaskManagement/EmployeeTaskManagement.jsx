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

const EmployeeTaskManagement = ({ weekNumber, setWeekNumber, onClearKeyValues, onSortByTimeStamp, filters, onChangeSolvedUnSolved, filterIds, solvedUnSolvedFilters, setFilters, selectedYear, allWeeksInYear, selectYear, data, taskGroupsFilter, tasksFilter }) => {
  const dispatch = useDispatch()

  const isSelectedSolved = filters.solvedUnsolved.length === 0

  return (
    <TableWrapper>
      <TableHead>
        <TableHeadColumn onSortByTimeStamp={onSortByTimeStamp} isSelectedSolved={filters.solvedUnsolved.length === 0} />
        <TableFilter setWeekNumber={setWeekNumber} onClearKeyValues={onClearKeyValues} filters={filters} onChangeSolvedUnSolved={onChangeSolvedUnSolved} filterIds={filterIds} solvedUnSolvedFilters={solvedUnSolvedFilters} setFilters={setFilters} taskGroupsFilter={taskGroupsFilter} tasksFilter={tasksFilter} selectYear={selectYear} selectedYear={selectedYear} allWeeksInYear={allWeeksInYear} isSelectedSolved={isSelectedSolved} />
      </TableHead>
      <Tbody h='auto' display={'flex'} flexDirection={'column'} w={'100%'} paddingBottom={'20px'}>
        {data.length > 0 &&
          data?.map((data, index) =>
            data.customer_info ? (
              <TableRow key={index} alignItems={'flex-start'}>
                <Td paddingLeft={'20px'} h={'45px'} w={!isSelectedSolved ? '13.8%' : '15%'} fontWeight={600} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} fontSize={'14px'} border={0}>
                  <Text fontWeight={400} fontSize={'14px'}>
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
                      image={assets.icons.warning}
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                      h='14px'
                      w='14px'
                    />
                  )}
                </Td>
                <Td w={!isSelectedSolved ? '87%' : '85%'} border={0} padding={0}>
                  {/* Previous Tasks */}
                  <Tasks filters={filters} onChangeSolvedUnSolved={onChangeSolvedUnSolved} data={data.pastTasks} isSelectedSolved={isSelectedSolved} backgroundColor={colors.veryLightRed} isShowBorderByDefault={true} borderLeftColor={colors.lightRed} />
                  {/* Current Tasks */}
                  <Tasks filters={filters} onChangeSolvedUnSolved={onChangeSolvedUnSolved} data={data.currentTasks} isSelectedSolved={isSelectedSolved} isCurrentTask={true} borderLeft={weekNumber && 1} />
                  {/* Future Tasks */}
                  <Tasks filters={filters} onChangeSolvedUnSolved={onChangeSolvedUnSolved} data={data.futureTasks} isSelectedSolved={isSelectedSolved} />
                </Td>
              </TableRow>
            ) : null,
          )}
      </Tbody>
    </TableWrapper>
  )
}

export default EmployeeTaskManagement
