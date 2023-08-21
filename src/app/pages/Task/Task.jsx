import { Box } from '@chakra-ui/react'

import Breadcrumbs from '../../components/Breadcrumbs'
import { ButtonWithIcon } from '../../components/Form'
import taskBreadcrumb from './taskBreakcrumbs'
import TaskTable from '../../components/Table/Task/Task'

const Task = () => {
  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' my='20px' mx='30px'>
        <Breadcrumbs navigationLocation={taskBreadcrumb} />
        <Box>
          <ButtonWithIcon title='Add task group' size='medium' marginRight='10px' />
          <ButtonWithIcon title='Add task' size='medium' />
        </Box>
      </Box>

      <Box mx='30px'>
        <TaskTable />
      </Box>
    </>
  )
}

export default Task
