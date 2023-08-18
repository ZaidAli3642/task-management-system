import { ModalBody, ModalFooter,Text,Box,Switch,Stack,Checkbox,Divider,Select,Radio,VStack, RadioGroup } from '@chakra-ui/react'
import colors from '../../../config/colors'
import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'

const MonthlyRepeat = ({ isOpen, onClose, onEditCustomer, onChangeInput, errorMessage, isInvalid }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Repeat' employeeName='Capital budgeting'>
      <Form onSubmit={onEditCustomer} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <Box mt={'10px'} display="flex" alignItems="center" justifyContent={'space-between'}>
            <Text color='black' fontSize={'16px'} fontWeight={600}  mr={2}>Weekly</Text>
              <Switch  size="md" colorScheme='green' />
          </Box>
          <Box mt={'20px'} display="flex" alignItems="center" justifyContent={'space-between'}>
            <Text color='black' fontSize={'16px'} fontWeight={600}  mr={2}>Monthly</Text>
              <Switch  size="md" colorScheme='green' />
          </Box>
          <Box mt={'20px'} fontSize='14px' color='black' display="inline-flex" fontWeight={500}  alignItems='center' gap='14px'>
            Repeat every
            <Box  border='1px' borderColor={colors.borderGrey} borderRadius='5px' display={'flex'}  padding='10px' w='50px' justifyContent='center'>
                1
            </Box>
            months on the
          </Box>
          <Stack mt={'15px'}>
                <RadioGroup>
                <Radio size='md' name='1' colorScheme='green'>
                    <Select  placeholder='1st' w='180px' h='45px'></Select>
                </Radio>
                <Radio >
                    <Box display={'flex'} gap='15px' mt='10px'>
                <Select   placeholder='First' w='180px' h='45px'></Select>
                <Select  placeholder='Sunday' w='180px'  h='45px'></Select>
                </Box>
                </Radio>
                </RadioGroup>
  
          </Stack>
          <Divider mt='15px' />
          <Box mb='15px' mt={'20px'} display="flex" alignItems="center" justifyContent={'space-between'}>
            <Text color='black' fontSize={'16px'} fontWeight={600}  mr={2}>Yearly</Text>
              <Switch  size="md" colorScheme='green' />
          </Box>
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default MonthlyRepeat
