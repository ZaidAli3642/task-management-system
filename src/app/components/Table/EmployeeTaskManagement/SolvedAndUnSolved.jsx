import { Box } from '@chakra-ui/react'
import CheckBox from '../../Form/Checkbox'

const SolvedAndUnSolved = ({ isSelectedSolved, completionStatus, onChangeSolvedUnSolved }) => {
  return (
    <Box display={'flex'} paddingLeft={'10px'} paddingRight={'3.5%'} w={!isSelectedSolved ? '10%' : '12%'} justifyContent={'space-between'} alignItems={'center'}>
      <CheckBox onChange={checked => onChangeSolvedUnSolved(checked, 'solved')} checked={completionStatus === 'solved'} />
      <CheckBox onChange={checked => onChangeSolvedUnSolved(checked, 'skipped')} checked={completionStatus === 'skipped'} />
    </Box>
  )
}

export default SolvedAndUnSolved
