import { Box, Tbody, Td, Text } from '@chakra-ui/react'

import assets from '../../../assets/assets'
import TableWrapper from '../TableWrapper'
import TableHead from './TableHead'
import TableRow from './TableRow'
import Icon from '../../Icon'
import colors from '../../../config/colors'
import { ButtonWithIcon } from '../../Form'
import Filter from '../../Filter'
import { repetitionWeeklyDays } from '../../../constants/repetitions'
import { getDay, getMonthlyRepetition, getWeeklyRepetition, getYearlyRepetition } from '../../../utils/taskManagement'

const repetitionFunc = {
  weekly: getWeeklyRepetition,
  monthly: getMonthlyRepetition,
  yearly: getYearlyRepetition,
}

const getTaskRepetition = taskRepetition => {
  let text = ''

  text = repetitionFunc[taskRepetition?.repetition_type](taskRepetition)

  if (!text) return null

  return (
    <Text paddingBottom={'5px'} borderStyle={'solid'} color={colors.darkGrey} fontWeight={400} fontSize={'14px'} w={'100%'}>
      {text}
    </Text>
  )
}

const getWeeklyDays = taskRepetition => {
  let weeklyDays = ''

  if (taskRepetition?.repetition_type === 'weekly') {
    if (!taskRepetition.repetition_weekly_days) return null
    for (let [index, value] of taskRepetition.repetition_weekly_days.entries() || [].entries()) {
      weeklyDays += index === taskRepetition.repetition_weekly_days.length - 1 ? repetitionWeeklyDays[value] : `${repetitionWeeklyDays[value]}, `
    }
  } else if (taskRepetition?.repetition_type === 'monthly') {
    weeklyDays += getDay(taskRepetition?.repetition_monthly_week_day)?.day ?? ''
  } else {
    weeklyDays += getDay(taskRepetition?.repetition_yearly_day)?.day ?? ''
  }

  if (!weeklyDays) return null

  return (
    <Text paddingTop={'10px'} paddingX={0} borderStyle={'solid'} color={colors.black} fontWeight={400} fontSize={'14px'} w={'fit-content'}>
      {weeklyDays}
    </Text>
  )
}

const CustomerTaskManagement = ({ onOpenEditRepeat, data, onSortTaskGroup, onOpenBulkAssign, taskGroups, tasks, onFilter, taskGroupsFilter, tasksFilter, responsibles, responsiblesFilter, onOpenAddResponsible, onOpenNoteModal, onOpenRepeat }) => {
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
          <Td w='17%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} paddingLeft={'10px'} margin={0}>
            <Text marginLeft={'7px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
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
            <Box paddingY={'10px'} w='100%' background={colors.silver} paddingLeft={'10px'} cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'}>
              <Filter menuButtonMarginX='10px' isClosable={false} filterCheck={taskGroupsFilter} onSelectItem={(checked, item) => onFilter(checked, 'taskGroup', item)} data={taskGroups} left={'-15px'} label={'All'} optionKey='name' dropDownContainerWidth={'250px'} />
            </Box>
          </Td>
          <Td w='30%' display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
            <Box paddingY={'10px'} w='100%' paddingLeft={'2px'} cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
              <Filter menuButtonMarginX='10px' data={tasks} filterCheck={tasksFilter} onSelectItem={(checked, item) => onFilter(checked, 'tasks', item)} isClosable={false} left={'-15px'} label={'All'} optionKey='name' dropDownContainerWidth={'250px'} />
            </Box>
          </Td>
          <Td w='17%' cursor={'pointer'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
            <Box paddingY={'10px'} w='100%' paddingLeft={'2px'} cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
              <Filter menuButtonMarginX='10px' data={responsibles} filterCheck={responsiblesFilter} left={'-15px'} label={'All'} onSelectItem={(checked, item) => onFilter(checked, 'responsibles', item)} optionKey='first_name' dropDownContainerWidth={'250px'} />
            </Box>
          </Td>
        </TableRow>
      </TableHead>

      {data.length > 0 && (
        <Tbody paddingX={'20px'} h='auto' display={'flex'} flexDirection={'column'} w={'100%'} paddingBottom={'20px'}>
          {data.map((taskGroup, index) => (
            <TableRow key={taskGroup.uuid} alignItems={'flex-start'} borderBottom={data.length - 1 === index ? 0 : 1}>
              <Td role='group' paddingLeft={'0px'} paddingRight={'20px'} cursor={'pointer'} w={'20%'} fontWeight={600} display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'} fontSize={'14px'} border={0}>
                <Box>
                  <Text>{taskGroup.name}</Text>
                </Box>
                <Box display='none' _groupHover={{ display: 'flex' }}>
                  <Icon onClick={() => onOpenBulkAssign(taskGroup)} image={assets.icons.taskNote} w='18px' h='20px' />
                </Box>
              </Td>

              <Td w={'100%'} paddingLeft={'0'} paddingRight={'0'} paddingY={0} border={0}>
                {taskGroup.tasks.map((task, index) => (
                  <Box role='group' cursor={'pointer'} borderBottomWidth={taskGroup.tasks.length - 1 === index ? 0 : 1} borderBottomColor={colors.veryLightGrey} key={task.uuid} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                    <Box w={'36%'}>
                      <Text paddingY={'15px'} borderStyle={'solid'} fontWeight={400} fontSize={'14px'} w={'100%'}>
                        {task.name}
                      </Text>
                    </Box>

                    <>
                      <Box w={'22%'} position={'relative'}>
                        {task.task_item?.responsible || task?.task_item?.responsible_role === 'customer' ? (
                          <Box marginLeft={'2px'} onClick={() => onOpenAddResponsible(taskGroup, task, true)} paddingX={'10px'} paddingY={'5px'} borderWidth={1} borderColor={'white'} borderRadius='5px' role='group' _hover={{ background: colors.lightGreen, borderWidth: 1, borderColor: colors.mediumGreen, color: colors.darkGreen }} cursor={'pointer'} w={'fit-content'}>
                            <Text borderStyle={'solid'} fontWeight={400} fontSize={'14px'} _hover={{ color: colors.darkGreen }} w={'100%'}>
                              {task.task_item?.responsible?.first_name || task?.task_item?.responsible_role}
                            </Text>
                          </Box>
                        ) : (
                          <ButtonWithIcon marginLeft={'10px'} display='none' _groupHover={{ display: 'flex' }} title='Add responsible' onClick={() => onOpenAddResponsible(taskGroup, task)} size='small' h='33px' paddingX='10px' paddingY='5px' fontSize='14px' fontWeight={600} />
                        )}
                      </Box>
                      <Box w={'21%'} paddingLeft={'6px'}>
                        {task.task_item?.tasks_repetition ? (
                          <Box w={'fit-content'} onClick={() => onOpenEditRepeat(taskGroup, task)} cursor={'pointer'} display={'flex'} flexDirection={'column'}>
                            <Box display={'flex'}>{getWeeklyDays(task.task_item?.tasks_repetition || {})}</Box>
                            {getTaskRepetition(task.task_item?.tasks_repetition || {})}
                          </Box>
                        ) : (
                          <ButtonWithIcon display='none' _groupHover={{ display: 'flex' }} onClick={() => onOpenRepeat(taskGroup, task)} title='Add repetition' size='small' h='33px' paddingX='10px' paddingY='5px' fontSize='14px' fontWeight={600} />
                        )}
                      </Box>
                      <Box w={'21%'} paddingLeft={'0'}>
                        {task?.task_item?.notes ? <Icon onClick={() => onOpenNoteModal(taskGroup, task, true)} cursor='pointer' image={assets.icons.noteIcon} hoveredImage={assets.icons.noteIconGreen} w='20px' h='18px' /> : <ButtonWithIcon display='none' _groupHover={{ display: 'flex' }} onClick={() => onOpenNoteModal(taskGroup, task)} title='Add note' size='small' h='33px' fontSize='14px' paddingX='10px' paddingY='5px' fontWeight={600} />}
                      </Box>
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
