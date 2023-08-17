import { Box, Td, Text } from '@chakra-ui/react'

import assets from '../../../assets/assets'
import TableWrapper from '../TableWrapper'
import TableHead from './TableHead'
import TableRow from './TableRow'
import Icon from '../../Icon'
import colors from '../../../config/colors'

const CustomerTaskManagement = () => {
  return (
    <TableWrapper>
      <TableHead>
        <TableRow>
          <Td w='20%' borderBottom={0} padding={0} margin={0}>
            <Text marginLeft={'20px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Task Group
            </Text>
          </Td>
          <Td w='30%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
            <Text marginLeft={'20px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Task
            </Text>
          </Td>
          <Td w='17%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
            <Text marginLeft={'20px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Responsible
            </Text>
          </Td>
          <Td w='17%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
            <Text marginLeft={'20px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Repitition
            </Text>
          </Td>
          <Td w='17%' borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='16px' padding={0} margin={0}>
            <Text marginLeft={'20px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Note
            </Text>
          </Td>
        </TableRow>
        <TableRow>
          <Td w='20%' borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver} display={'flex'} alignItems={'center'} borderBottom={0} padding={0} margin={0}>
            <Text marginLeft={'20px'} cursor={'pointer'} paddingY={'10px'} textColor={colors.darkGreen} fontWeight={600} fontSize='14px' fontStyle={'normal'}>
              All
            </Text>
            <Icon display='flex' justifyContent='center' alignItems='center' image={assets.icons.chevronDownGreen} />
          </Td>
          <Td w='30%' borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver} display={'flex'} alignItems={'center'} textColor={colors.darkGreen} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
            <Text marginLeft={'20px'} cursor={'pointer'} paddingY={'10px'} textColor={colors.darkGreen} fontWeight={600} fontSize='14px' fontStyle={'normal'}>
              All
            </Text>
            <Icon display='flex' justifyContent='center' alignItems='center' image={assets.icons.chevronDownGreen} />
          </Td>
          <Td w='17%' borderRightColor={colors.borderGrey} borderRightWidth={1} borderStyle={'solid'} backgroundColor={colors.silver} cursor={'pointer'} display={'flex'} alignItems={'center'} textColor={colors.darkGreen} borderBottom={0} fontWeight={600} fontStyle={'normal'} fontSize='14px' padding={0} margin={0}>
            <Text marginLeft={'20px'} cursor={'pointer'} paddingY={'10px'} textColor={colors.darkGreen} fontWeight={600} fontSize='14px' fontStyle={'normal'}>
              All
            </Text>
            <Icon display='flex' justifyContent='center' alignItems='center' image={assets.icons.chevronDownGreen} />
          </Td>
        </TableRow>
      </TableHead>
    </TableWrapper>
  )
}

export default CustomerTaskManagement
