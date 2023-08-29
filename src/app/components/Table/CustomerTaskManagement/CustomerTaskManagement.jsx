import { Box, Tbody, Td, Text } from '@chakra-ui/react'

import assets from '../../../assets/assets'
import TableWrapper from '../TableWrapper'
import TableHead from './TableHead'
import TableRow from './TableRow'
import Icon from '../../Icon'
import colors from '../../../config/colors'
import { ButtonWithIcon } from '../../Form'
import Filter from '../../Filter'

const repititionType = {
  weekly: 'week',
  monthly: 'month',
  yearly: 'year',
}

const repitetionNo = {
  weekly: 'repetition_weekly_no',
  monthly: 'repetition_monthly_no',
  yearly: 'year',
}

const repetitionWeeklyDays = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
}

const CustomerTaskManagement = ({ data, onSortTaskGroup, onOpenBulkAssign, taskGroups, tasks, onFilter, taskGroupsFilter, tasksFilter, responsibles, responsiblesFilter, onOpenAddResponsible }) => {
  const getWeeklyDays = weekDaysInNumber => {
    let weeklyDays = ''

    for (let [index, value] of weekDaysInNumber.entries()) {
      weeklyDays += index === weekDaysInNumber.length - 1 ? repetitionWeeklyDays[value] : `${repetitionWeeklyDays[value]}, `
    }

    if (!weeklyDays) return null

    return (
      <Text paddingTop={'10px'} paddingX={0} borderStyle={'solid'} color={colors.black} fontWeight={400} fontSize={'14px'} w={'fit-content'}>
        {weeklyDays}
      </Text>
    )
  }

  return (
    <TableWrapper>
      <TableHead>
        <TableRow>
          <Td w='17%' borderBottom={0} padding={0} margin={0}>
            <Box onClick={onSortTaskGroup} display={'flex'} alignItems={'center'}>
              <Text marginLeft={'20px'} cursor={'pointer'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
                Task Group
              </Text>
              <Icon cursor={'pointer'} image={assets.icons.swap} />
            </Box>
          </Td>
          <Td w='30%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
            <Text marginLeft={'10px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Task
            </Text>
          </Td>
          <Td w='17%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
            <Text marginLeft={'10px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Responsible
            </Text>
          </Td>
          <Td w='17%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
            <Text marginLeft={'10px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Repetition
            </Text>
          </Td>
          <Td w='17%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
            <Text marginLeft={'10px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Note
            </Text>
          </Td>
        </TableRow>
        <TableRow h={'40px'}>
          <Td w='17%' display={'flex'} alignItems={'center'} borderBottom={0} padding={0} margin={0}>
            <Box paddingY={'10px'} position={'absolute'} w='16.5%' background={colors.silver} paddingLeft={'10px'} cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'}>
              <Filter isClosable={false} filterCheck={taskGroupsFilter} onSelectItem={(checked, item) => onFilter(checked, 'taskGroup', item)} data={taskGroups} left={'-15px'} label={'All'} optionKey='name' dropDownContainerWidth={'250px'} />
            </Box>
          </Td>
          <Td w='30%' display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
            <Box paddingY={'10px'} position={'absolute'} w='29%' cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
              <Filter data={tasks} filterCheck={tasksFilter} onSelectItem={(checked, item) => onFilter(checked, 'tasks', item)} isClosable={false} left={'-15px'} label={'All'} optionKey='name' dropDownContainerWidth={'250px'} />
            </Box>
          </Td>
          <Td w='17%' cursor={'pointer'} display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
            <Box paddingY={'10px'} position={'absolute'} w='17%' cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
              <Filter data={responsibles} filterCheck={responsiblesFilter} left={'-15px'} label={'All'} onSelectItem={(checked, item) => onFilter(checked, 'responsibles', item)} optionKey='first_name' dropDownContainerWidth={'250px'} />
            </Box>
          </Td>
        </TableRow>
      </TableHead>

      {data.length > 0 && (
        <Tbody h='auto' display={'flex'} flexDirection={'column'} w={'100%'} paddingBottom={'20px'}>
          {data.map((taskGroup, index) => (
            <TableRow key={taskGroup.uuid} alignItems={'flex-start'} borderBottom={data.length - 1 === index ? 0 : 1}>
              <Td role='group' paddingLeft={'20px'} cursor={'pointer'} w={'20%'} fontWeight={600} display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'} fontSize={'14px'} border={0}>
                <Box>
                  <Text>{taskGroup.name}</Text>
                </Box>
                <Box display='none' _groupHover={{ display: 'flex' }}>
                  <Icon onClick={() => onOpenBulkAssign()} image={assets.icons.taskNote} w='18px' h='20px' />
                </Box>
              </Td>

              <Td w={'100%'} paddingLeft={'10px'} paddingY={0} border={0}>
                {taskGroup.tasks.map((task, index) => (
                  <Box borderBottomWidth={taskGroup.tasks.length - 1 === index ? 0 : 1} borderBottomColor={colors.veryLightGrey} key={task.uuid} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                    <Box w={'37%'}>
                      <Text paddingY={'15px'} borderStyle={'solid'} fontWeight={400} fontSize={'14px'} w={'100%'}>
                        {task.name}
                      </Text>
                    </Box>

                    <>
                      <Box w={'21%'}>
                        {task.task_item?.responsible ? (
                          <Text paddingY={'15px'} borderStyle={'solid'} fontWeight={400} fontSize={'14px'} w={'100%'}>
                            {task.task_item?.responsible?.first_name}
                          </Text>
                        ) : (
                          <ButtonWithIcon title='Add responsible' onClick={() => onOpenAddResponsible(taskGroup, task)} size='small' height='30px' fontSize='14px' fontWeight={600} />
                        )}
                      </Box>
                      <Box w={'21%'}>
                        {task.task_item?.tasks_repetition ? (
                          <Box display={'flex'} flexDirection={'column'}>
                            <Box display={'flex'}>{getWeeklyDays(task.task_item?.tasks_repetition?.repetition_weekly_days || [])}</Box>
                            <Text paddingBottom={'5px'} borderStyle={'solid'} color={colors.darkGrey} fontWeight={400} fontSize={'14px'} w={'100%'}>
                              Every {task.task_item?.tasks_repetition?.[repitetionNo[task.task_item?.tasks_repetition?.repetition_type]]} {repititionType[task.task_item?.tasks_repetition?.repetition_type]}
                            </Text>
                          </Box>
                        ) : (
                          <ButtonWithIcon title='Add repetition' size='small' height='30px' fontSize='14px' fontWeight={600} />
                        )}
                      </Box>
                      <Box w={'21%'}>{task?.task_item?.notes ? <Icon image={assets.icons.noteIcon} w='20px' h='18px' /> : <ButtonWithIcon title='Add note' size='small' height='30px' fontSize='14px' fontWeight={600} />}</Box>
                    </>
                  </Box>
                ))}
              </Td>
            </TableRow>
          ))}
        </Tbody>
      )}
    </TableWrapper>
  )
}

export default CustomerTaskManagement
