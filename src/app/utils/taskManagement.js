import { Text } from '@chakra-ui/react'
import { datesWithPostfixes, days, months, totalWeeksInMonth } from '../constants/dates'
import { repitetionNo, repititionType } from '../constants/repetitions'

export function getDate(option) {
  return datesWithPostfixes.find(date => date.id === Number(option))
}
export function getWeekNo(option) {
  return totalWeeksInMonth.find(week => week.id === Number(option))
}
export function getDay(option) {
  return days.find(day => day.id === Number(option))
}
export function getMonth(option) {
  return months.find(month => month.id === Number(option))
}

export function getWeeklyRepetition(taskRepetition) {
  return `Every ${taskRepetition?.[repitetionNo[taskRepetition?.repetition_type]]} ${repititionType[taskRepetition?.repetition_type]}`
}

export function getMonthlyRepetition(taskRepetition) {
  let preFix = ''

  if (taskRepetition?.repetition_monthly_date) preFix += getDate(taskRepetition?.repetition_monthly_date)?.label ?? ''
  else {
    preFix += getWeekNo(taskRepetition?.repetition_monthly_week_no)?.week ?? ''
    preFix += ' ' + getDay(taskRepetition?.repetition_monthly_week_day)?.day ?? ''
  }
  return `${preFix} of the month`
}

export function getYearlyRepetition(taskRepetition) {
  if (taskRepetition?.repetition_yearly_month_date) {
    return `${getDate(taskRepetition?.repetition_yearly_month_date)?.label ?? ''} of ${getMonth(taskRepetition?.repetition_yearly_month)?.month ?? ''}`
  } else {
    return `Every ${getWeekNo(taskRepetition?.repetition_yearly_week_no)?.week ?? ''} ${getDay(taskRepetition?.repetition_yearly_day).day ?? ''} of the ${getMonth(taskRepetition?.repetition_yearly_month).month ?? ''}`
  }
}
