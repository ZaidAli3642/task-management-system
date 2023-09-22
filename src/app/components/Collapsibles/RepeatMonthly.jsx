import { Box, Collapse, FormErrorMessage, Text } from '@chakra-ui/react'
import { Input, Switch } from '../Form'
import Radio from '../Form/Radio'
import SelectBox from '../SelectBox'
import colors from '../../config/colors'
import { datesWithPostfixes, totalWeeksInMonth, days } from '../../constants/dates'

const RepeatMonthly = ({ radioChecked, monthlyRadio, toggleMonthly, isOpenMonthly, onChange, errorMessage, setMonthlyRadio, inputFieldsMonthly }) => {
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
          <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-start'}>
            <Box marginY={0} paddingY={0} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Text fontSize={'14px'} fontWeight={500} color={colors.black}>
                Repeat every
              </Text>
              <Input onChange={onChange} value={inputFieldsMonthly?.repetitionMonthlyNo} name='repetitionMonthlyNo' isShowErrorMessage={false} errorMessage={errorMessage?.repetitionMonthlyNo} marginX='10px' w={'50px'} textAlign='center' />
              <Text fontSize={'14px'} fontWeight={500} color={colors.black}>
                months on the
              </Text>
            </Box>
            {errorMessage?.repetitionMonthlyNo && <FormErrorMessage>{errorMessage?.repetitionMonthlyNo}</FormErrorMessage>}
          </Box>
          <Box marginTop={'5px'}>
            <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
              <Radio
                defaultChecked={true}
                checked={radioChecked === 1}
                onChange={() => {
                  setMonthlyRadio(1)
                }}
                name='monthly'
                id='monthly-1'
                radioContainerStyles={{ margin: 0 }}
              />
              <SelectBox isRadioSelection={true} options={datesWithPostfixes} selectedRadio={monthlyRadio !== 1} onSelect={option => onChange({ target: { name: 'repetitionMonthlyDate', value: option } })} isPositionRelative={false} showOption={'label'} width='200px' marginX={'10px'} selectedOption={inputFieldsMonthly.repetitionMonthlyDate?.label} />
            </Box>
            <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
              <Radio name='monthly' checked={radioChecked === 2} onChange={() => setMonthlyRadio(2)} id='monthly-2' radioContainerStyles={{ margin: 0 }} />
              <SelectBox isRadioSelection={true} width='200px' selectedRadio={monthlyRadio !== 2} isPositionRelative={false} onSelect={option => onChange({ target: { name: 'repetitionMonthlyWeekNo', value: option } })} options={totalWeeksInMonth} showOption={'week'} marginX={'10px'} selectedOption={inputFieldsMonthly.repetitionMonthlyWeekNo?.week} placeholder='First' />
              <SelectBox isRadioSelection={true} width='200px' selectedRadio={monthlyRadio !== 2} isPositionRelative={false} onSelect={option => onChange({ target: { name: 'repetitionMonthlyWeekDay', value: option } })} options={days} showOption={'day'} marginX={'0px'} selectedOption={inputFieldsMonthly.repetitionMonthlyWeekDay?.day} placeholder='Sunday' />
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}

export default RepeatMonthly
