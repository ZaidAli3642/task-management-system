import { Box, Text } from '@chakra-ui/react'
import moment from 'moment'
import colors from '../../../config/colors'

const ShowTimeStamp = ({ isSelectedSolved, timestamp, name }) => {
  if (isSelectedSolved) return null
  let formattedTimestamp = ''

  if (timestamp) {
    const parsedTimestamp = moment(timestamp)
    formattedTimestamp = parsedTimestamp.format('D MMM YYYY - HH:mm')
  }

  return (
    <Box display={'flex'} flexDirection={'column'} w={'10%'} justifyContent={'center'} alignItems={'flex-start'}>
      <Text fontWeight={400} fontSize={'14px'}>
        {formattedTimestamp}
      </Text>
      <Text color={colors.darkGrey} fontWeight={400} fontSize={'14px'}>
        {name}
      </Text>
    </Box>
  )
}

export default ShowTimeStamp
