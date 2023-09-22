import { Box, Text } from '@chakra-ui/react'

const ShowResponsible = ({ isSelectedSolved, responsibleName }) => {
  return (
    <Box display={'flex'} paddingLeft={'5px'} w={!isSelectedSolved ? '7.5%' : '5.5%'} justifyContent={'space-between'} alignItems={'center'}>
      <Text fontWeight={400} fontSize={'14px'}>
        {responsibleName}
      </Text>
    </Box>
  )
}

export default ShowResponsible
