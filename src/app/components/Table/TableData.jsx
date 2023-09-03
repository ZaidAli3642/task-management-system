import { Box, Td } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import colors from '../../config/colors'
import assets from '../../assets/assets'
import Icon from '../Icon'

const TableData = ({ item, columns, isEdit = true, isLastIndex, isFirstIndex, onOpenEditModal, setEmployeeId, onClickItem }) => {
  const user = useSelector(state => state.auth.userInfo)
  const renderCell = (item, column) => {
    return column.content(item, isEdit, colorPick(column, colors.black, 'dark'))
  }

  const colorPick = (column, otherColor, opacity = 'light') => {
    let color = opacity === 'light' ? column.lightColor : column.color

    return column.highlight ? color : otherColor
  }

  return (
    <>
      {columns.map((column, index) => (
        <Td role={user.role === 'admin' && isEdit ? 'group' : 'none'} pl={index === 0 ? 0 : '18px'} key={column.id} h={'100%'} w={'100%'} flexWrap={'wrap'} display={'flex'} justifyContent={'center'} alignContent={'space-between'} flexDirection={'column'} backgroundColor={colorPick(column, colors.white)} className='table-heading' borderBottom={isLastIndex ? 0 : 1} borderBottomColor={colors.borderGrey} borderStyle={'solid'} fontSize={'14px'} fontWeight={600} position={'relative'} cursor={column.id === 1 && user.role === 'admin' && 'pointer'}>
          {isFirstIndex && column.highlight && <Box backgroundColor={column.color} h='1px' w='100%' position='absolute' zIndex={1} top={'-1px'} left={'0px'}></Box>}
          <Box
            w={'150px'}
            onClick={() => {
              if (user.role === 'admin' && column.id === 1) {
                onClickItem(item)
              }
            }}
          >
            {renderCell(item, column)}
          </Box>
          {isEdit && column.id === 1 && (
            <Icon
              onClick={() => {
                if (user.role === 'admin' && isEdit && column.id === 1) {
                  setEmployeeId(item)
                  onOpenEditModal(item)
                }
              }}
              display='none'
              _groupHover={{ display: 'block' }}
              image={assets.icons.edit}
            />
          )}
        </Td>
      ))}
    </>
  )
}

export default TableData
