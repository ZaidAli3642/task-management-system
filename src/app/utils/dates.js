import moment from 'moment'

export const generateWeeksInYear = year => {
  const weeks = []
  let startDate = moment(`${year}-01-01`)

  const firstWeekEndDate = startDate.clone().add(startDate.day() === 0 ? 0 : 7 - startDate.day(), 'days')

  // Initialize weekNumber to 1

  let weekNumber = 1

  let weekFirstDate = startDate.format('MMM D')
  let weekLastDate = firstWeekEndDate.format('MMM D')

  // Generate the first week
  const firstWeekInfo = {
    id: weekNumber,
    week: weekNumber,
    weekFirstDate,
    weekLastDate,
    description: `Week ${weekNumber} . ${weekFirstDate} to ${weekLastDate}`,
  }
  weeks.push(firstWeekInfo)

  // Move to the first day of the second week
  startDate = firstWeekEndDate.clone().add(1, 'day')

  // Loop through the year until December 31 of the given year
  while (startDate.year() === year) {
    const endDate = startDate.clone().add(6, 'days')
    weekNumber++

    weekFirstDate = startDate.format('MMM D')
    weekLastDate = endDate.format('MMM D')
    const weekInfo = {
      id: weekNumber,
      week: weekNumber,
      weekFirstDate,
      weekLastDate,
      description: `Week ${weekNumber} . ${weekFirstDate} to ${weekLastDate}`,
    }

    weeks.push(weekInfo)

    // Move to the first day of the next week
    startDate = endDate.clone().add(1, 'day')
  }

  return weeks
}
