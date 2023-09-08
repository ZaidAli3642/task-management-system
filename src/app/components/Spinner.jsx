import { Box, Spinner as ChakraSpinner, Flex } from '@chakra-ui/react'
import colors from '../config/colors'

const Spinner = ({ isLoading, size = 'lg', color = colors.darkGreen, ...props }) => {
  if (!isLoading) return null

  return (
    <Flex width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <ChakraSpinner color={color} size={size} {...props} />
    </Flex>
  )
}

export default Spinner
