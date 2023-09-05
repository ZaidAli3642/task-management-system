import { Box, Text } from '@chakra-ui/react'
import { repetitionWeeklyDays } from '../../../constants/repetitions'
import { getDay } from '../../../utils/taskManagement'

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

  return (
    <Text fontWeight={400} fontSize={'14px'}>
      {weeklyDays}
    </Text>
  )
}

const ShowRepetition = ({ repetition, isSelectedSolved }) => {
  return (
    <Box display={'flex'} paddingLeft={'10px'} w={!isSelectedSolved ? '11%' : '11.8%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text fontWeight={400} fontSize={'14px'}>
        {getWeeklyDays(repetition)}
      </Text>
    </Box>
  )
}

export default ShowRepetition
