import { Box } from '@chakra-ui/react'
import colors from '../../../config/colors'
import ShowDate from './ShowDate'
import ShowTaskGroup from './ShowTaskGroup'
import ShowTask from './ShowTask'
import ShowRepetition from './ShowRepetition'
import SolvedAndUnSolved from './SolvedAndUnSolved'
import ShowNote from './ShowNote'
import ShowResponsible from './ShowResponsible'
import ShowTimeStamp from './ShowTimeStamp'
import { useDispatch } from 'react-redux'
import { noteModal, setNoteText } from '../../../redux/reducers/employeeTaskManagement/employeeTaskManagement'

const Tasks = ({ filters, isShowBorderByDefault, onChangeSolvedUnSolved, data = [], backgroundColor = colors.white, borderLeft = 0, borderLeftColor = colors.mediumGreen }) => {
  const isSelectedSolved = filters.solvedUnsolved.length === 0
  const dispatch = useDispatch()

  const currentWeek = Number(localStorage.getItem('weekNo'))

  return (
    <Box padding={0} margin={0} w={'100%'} border={0}>
      {/* shows one line */}
      {data?.length > 0 &&
        data?.map((data, index) => (
          <Box h={'55px'} background={backgroundColor} borderBottom={1} borderBottomColor={colors.veryLightGrey} borderLeft={currentWeek >= data.week_no ? 1 : 0} borderLeftColor={borderLeftColor} borderStyle={'solid'} key={index} display={'flex'} alignItems={'center'}>
            {/* shows each line item  */}
            <ShowDate isSelectedSolved={isSelectedSolved} date={data.weekRange} day={data.week_day} weekNo={data.week_no} />
            <ShowTaskGroup isSelectedSolved={isSelectedSolved} taskGroup={data.week_no < currentWeek ? data?.taskItem?.task_group_name : data?.taskItem?.task_group?.name} />
            <ShowTask isSelectedSolved={isSelectedSolved} task={data.week_no < currentWeek ? data?.taskItem?.task_name : data?.taskItem?.task?.name} />
            <ShowRepetition repetition={data?.taskItem?.tasks_repetition || {}} isSelectedSolved={isSelectedSolved} />
            <SolvedAndUnSolved onChangeSolvedUnSolved={(checked, completionStatus) => onChangeSolvedUnSolved(data.task_item_id, data.week_no, data.week_day, checked, completionStatus)} isSelectedSolved={isSelectedSolved} completionStatus={data?.completion_status} />
            <ShowNote
              note={data?.taskItem?.notes}
              onClickNote={() => {
                dispatch(setNoteText({ noteText: data?.taskItem?.notes }))
                dispatch(noteModal(true))
              }}
              isSelectedSolved={isSelectedSolved}
            />
            <ShowResponsible isSelectedSolved={isSelectedSolved} responsibleName={data?.taskItem?.responsible?.first_name || 'customer'} />
            <ShowTimeStamp name={data?.completedTask?.done_by?.first_name} timestamp={data?.completedTask?.updated_at} isSelectedSolved={isSelectedSolved} />
          </Box>
        ))}
    </Box>
  )
}

export default Tasks
