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
  if (taskRepetition?.[repitetionNo[taskRepetition?.repetition_type]] === 1) return `Every week`

  return `Every ${taskRepetition?.[repitetionNo[taskRepetition?.repetition_type]]} ${repititionType[taskRepetition?.repetition_type]}s`
}

export function getMonthlyRepetition(taskRepetition) {
  if (taskRepetition?.[repitetionNo[taskRepetition?.repetition_type]] === 1) return `Every month`

  return `Every ${taskRepetition?.[repitetionNo[taskRepetition?.repetition_type]]} ${repititionType[taskRepetition?.repetition_type]}s`
}

export function getYearlyRepetition(taskRepetition) {
  return `Every year`
}
