import { Box, Text } from '@chakra-ui/react'

const ShowTaskGroup = ({ taskGroup, isSelectedSolved }) => {
  return (
    <Box display={'flex'} paddingLeft={'10px'} w={!isSelectedSolved ? '10.5%' : '12%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text fontWeight={400} fontSize={'14px'}>
        {taskGroup}
      </Text>
    </Box>
  )
}

export default ShowTaskGroup
