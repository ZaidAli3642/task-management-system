import { Box, Text } from '@chakra-ui/react'

const ShowTask = ({ task, isSelectedSolved }) => {
  return (
    <Box display={'flex'} paddingLeft={'10px'} w={!isSelectedSolved ? '21.5%' : '23.5%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text fontWeight={400} fontSize={'14px'}>
        {task}
      </Text>
    </Box>
  )
}

export default ShowTask
