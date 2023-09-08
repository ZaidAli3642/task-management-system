import { Box, Collapse, Text } from '@chakra-ui/react'
import { Switch } from '../Form'
import Radio from '../Form/Radio'
import SelectBox from '../SelectBox'
import colors from '../../config/colors'
import { months, datesWithPostfixes, totalWeeksInMonth, days } from '../../constants/dates'

const RepeatYearly = ({ isShowBorderBottom = true, radioChecked, inputFieldsYearly, onChangeYearly, toggleYearly, isOpenYearly, setYearlyRadio, yearlyRadio }) => {
  return (
    <Box marginTop={'20px'} marginBottom={'10px'}>
      <Box mt={'10px'} display='flex' alignItems='center' justifyContent={'space-between'}>
        <Text fontSize={'16px'} fontWeight={600}>
          Yearly
        </Text>
        <Switch onChange={toggleYearly} size='md' checked={isOpenYearly} />
      </Box>
      <Collapse in={isOpenYearly}>
        <Box borderBottom={isShowBorderBottom ? 1 : 0} borderBottomColor={colors.borderGrey} borderBottomStyle={'solid'} paddingBottom={'10px'}>
          <Box marginTop={'10px'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
            <Text fontSize={'14px'} fontWeight={500} color={colors.black}>
              Repeat every on the
            </Text>
          </Box>
          <Box marginTop={'5px'}>
            <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
              <Radio checked={radioChecked === 1} onChange={() => setYearlyRadio(1)} defaultChecked={true} name={'yearly'} id={'yearly-1'} radioContainerStyles={{ margin: 0 }} />
              <SelectBox width='150px' onSelect={option => onChangeYearly({ target: { value: option, name: 'repetitionYearlyMonthDate' } })} isPositionRelative={false} isRadioSelection={true} selectedRadio={yearlyRadio !== 1} marginX={'10px'} options={datesWithPostfixes} showOption={'label'} selectedOption={inputFieldsYearly?.repetitionYearlyMonthDate.label} />
              <SelectBox width='150px' onSelect={option => onChangeYearly({ target: { value: option, name: 'repetitionYearlyMonth' } })} isPositionRelative={false} isRadioSelection={true} selectedRadio={yearlyRadio !== 1} marginX={'10px'} options={months} showOption={'month'} selectedOption={inputFieldsYearly?.repetitionYearlyMonth.month} />
            </Box>
            <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
              <Radio checked={radioChecked === 2} name={'yearly'} onChange={() => setYearlyRadio(2)} id={'yearly-2'} radioContainerStyles={{ margin: 0 }} />
              <SelectBox width='150px' onSelect={option => onChangeYearly({ target: { value: option, name: 'repetitionYearlyWeekNo' } })} isPositionRelative={false} isRadioSelection={true} selectedRadio={yearlyRadio !== 2} marginX={'10px'} options={totalWeeksInMonth} showOption={'week'} selectedOption={inputFieldsYearly?.repetitionYearlyWeekNo.week} placeholder='First' />
              <SelectBox width='150px' onSelect={option => onChangeYearly({ target: { value: option, name: 'repetitionYearlyDay' } })} isPositionRelative={false} isRadioSelection={true} selectedRadio={yearlyRadio !== 2} marginX={'10px'} options={days} showOption={'day'} selectedOption={inputFieldsYearly?.repetitionYearlyDay.day} placeholder='Sunday' />
              <SelectBox width='150px' onSelect={option => onChangeYearly({ target: { value: option, name: 'repetitionYearlyMonth' } })} isPositionRelative={false} isRadioSelection={true} selectedRadio={yearlyRadio !== 2} marginX={'10px'} options={months} showOption={'month'} selectedOption={inputFieldsYearly?.repetitionYearlyMonth.month} placeholder='January' />
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}

export default RepeatYearly
