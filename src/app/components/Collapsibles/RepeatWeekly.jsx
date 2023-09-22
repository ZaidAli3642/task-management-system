import { Box, Collapse, FormErrorMessage, Text } from '@chakra-ui/react'
import { Checkbox, Input, Switch } from '../Form'
import colors from '../../config/colors'

const weekDays1 = [
  { id: 1, label: 'Monday' },
  { id: 2, label: 'Tuesday' },
  { id: 3, label: 'Wednesday' },
  { id: 4, label: 'Thursday' },
]
const weekDays2 = [
  { id: 5, label: 'Friday' },
  { id: 6, label: 'Saturday' },
  { id: 7, label: 'Sunday' },
]

const RepeatWeekly = ({ repetitionWeeklyDays, toggleWeekly, isOpenWeekly, errorMessage, onChange, inputFieldsWeekly }) => {
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
          <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-start'}>
            <Box marginY={0} paddingY={0} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Text fontSize={'14px'} fontWeight={500} color={colors.black}>
                Repeat every
              </Text>
              <Input value={inputFieldsWeekly?.repetitionWeeklyNo} onChange={onChange} name='repetitionWeeklyNo' isShowErrorMessage={false} errorMessage={errorMessage?.repetitionWeeklyNo} marginX='10px' w={'50px'} textAlign='center' />
              <Text fontSize={'14px'} fontWeight={500} color={colors.black}>
                weeks
              </Text>
            </Box>
            {errorMessage?.repetitionWeeklyNo && <FormErrorMessage>{errorMessage?.repetitionWeeklyNo}</FormErrorMessage>}
          </Box>
          <Box marginTop={'5px'}>
            <Text fontSize={'14px'} fontWeight={400} color={colors.black}>
              Specify repeat days
            </Text>
            <Box marginY={'10px'} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
              {weekDays1.map(weekDay => (
                <Checkbox key={weekDay.id} isChecked={true} checked={repetitionWeeklyDays?.includes(weekDay.id)} onChange={checked => onChange({ target: { value: weekDay.id, name: 'repetitionWeeklyDays', checked } })} marginRight='30px' label={weekDay.label} />
              ))}
            </Box>
            <Box marginBottom={'10px'} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
              {weekDays2.map((weekDay, index) => (
                <Checkbox key={weekDay.id} isChecked={true} checked={repetitionWeeklyDays?.includes(weekDay.id)} marginLeft={index === 1 && '12px'} onChange={checked => onChange({ target: { value: weekDay.id, name: 'repetitionWeeklyDays', checked } })} marginRight='30px' label={weekDay.label} />
              ))}
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}

export default RepeatWeekly
