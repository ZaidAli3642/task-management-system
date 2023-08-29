import { Box, Text } from '@chakra-ui/react'
import colors from '../config/colors'

const Badge = ({ label, ...props }) => {
  return (
    <Box bg={colors.lightGreen} display={'flex'} justifyContent={'center'} alignItems={'center'} paddingY='5px' paddingX={'15px'} border='1px' borderColor={colors.mediumGreen} w={'fit-content'} borderRadius='5px' {...props}>
      <Text fontSize={'14px'} fontWeight={500}>
        {label}
      </Text>
    </Box>
  )
}

export default Badge
