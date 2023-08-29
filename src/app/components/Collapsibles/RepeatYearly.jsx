import { Box, Collapse, Text } from '@chakra-ui/react'
import { Switch } from '../Form'
import Radio from '../Form/Radio'
import SelectBox from '../SelectBox'
import colors from '../../config/colors'

const RepeatYearly = ({ toggleYearly, isOpenYearly }) => {
  return (
    <Box marginY={'20px'}>
      <Box mt={'10px'} display='flex' alignItems='center' justifyContent={'space-between'}>
        <Text fontSize={'16px'} fontWeight={600}>
          Yearly
        </Text>
        <Switch onChange={toggleYearly} size='md' checked={isOpenYearly} />
      </Box>
      <Collapse in={isOpenYearly}>
        <Box borderBottom={1} borderBottomColor={colors.borderGrey} borderBottomStyle={'solid'} paddingBottom={'10px'}>
          <Box marginTop={'10px'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
            <Text fontSize={'14px'} fontWeight={500} color={colors.black}>
              Repeat every on the
            </Text>
          </Box>
          <Box marginTop={'5px'}>
            <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
              <Radio radioContainerStyles={{ margin: 0 }} />
              <SelectBox width='150px' marginX={'10px'} selectedOption={'1st'} />
              <SelectBox width='150px' marginX={'10px'} selectedOption={'January'} />
            </Box>
            <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
              <Radio radioContainerStyles={{ margin: 0 }} />
              <SelectBox width='150px' marginX={'10px'} selectedOption={null} placeholder='First' />
              <SelectBox width='150px' marginX={'10px'} selectedOption={null} placeholder='Sunday' />
              <SelectBox width='150px' marginX={'10px'} selectedOption={null} placeholder='January' />
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}

export default RepeatYearly
