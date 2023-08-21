import { Tbody, Td, Text, Tr } from '@chakra-ui/react'
import TableHead from '../CustomerTaskManagement/TableHead'
import TableRow from '../CustomerTaskManagement/TableRow'
import TableWrapper from '../TableWrapper'
import Icon from '../../Icon'
import assets from '../../../assets/assets'
import colors from '../../../config/colors'

const Task = () => {
  return (
    <TableWrapper>
      <TableHead>
        <TableRow>
          <Td w='20%' display={'flex'} justifyContent={'start'} alignItems='center' borderBottom={0} padding={0} margin={0}>
            <Text marginLeft={'20px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Task group
            </Text>
            <Icon image={assets.icons.swap} />
          </Td>

          <Td w='20%' borderBottom={0} padding={0} margin={0}>
            <Text marginLeft={'20px'} paddingY='20px' fontWeight={600} fontStyle={'normal'} fontSize='16px'>
              Task
            </Text>
          </Td>
        </TableRow>
      </TableHead>
      <Tbody h='auto' display={'flex'} flexDirection={'column'} w={'100%'}>
        <TableRow alignItems={'flex-start'}>
          <Td w={'20%'} border={0}>
            Finance
          </Td>

          <Td w={'100%'}>
            <Text paddingY={'15px'} borderBottomWidth={1} borderBottomColor={colors.veryLightGrey} borderStyle={'solid'} fontWeight={400} fontSize={'14px'} w={'100%'}>
              Hello
            </Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
          </Td>
        </TableRow>
        <TableRow>
          <Td w={'20%'}>Finance</Td>

          <Td w={'100%'}>
            <Text paddingY={'15px'} borderBottomWidth={1} borderBottomColor={colors.veryLightGrey} borderStyle={'solid'} fontWeight={400} fontSize={'14px'} w={'100%'}>
              Hello
            </Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
          </Td>
        </TableRow>
      </Tbody>
    </TableWrapper>
  )
}

export default Task
