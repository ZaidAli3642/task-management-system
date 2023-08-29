import { Box, Collapse, Text } from '@chakra-ui/react'
import { Checkbox, Input, Switch } from '../Form'
import colors from '../../config/colors'

const RepeatWeekly = ({ toggleWeekly, isOpenWeekly }) => {
  return (
    <Box marginY={'20px'} w={'full'}>
      <Box mt={'10px'} display='flex' alignItems='center' justifyContent={'space-between'}>
        <Text fontSize={'16px'} fontWeight={600}>
          Weekly
        </Text>
        <Switch onChange={toggleWeekly} size='md' checked={isOpenWeekly} />
      </Box>
      <Collapse in={isOpenWeekly}>
        <Box borderBottom={1} borderBottomColor={colors.borderGrey} borderBottomStyle={'solid'} paddingBottom={'10px'}>
          <Box display={'flex'} justifyContent={'start'} alignItems={'center'}>
            <Text fontSize={'14px'} fontWeight={500} color={colors.black}>
              Repeat every
            </Text>
            <Input marginX='10px' w={'50px'} textAlign='center' />
            <Text fontSize={'14px'} fontWeight={500} color={colors.black}>
              weeks
            </Text>
          </Box>
          <Box marginTop={'5px'}>
            <Text fontSize={'14px'} fontWeight={400} color={colors.black}>
              Specify Repeat Days
            </Text>
            <Box marginY={'10px'} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
              <Checkbox marginRight='30px' label={'Monday'} />
              <Checkbox marginRight='30px' label={'Tuesday'} />
              <Checkbox marginRight='30px' label={'Wednesday'} />
              <Checkbox marginRight='30px' label={'Thursday'} />
            </Box>
            <Box marginBottom={'10px'} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
              <Checkbox marginRight='30px' label={'Friday'} />
              <Checkbox marginLeft='12px' marginRight='30px' label={'Saturday'} />
              <Checkbox marginRight='30px' label={'Sunday'} />
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}

export default RepeatWeekly
