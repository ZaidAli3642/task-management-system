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

const Tasks = ({ filterChanged, setTask, filters, isSelectedSolved, isShowBorderByDefault, onChangeSolvedUnSolved, data = [], backgroundColor = colors.white, borderLeft = 0, borderLeftColor = colors.mediumGreen }) => {
  const dispatch = useDispatch()

  const currentWeek = Number(localStorage.getItem('weekNo'))
  const length = data?.length
  const changedData = data

  console.log('data : ', data)
  return (
    <Box padding={0} margin={0} marginY={'10px'} w={'100%'} border={0}>
      {/* shows one line */}
      {data?.length > 0 &&
        data?.map((data, index) => (
          <Box paddingY={'5px'} minH={'55px'} background={backgroundColor} borderBottom={length - 1 === index ? 0 : 1} borderBottomColor={colors.veryLightGrey} borderLeft={currentWeek === data.week_no ? 1 : 0} borderLeftColor={borderLeftColor} borderStyle={'solid'} key={index} display={'flex'} alignItems={'center'}>
            {/* shows each line item  */}
            <ShowDate isSelectedSolved={!isSelectedSolved} date={data.week_range} day={data.week_day} weekNo={data.week_no} />
            {/* <ShowTaskGroup isSelectedSolved={!isSelectedSolved} taskGroup={data.week_no < currentWeek ? data?.task_item?.task_group_name : data?.task_item?.task_group?.name} /> */}
            <ShowTaskGroup isSelectedSolved={!isSelectedSolved} taskGroup={data?.task_group_name !== null ? data?.task_group_name : data?.task_item?.task?.task_group?.name} />
            {/* <ShowTask isSelectedSolved={!isSelectedSolved} task={data.week_no < currentWeek ? data?.task_item?.task_name : data?.completion_status === 'solved' || data?.completion_status === 'skipped' ? data?.task_item?.task_name : data?.task_item?.task?.name} /> */}
            <ShowTask isSelectedSolved={!isSelectedSolved} task={data?.task_name !== null ? data?.task_name : data?.week_no < currentWeek ? data?.task_item?.task_name : data?.task_item?.task?.name} />

            <ShowRepetition repetition={data?.task_item?.tasks_repetition || {}} isSelectedSolved={!isSelectedSolved} />
            <SolvedAndUnSolved changedData={data} filterChanged={filterChanged} onChangeSolvedUnSolved={(checked, completionStatus) => onChangeSolvedUnSolved(data.task_item_id, data.week_no, data.week_day, checked, completionStatus, data.occurance_date)} isSelectedSolved={isSelectedSolved} completionStatus={data?.completion_status} />
            <ShowNote
              note={data?.task_item?.notes}
              onClickNote={() => {
                setTask(data?.task_item?.task)
                dispatch(setNoteText({ noteText: data?.task_item?.notes }))
                dispatch(noteModal(true))
              }}
              isSelectedSolved={!isSelectedSolved}
            />
            <ShowResponsible isSelectedSolved={!isSelectedSolved} responsibleName={data?.task_item?.responsible?.first_name || 'Customer'} />
            <ShowTimeStamp name={data?.done_by?.first_name} timestamp={data?.done_at} isSelectedSolved={!isSelectedSolved} />
          </Box>
        ))}
    </Box>
  )
}

export default Tasks
