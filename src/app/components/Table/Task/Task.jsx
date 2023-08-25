import { Box, Tbody, Td, Text, Tr } from '@chakra-ui/react'
import TableHead from '../CustomerTaskManagement/TableHead'
import TableRow from '../CustomerTaskManagement/TableRow'
import TableWrapper from '../TableWrapper'
import Icon from '../../Icon'
import assets from '../../../assets/assets'
import colors from '../../../config/colors'

const Task = ({ taskGroupsAndTasks = [], onEditTaskGroup, onEditTask, onAddTask, onSortTaskGroup }) => {
  return (
    <TableWrapper>
      <TableHead>
        <TableRow>
          <Td w='20%' borderBottom={0} padding={0} margin={0}>
            <Box onClick={onSortTaskGroup} display={'flex'} justifyContent={'start'} alignItems='center' w={'fit-content'}>
              <Text cursor={'pointer'} marginLeft={'20px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
                Task group
              </Text>
              <Icon cursor={'pointer'} image={assets.icons.swap} />
            </Box>
          </Td>

          <Td w='20%' borderBottom={0} padding={0} margin={0}>
            <Text paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Task
            </Text>
          </Td>
        </TableRow>
      </TableHead>
      <Tbody h='auto' display={'flex'} flexDirection={'column'} w={'100%'} paddingBottom={'20px'}>
        {taskGroupsAndTasks.map((taskGroup, index) => (
          <TableRow key={taskGroup.uuid} alignItems={'flex-start'} borderBottom={taskGroupsAndTasks.length - 1 === index ? 0 : 1}>
            <Td role='group' cursor={'pointer'} w={'20%'} fontWeight={600} display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'} fontSize={'14px'} border={0}>
              <Box>
                <Text>{taskGroup.name}</Text>
                <Text fontSize={'14px'} fontWeight={400} color={colors.darkGrey}>
                  {taskGroup.customers_count} customers with tasks
                </Text>
              </Box>
              <Box display='none' _groupHover={{ display: 'flex' }} justifyContent={'center'} alignItems={'center'}>
                <Icon onClick={() => onAddTask(taskGroup)} image={assets.icons.add} width='16px' height='16px' />
                <Icon onClick={() => onEditTaskGroup(taskGroup)} image={assets.icons.edit} marginLeft='10px' width='16px' height='16px' />
              </Box>
            </Td>

            <Td w={'100%'} marginLeft={'30px'} paddingY={0} border={0}>
              {taskGroup.tasks.map((task, index) => (
                <Box role='group' cursor={'pointer'} onClick={() => onEditTask(taskGroup, task)} key={task.uuid} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <Text paddingY={'15px'} borderBottomWidth={taskGroup.tasks.length - 1 === index ? 0 : 1} borderBottomColor={colors.veryLightGrey} borderStyle={'solid'} fontWeight={400} fontSize={'14px'} w={'100%'}>
                    {task.name}
                  </Text>
                  <Icon display='none' _groupHover={{ display: 'block' }} image={assets.icons.edit} />
                </Box>
              ))}
            </Td>
          </TableRow>
        ))}
      </Tbody>
    </TableWrapper>
  )
}

export default Task
