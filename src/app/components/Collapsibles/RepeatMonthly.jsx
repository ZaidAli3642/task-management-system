import { Box, Collapse, Text } from '@chakra-ui/react'
import { Input, Switch } from '../Form'
import Radio from '../Form/Radio'
import SelectBox from '../SelectBox'
import colors from '../../config/colors'

const RepeatMonthly = ({ toggleMonthly, isOpenMonthly }) => {
  return (
    <Box marginY={'20px'}>
      <Box mt={'10px'} display='flex' alignItems='center' justifyContent={'space-between'}>
        <Text fontSize={'16px'} fontWeight={600}>
          Monthly
        </Text>
        <Switch onChange={toggleMonthly} size='md' checked={isOpenMonthly} />
      </Box>
      <Collapse in={isOpenMonthly}>
        <Box borderBottom={1} borderBottomColor={colors.borderGrey} borderBottomStyle={'solid'} paddingBottom={'10px'}>
          <Box display={'flex'} justifyContent={'start'} alignItems={'center'}>
            <Text fontSize={'14px'} fontWeight={500} color={colors.black}>
              Repeat every
            </Text>
            <Input marginX='10px' w={'50px'} textAlign='center' />
            <Text fontSize={'14px'} fontWeight={500} color={colors.black}>
              months on the
            </Text>
          </Box>
          <Box marginTop={'5px'}>
            <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
              <Radio radioContainerStyles={{ margin: 0 }} />
              <SelectBox width='200px' marginX={'10px'} selectedOption={'1st'} />
            </Box>
            <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
              <Radio radioContainerStyles={{ margin: 0 }} />
              <SelectBox width='200px' marginX={'10px'} selectedOption={null} placeholder='First' />
              <SelectBox width='200px' marginX={'10px'} selectedOption={null} placeholder='Sunday' />
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}

export default RepeatMonthly
