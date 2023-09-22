import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react'
import Icon from './Icon'
import colors from '../config/colors'
import { useNavigate } from 'react-router-dom'

const Breadcrumbs = ({ navigationLocation = [], navigationState = {}, onClick }) => {
  const lastIndex = index => index === navigationLocation.length - 1

  const navigate = useNavigate()

  return (
    <Breadcrumb
      border={1}
      separator={
        <Text color={colors.darkGrey} fontSize={'16px'} fontWeight={600}>
          /
        </Text>
      }
      borderColor={colors.lightGrey}
      borderStyle='solid'
      p='5px'
      borderRadius='40px'
      backgroundColor={colors.white}
      w='fit-content'
    >
      {navigationLocation.map((value, index) => (
        <BreadcrumbItem onClick={() => navigate(value.path, { state: navigationState })} key={value.id} backgroundColor={lastIndex(index) ? colors.lightGreen : 'transparent'} padding={lastIndex(index) ? '5px' : 0} paddingRight='10px' height='40px' borderRadius='40px' display='flex' justifyContent='space-between' alignItems='center' cursor='pointer'>
          {value.icon && (
            <Box marginRight='5px' display='flex' justifyContent='center' alignItems='center' w={lastIndex(index) ? '30px' : '40px'} height={lastIndex(index) ? '30px' : '40px'} borderRadius='full' backgroundColor={lastIndex(index) ? colors.darkGreen : colors.borderGrey}>
              <Icon display='flex' justifyContent='center' alignItems='center' image={value.icon} />
            </Box>
          )}
          <BreadcrumbLink color={index === navigationLocation.length - 1 ? colors.black : colors.darkGrey} marginLeft='5px' marginRight='5px' fontWeight={600} fontSize='16px' textDecoration='none'>
            {value.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default Breadcrumbs
