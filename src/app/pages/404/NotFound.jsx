import { Box, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Form'

const NotFound = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' minHeight='100vh'>
      <Heading fontSize='3rem' color='#fb4364'>
        404 Not Found
      </Heading>
      <Text fontSize='1.5rem' color='#1ba076' marginTop='1rem'>
        Oops! The page you're looking for doesn't exist.
      </Text>
      <Button title='Go Back' color='default' marginTop='25px' onClick={goBack} />
    </Box>
  )
}

export default NotFound
