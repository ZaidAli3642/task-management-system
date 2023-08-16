import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import Icon from './Icon'
import colors from '../config/colors'

const Breadcrumbs = ({ iconImage, navigationLocation = [], text }) => {
  return (
    <Breadcrumb border={1} borderColor={colors.lightGrey} borderStyle='solid' p='5px' borderRadius='40px' backgroundColor={colors.white} w='fit-content'>
      {navigationLocation.map((value, index) => (
        <BreadcrumbItem key={value} backgroundColor={index === navigationLocation.length - 1 ? colors.lightGreen : colors.white} padding='5px' paddingRight='10px' height='40px' borderRadius='40px' display='flex' justifyContent='space-between' alignItems='center' cursor='pointer'>
          {iconImage && (
            <Box marginRight='5px' display='flex' justifyContent='center' alignItems='center' w='30px' height='30px' borderRadius='full' backgroundColor={colors.darkGreen}>
              <Icon display='flex' justifyContent='center' alignItems='center' image={iconImage} />
            </Box>
          )}
          <BreadcrumbLink marginLeft='5px' marginRight='5px' fontWeight={600} fontSize='16px' textDecoration='none'>
            {text}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  )
}

export default Breadcrumbs
