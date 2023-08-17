import { Text } from '@chakra-ui/react'

import colors from '../../config/colors'

const taskManagementColumns = [
  {
    id: 1,
    title: 'Task Group',
    content: (value, isEdit, color) => (
      <Text _groupHover={{ textColor: isEdit ? colors.darkGreen : colors.black }} fontSize='12px' className='table-heading' color={color}>
        {value.name}
      </Text>
    ),
  },
  {
    id: 2,
    title: 'Task',
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' fontSize='12px' color={color}>
        {value.unsolved}
      </Text>
    ),
  },
  {
    id: 3,
    title: 'Responsible',
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' fontSize='12px' color={color}>
        {value.week1}
      </Text>
    ),
  },
  {
    id: 4,
    title: 'Repetition',
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' fontSize='12px' color={color}>
        {value.week2}
      </Text>
    ),
  },
  {
    id: 5,
    title: 'Note',
    content: (value, isEdit, color) => (
      <Text className='table-heading table-heading-light-weight' fontSize='12px' color={color}>
        {value.week3}
      </Text>
    ),
  },
]

export default taskManagementColumns
