import { Td } from '@chakra-ui/react'

import colors from '../../config/colors'
import assets from '../../assets/assets'
import Icon from '../Icon'

const TableData = ({ item, columns, isEdit = true }) => {
  const renderCell = (item, column) => {
    return column.content(item, colorPick(column, colors.black, 'dark'))
  }

  const colorPick = (column, otherColor, opacity = 'light') => {
    let color = opacity === 'light' ? column.lightColor : column.color
    return column.highlight ? color : otherColor
  }

  return (
    <>
      {columns.map(column => (
        <Td role='group' key={column.id} h={'100%'} w={'100%'} flexWrap={'wrap'} display={'flex'} justifyContent={'center'} alignContent={'space-between'} flexDirection={'column'} backgroundColor={colorPick(column, colors.white)} className='table-heading' borderBottom={1} borderColor={colors.lightGrey} borderStyle={'solid'} fontSize={'14px'} fontWeight={600} cursor={column.id === 1 && 'pointer'}>
          {renderCell(item, column)}
          {isEdit && column.id === 1 && <Icon display='none' _groupHover={{ display: 'block' }} image={assets.icons.edit} />}
        </Td>
      ))}
    </>
  )
}

export default TableData
