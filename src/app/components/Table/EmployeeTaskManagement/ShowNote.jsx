import { Box } from '@chakra-ui/react'
import assets from '../../../assets/assets'
import Icon from '../../Icon'

const ShowNote = ({ isSelectedSolved, onClickNote, note }) => {
  return (
    <Box display={'flex'} paddingLeft={'10px'} w={'5.5%'} justifyContent={'space-between'} alignItems={'center'}>
      {note && <Icon cursor='pointer' onClick={onClickNote} image={assets.icons.noteIcon} hoveredImage={assets.icons.noteIconGreen} />}
    </Box>
  )
}

export default ShowNote
