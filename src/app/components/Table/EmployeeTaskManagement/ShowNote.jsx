import { Box } from '@chakra-ui/react'
import assets from '../../../assets/assets'
import Icon from '../../Icon'

const ShowNote = ({ isSelectedSolved, onClickNote, note }) => {
  if (!note) return null
  return (
    <Box display={'flex'} paddingLeft={'10px'} w={'5.5%'} justifyContent={'space-between'} alignItems={'center'}>
      <Icon cursor='pointer' onClick={onClickNote} image={assets.icons.noteIcon} />
    </Box>
  )
}

export default ShowNote
