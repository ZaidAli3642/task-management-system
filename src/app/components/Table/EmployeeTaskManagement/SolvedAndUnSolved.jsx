import { Box } from '@chakra-ui/react'
import CheckBox from '../../Form/Checkbox'
import { useEffect, useState } from 'react'

const SolvedAndUnSolved = ({ changedData, filterChanged, isSelectedSolved, completionStatus, onChangeSolvedUnSolved }) => {
  const [solved, setSolved] = useState()
  const [skipped, setSkipped] = useState()

  useEffect(() => {
    setSolved(completionStatus === 'solved')
    setSkipped(completionStatus === 'skipped')
  }, [filterChanged])

  return (
    <Box display={'flex'} paddingLeft={'10px'} paddingRight={'3.5%'} w={isSelectedSolved ? '10%' : '12%'} justifyContent={'space-between'} alignItems={'center'}>
      <CheckBox
        onChange={checked => {
          setSolved(!solved)
          onChangeSolvedUnSolved(checked, 'solved')
        }}
        isChecked={true}
        checked={solved}
      />
      <CheckBox
        onChange={checked => {
          setSkipped(!skipped)
          onChangeSolvedUnSolved(checked, 'skipped')
        }}
        isChecked={true}
        checked={skipped}
      />
    </Box>
  )
}

export default SolvedAndUnSolved
