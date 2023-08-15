import { Text } from '@chakra-ui/react'

import colors from '../../config/colors'

const employeeColumns = [
  {
    id: 1,
    title: 'Name',
    content: (value, isEdit, color) => (
      <Text _groupHover={{ textColor: isEdit ? colors.darkGreen : colors.black }} fontSize='12px' className='table-heading' color={color}>
        {value.name}
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
      <Text className='table-heading table-heading-light-weight' fontSize='12px' color={color}>
        {value.unsolved}
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
      <Text className='table-heading table-heading-light-weight' fontSize='12px' color={color}>
        {value.week1}
      </Text>
    ),
  },
  {
    id: 4,
    title: '8 May - 21 May',
    subTitle: 'Week 19',
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' fontSize='12px' color={color}>
        {value.week2}
      </Text>
    ),
  },
  {
    id: 5,
    title: '8 May - 21 May',
    subTitle: 'Week 19',
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' fontSize='12px' color={color}>
        {value.week3}
      </Text>
    ),
  },
  {
    id: 6,
    title: '8 May - 21 May',
    subTitle: 'Week 19',
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' fontSize='12px' color={color}>
        {value.week4}
      </Text>
    ),
  },
  {
    id: 7,
    title: '8 May - 21 May',
    subTitle: 'Week 19',
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' fontSize='12px' color={color}>
        {value.week5}
      </Text>
    ),
  },
]

export default employeeColumns
