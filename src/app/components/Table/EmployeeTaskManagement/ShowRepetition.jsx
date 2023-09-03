import { Box, Text } from '@chakra-ui/react'

const ShowRepetition = ({ repetition, isSelectedSolved }) => {
  return (
    <Box display={'flex'} paddingLeft={'10px'} w={!isSelectedSolved ? '11%' : '11.8%'} justifyContent={'flex-start'} alignItems={'center'}>
      <Text fontWeight={400} fontSize={'14px'}>
        {repetition}
      </Text>
    </Box>
  )
}

export default ShowRepetition
