import { Text } from '@chakra-ui/react'

import colors from '../../config/colors'

const employeeColumns = [
  {
    id: 1,
    title: 'Name',
    content: (value, isEdit, color) => (
      <Text _groupHover={{ textColor: isEdit ? colors.darkGreen : colors.black }} className='table-heading' color={color}>
        {value.first_name}
      </Text>
    ),
  },
  {
    id: 2,
    title: 'Unsolved',
    highlight: true,
    color: colors.red,
    lightColor: colors.veryLightRed,
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' color={color}>
        {value.unsolvedTasks}
      </Text>
    ),
  },
  {
    id: 3,
    title: '8 May - 21 May',
    subTitle: 'Week 19',
    highlight: true,
    color: colors.darkGreen,
    lightColor: colors.veryLightGreen,
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' color={color}>
        {value.todayTasks}
      </Text>
    ),
  },
  {
    id: 4,
    title: '8 May - 21 May',
    subTitle: 'Week 19',
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' color={color}>
        {value.t1}
      </Text>
    ),
  },
  {
    id: 5,
    title: '8 May - 21 May',
    subTitle: 'Week 19',
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' color={color}>
        {value.t2}
      </Text>
    ),
  },
  {
    id: 6,
    title: '8 May - 21 May',
    subTitle: 'Week 19',
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' color={color}>
        {value.t3}
      </Text>
    ),
  },
  {
    id: 7,
    title: '8 May - 21 May',
    subTitle: 'Week 19',
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' color={color}>
        {value.t4}
      </Text>
    ),
  },
]

export default employeeColumns
