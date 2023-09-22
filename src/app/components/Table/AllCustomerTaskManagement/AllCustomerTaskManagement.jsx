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
import { getDate, getDay, getMonth, getMonthlyRepetition, getWeekNo, getWeeklyRepetition, getYearlyRepetition } from '../../../utils/taskManagement'
import { useDispatch } from 'react-redux'
import { clientInfo, clientInfoModal } from '../../../redux/reducers/customerTaskManagement/customerTaskManagement'

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
    <Text borderStyle={'solid'} color={colors.darkGrey} fontWeight={400} fontSize={'14px'} className='task-repetition' w={'100%'}>
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
    if (taskRepetition?.repetition_monthly_date) weeklyDays += getDate(taskRepetition?.repetition_monthly_date)?.label + ' of the month' ?? ''
    else {
      weeklyDays += getWeekNo(taskRepetition?.repetition_monthly_week_no)?.week ?? ''
      weeklyDays += ' ' + getDay(taskRepetition?.repetition_monthly_week_day)?.day + ' of the month' ?? ''
    }
  } else {
    if (taskRepetition?.repetition_yearly_month_date) {
      weeklyDays += `${getDate(taskRepetition?.repetition_yearly_month_date)?.label ?? ''} of the ${getMonth(taskRepetition?.repetition_yearly_month)?.month ?? ''}`
    } else {
      weeklyDays += `${getWeekNo(taskRepetition?.repetition_yearly_week_no)?.week ?? ''} ${getDay(taskRepetition?.repetition_yearly_day).day ?? ''} of ${getMonth(taskRepetition?.repetition_yearly_month).month ?? ''}`
    }
  }

  if (!weeklyDays) return null

  return (
    <Text paddingX={0} borderStyle={'solid'} color={colors.black} lineHeight={'20px'} fontWeight={400} fontSize={'14px'} className='weekly-days' w={'fit-content'}>
      {weeklyDays}
    </Text>
  )
}

const AllCustomerTaskManagement = ({ customersSort, taskGroupSort, onOpenEditRepeat, onSortCustomers, onOpenRepeat, setCustomer, data, onSortTaskGroup, onOpenBulkAssign, taskGroups, tasks, onFilter, taskGroupsFilter, tasksFilter, responsibles, responsiblesFilter, onOpenAddResponsible, onOpenNoteModal }) => {
  const dispatch = useDispatch()

  return (
    <TableWrapper>
      <TableHead>
        <TableRow>
          <Td w='17%' borderBottom={0} padding={0} margin={0}>
            <Box onClick={onSortCustomers} display={'flex'} alignItems={'center'}>
              <Text marginLeft={'20px'} cursor={'pointer'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
                Customers
              </Text>
              <Icon cursor={'pointer'} image={customersSort === 'desc' ? assets.icons.swap : assets.icons.swap2} />
            </Box>
          </Td>
          <Td w='17%' borderBottom={0} padding={0} margin={0}>
            <Box onClick={onSortTaskGroup} display={'flex'} alignItems={'center'}>
              <Text marginLeft={'10px'} cursor={'pointer'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
                Task group
              </Text>
              <Icon cursor={'pointer'} image={taskGroupSort === 'desc' ? assets.icons.swap : assets.icons.swap2} />
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
          <Td w='15%' display={'flex'} position={'relative'} alignItems={'center'} borderBottom={0} padding={0} margin={0}></Td>
          <Td w='15%' display={'flex'} position={'relative'} alignItems={'center'} borderBottom={0} padding={0} margin={0}>
            <Box paddingY={'10px'} position={'absolute'} w='full' background={colors.silver} cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'}>
              <Filter isClosable={false} filterCheck={taskGroupsFilter} onSelectItem={(checked, item) => onFilter(checked, 'taskGroup', item)} data={taskGroups} left={'-15px'} label={'All'} optionKey='name' dropDownContainerWidth={'250px'} />
            </Box>
          </Td>
          <Td w='26%' display={'flex'} position={'relative'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
            <Box paddingY={'10px'} position={'absolute'} w='full' cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
              <Filter data={tasks} filterCheck={tasksFilter} onSelectItem={(checked, item) => onFilter(checked, 'tasks', item)} isClosable={false} left={'-15px'} label={'All'} optionKey='name' dropDownContainerWidth={'250px'} />
            </Box>
          </Td>
          <Td w='14.5%' position={'relative'} cursor={'pointer'} display={'flex'} alignItems={'center'} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
            <Box paddingY={'10px'} position={'absolute'} w='full' cursor={'pointer'} borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver}>
              <Filter data={responsibles} filterCheck={responsiblesFilter} left={'-15px'} label={'All'} onSelectItem={(checked, item) => onFilter(checked, 'responsibles', item)} optionKey='first_name' dropDownContainerWidth={'250px'} />
            </Box>
          </Td>
        </TableRow>
      </TableHead>

      {data.length > 0 && (
        <Tbody paddingX={'20px'} h='auto' display={'flex'} flexDirection={'column'} w={'100%'} paddingBottom={'20px'}>
          {data.map((customer, index) => (
            <TableRow paddingY='15px' key={index} alignItems={'flex-start'} borderBottom={data.length - 1 === index ? 0 : 1}>
              <Td w={'16.3%'} paddingLeft={'1px'} marginY={'5px'} fontWeight={600} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} fontSize={'14px'} border={0}>
                <Text lineHeight={'24px'}>{customer.name}</Text>
                {(customer?.description || customer?.code) && (
                  <Icon
                    cursor='pointer'
                    onClick={() => {
                      dispatch(clientInfo({ clientInfo: { code: customer.code, name: customer.name, description: customer.description } }))
                      dispatch(clientInfoModal(true))
                    }}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    marginLeft='5px'
                    image={assets.icons.info}
                    hoveredImage={assets.icons.infoHovered}
                    w='18px'
                    h='20px'
                  />
                )}
              </Td>
              <Td paddingLeft={'4.5px'} paddingRight={0} paddingY={0} w={'100%'} h={'fit-content'} fontWeight={600} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'flex-start'} fontSize={'14px'} border={0}>
                {customer.taskGroups.map((taskGroup, taskGroupIndex) => (
                  <>
                    <Box key={taskGroupIndex} paddingTop={'5px'} borderBottomWidth={customer.taskGroups.length - 1 === taskGroupIndex ? 0 : 1} borderColor={colors.veryLightGrey} w={'full'} borderStyle={'solid'} display={'flex'} justifyContent={'flex-start'} h={'full'} alignItems={'flex-start'}>
                      <Box role='group' paddingRight={'10px'} borderBottom={0} w='21.5%' marginY={'15px'} display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'}>
                        <Box>
                          <Text lineHeight={'24px'}>{taskGroup.name}</Text>
                        </Box>
                        <Box display='none' _groupHover={{ display: 'flex' }}>
                          <Icon
                            cursor='pointer'
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            onClick={() => {
                              setCustomer(customer)
                              onOpenBulkAssign(taskGroup)
                            }}
                            image={assets.icons.taskNote}
                            w='fit-content'
                            h='fit-content'
                          />
                        </Box>
                      </Box>

                      <Td w={'100%'} paddingLeft={'0px'} paddingRight={0} paddingY={0} border={0}>
                        {taskGroup.tasks.map((task, index) => (
                          <Box role='group' cursor={'pointer'} borderBottomWidth={taskGroup.tasks.length - 1 === index ? 0 : 1} borderBottomColor={colors.veryLightGrey} key={task.uuid} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                            <Box w={'37.3%'}>
                              <Text paddingY='15px' _groupHover={{ color: colors.darkGreen }} borderStyle={'solid'} fontWeight={400} fontSize={'14px'} w={'100%'}>
                                {task.name}
                              </Text>
                            </Box>

                            <>
                              <Box w={'21%'}>
                                {task.task_item?.responsible || task?.task_item?.responsible_role === 'customer' ? (
                                  <Box
                                    onClick={() => {
                                      setCustomer(customer)
                                      onOpenAddResponsible(taskGroup, task, true)
                                    }}
                                    paddingY={'5px'}
                                    paddingX={'9.5px'}
                                    borderRadius='5px'
                                    borderWidth={1}
                                    borderColor={'white'}
                                    role='group'
                                    _hover={{ background: colors.lightGreen, borderWidth: 1, borderColor: colors.mediumGreen, color: colors.darkGreen }}
                                    cursor={'pointer'}
                                    w={'fit-content'}
                                  >
                                    <Text borderStyle={'solid'} fontWeight={400} fontSize={'14px'} _hover={{ color: colors.darkGreen }} w={'100%'}>
                                      {task.task_item?.responsible?.first_name || 'Customer'}
                                    </Text>
                                  </Box>
                                ) : (
                                  <ButtonWithIcon
                                    background={colors.lightGrey}
                                    _hover={{ background: colors.white }}
                                    marginLeft='10px'
                                    h='33px'
                                    paddingX='10px'
                                    paddingY='5px'
                                    display='none'
                                    _groupHover={{ display: 'flex' }}
                                    title='Add responsible'
                                    onClick={() => {
                                      setCustomer(customer)
                                      onOpenAddResponsible(taskGroup, task)
                                    }}
                                    size='small'
                                    fontSize='14px'
                                    fontWeight={600}
                                  />
                                )}
                              </Box>
                              <Box w={'20%'} paddingLeft={'1px'}>
                                {task.task_item?.tasks_repetition ? (
                                  <Box
                                    className='repetition'
                                    css={{
                                      '&.repetition:hover > .weekly-days': { color: colors.darkGreen },
                                      '&.repetition:hover > .task-repetition': { color: colors.mediumGreen },
                                    }}
                                    w={'fit-content'}
                                    role='group'
                                    marginY={index === 0 && getWeeklyDays(task.task_item?.tasks_repetition || {}) ? '0px' : '5px'}
                                    marginBottom={'5px'}
                                    paddingX={'10px'}
                                    paddingY={'5px'}
                                    borderRadius={'5px'}
                                    borderWidth={1}
                                    borderColor={colors.white}
                                    _hover={{ background: colors.lightGreen, borderWidth: 1, borderColor: colors.mediumGreen, color: colors.darkGreen }}
                                    onClick={() => {
                                      setCustomer(customer)

                                      onOpenEditRepeat(taskGroup, task)
                                    }}
                                    cursor={'pointer'}
                                    display={'flex'}
                                    flexDirection={'column'}
                                  >
                                    {getWeeklyDays(task.task_item?.tasks_repetition || {})}
                                    {getTaskRepetition(task.task_item?.tasks_repetition || {})}
                                  </Box>
                                ) : (
                                  <ButtonWithIcon
                                    background={colors.lightGrey}
                                    _hover={{ background: colors.white }}
                                    h='33px'
                                    paddingX='10px'
                                    paddingY='5px'
                                    display='none'
                                    _groupHover={{ display: 'flex' }}
                                    title='Add repetition'
                                    onClick={() => {
                                      setCustomer(customer)
                                      onOpenRepeat(taskGroup, task)
                                    }}
                                    size='small'
                                    fontSize='14px'
                                    fontWeight={600}
                                  />
                                )}
                              </Box>
                              <Box paddingLeft={'20px'} w={'20%'}>
                                {task?.task_item?.notes ? (
                                  <Icon
                                    _hover={{ background: colors.lightGreen, borderWidth: 1, borderColor: colors.mediumGreen, color: colors.darkGreen }}
                                    borderWidth={1}
                                    borderColor={'white'}
                                    borderRadius='5px'
                                    cursor='pointer'
                                    image={assets.icons.noteIcon}
                                    hoveredImage={assets.icons.hoveredNoteIcon}
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    w='fit-content'
                                    paddingX='8px'
                                    paddingY='15px'
                                    marginLeft='3px'
                                    onClick={() => {
                                      setCustomer(customer)
                                      onOpenNoteModal(taskGroup, task, true)
                                    }}
                                  />
                                ) : (
                                  <ButtonWithIcon
                                    background={colors.lightGrey}
                                    _hover={{ background: colors.white }}
                                    marginLeft='10px'
                                    h='33px'
                                    paddingX='10px'
                                    paddingY='5px'
                                    display='none'
                                    _groupHover={{ display: 'flex' }}
                                    onClick={() => {
                                      setCustomer(customer)
                                      onOpenNoteModal(taskGroup, task)
                                    }}
                                    title='Add note'
                                    size='small'
                                    fontSize='14px'
                                    fontWeight={600}
                                  />
                                )}
                              </Box>
                            </>
                          </Box>
                        ))}
                      </Td>
                    </Box>
                  </>
                ))}
              </Td>
            </TableRow>
          ))}
        </Tbody>
      )}
    </TableWrapper>
  )
}

export default AllCustomerTaskManagement
