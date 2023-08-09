import { Text } from '@chakra-ui/react'

import colors from '../../config/colors'

const columns = [
  {
    id: 1,
    title: 'Name',
    content: (value, color) => (
      <Text _groupHover={{ textColor: colors.darkGreen }} className='table-heading' color={color}>
        {value.name}
      </Text>
    ),
  },
  {
    id: 2,
    title: 'Unsolved',
    highlight: true,
    color: colors.red,
    lightColor: colors.lightRed,
    content: (value, color) => (
      <Text className='table-heading table-heading-light-weight' color={color}>
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
    lightColor: colors.lightGreen,
    content: (value, color) => (
      <Text className='table-heading table-heading-light-weight' color={color}>
        {value.week1}
      </Text>
    ),
  },
  {
    id: 4,
    title: '8 May - 21 May',
    subTitle: 'Week 19',
    content: (value, color) => (
      <Text className='table-heading table-heading-light-weight' color={color}>
        {value.week2}
      </Text>
    ),
  },
  {
    id: 5,
    title: '8 May - 21 May',
    subTitle: 'Week 19',
    content: (value, color) => (
      <Text className='table-heading table-heading-light-weight' color={color}>
        {value.week3}
      </Text>
    ),
  },
  {
    id: 6,
    title: '8 May - 21 May',
    subTitle: 'Week 19',
    content: (value, color) => (
      <Text className='table-heading table-heading-light-weight' color={color}>
        {value.week4}
      </Text>
    ),
  },
  {
    id: 7,
    title: '8 May - 21 May',
    subTitle: 'Week 19',
    content: (value, color) => (
      <Text className='table-heading table-heading-light-weight' color={color}>
        {value.week5}
      </Text>
    ),
  },
]

export default columns
