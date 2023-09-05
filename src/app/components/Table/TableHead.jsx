import { useMemo } from 'react'
import { Thead, Tr } from '@chakra-ui/react'

import TableColumnTitle from './TableColumnTitle'
import colors from '../../config/colors'
import moment from 'moment'
import { generateWeeksInYear } from '../../utils/dates'

const TableHead = ({ columns, titleFontSize }) => {
  const weeks = useMemo(() => {
    const allWeeks = generateWeeksInYear(moment().year())
    const currentWeek = moment().week()
    const currentWeekIndex = allWeeks.findIndex(weekValue => weekValue.week === currentWeek)

    const slicedWeeks = allWeeks.slice(currentWeekIndex, currentWeekIndex + 5)

    return slicedWeeks
  }, [])

  return (
    <Thead display={'flex'} justifyContent={'center'} alignItems={'center'} w='100%' h='auto'>
      <Tr w={'100%'} py={'10px'} display={'flex'} h='auto' borderBottom={1} borderStyle={'solid'} borderColor={colors.borderGrey} pl={'20px'} justifyContent={'space-between'} alignItems={'center'} textDecoration={'none'}>
        {columns.map((value, index) => (
          <TableColumnTitle titleFontSize={titleFontSize} key={value.id} value={index > 1 ? weeks[index - 2] : value} index={index} />
        ))}
      </Tr>
    </Thead>
  )
}

export default TableHead
