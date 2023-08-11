import { Td } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import colors from '../../config/colors'
import assets from '../../assets/assets'
import Icon from '../Icon'
import { employeeEditModal } from '../../redux/reducers/employee/employees'

const TableData = ({ item, columns, isEdit = true, isLastIndex }) => {
  const dispatch = useDispatch()
  const renderCell = (item, column) => {
    return column.content(item, isEdit, colorPick(column, colors.black, 'dark'))
  }

  const colorPick = (column, otherColor, opacity = 'light') => {
    let color = opacity === 'light' ? column.lightColor : column.color
    return column.highlight ? color : otherColor
  }

  const openEditEmplopyeeModal = () => {
    dispatch(employeeEditModal(true))
  }

  return (
    <>
      {columns.map((column, index) => (
        <Td
          role='group'
          onClick={() => {
            isEdit && column.id === 1 && openEditEmplopyeeModal()
          }}
          pl={index === 0 ? 0 : '18px'}
          key={column.id}
          h={'100%'}
          w={'100%'}
          flexWrap={'wrap'}
          display={'flex'}
          justifyContent={'center'}
          alignContent={'space-between'}
          flexDirection={'column'}
          backgroundColor={colorPick(column, colors.white)}
          className='table-heading'
          borderBottom={isLastIndex ? 0 : 1}
          borderColor={colors.borderGrey}
          borderStyle={'solid'}
          fontSize={'14px'}
          fontWeight={600}
          cursor={column.id === 1 && isEdit && 'pointer'}
        >
          {renderCell(item, column)}
          {isEdit && column.id === 1 && <Icon display='none' _groupHover={{ display: 'block' }} image={assets.icons.edit} />}
        </Td>
      ))}
    </>
  )
}

export default TableData
