import { Box, Text } from '@chakra-ui/react'
import { days } from '../../../constants/dates'

const ShowDate = ({ isSelectedSolved, date, day, weekNo }) => {
  const weekDay = days.find(dayItem => dayItem.id === day)

  return (
    <Box display={'flex'} w={!isSelectedSolved ? '24.3%' : '27%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Box w={!isSelectedSolved ? '80%' : '75%'} paddingLeft={'10px'} display={'flex'} justifyContent={'space-between'}>
        <Text fontWeight={400} fontSize={'14px'}>
          {date}
        </Text>
        <Box display={'flex'} w={'30%'}>
          <Text fontWeight={400} fontSize={'14px'}>
            {weekNo}
          </Text>
          {day && (
            <Text fontWeight={400} fontSize={'14px'} marginLeft={'25px'}>
              {weekDay?.day}
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ShowDate
