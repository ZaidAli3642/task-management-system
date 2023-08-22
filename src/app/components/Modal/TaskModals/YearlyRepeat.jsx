import { ModalBody, ModalFooter,Text,Box,Switch,Stack,Checkbox,Divider,Select,Radio,VStack, RadioGroup } from '@chakra-ui/react'
import colors from '../../../config/colors'
import Modal from '../Modal'
import { Button, Form } from '../../Form'
import SelectBox from './SelectBox'
import { useState } from 'react'

const YearlyRepeat = ({ isOpen, onClose, onEditCustomer, onChangeInput, errorMessage, isInvalid }) => {
    const numberOptions = ['January','sunday' ,'mondy', 'july','march'];
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
    };


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
          <Box mb='15px' mt={'20px'} display="flex" alignItems="center" justifyContent={'space-between'}>
            <Text color='black' fontSize={'16px'} fontWeight={600}  mr={2}>Yearly</Text>
              <Switch  size="md" colorScheme='green' />
          </Box>
          <Box  fontSize='14px' color='black' display="inline-flex" fontWeight={500}  alignItems='center' gap='14px'>
            Repeat every on the 
          </Box>
          <Stack mt={'15px'}>
                <RadioGroup>
                <Radio size='md' name='1' colorScheme='green'>
                 <Box display='inline-flex' gap='7px'  >   
                <SelectBox width='120px' label="First" options={numberOptions} onSelect={handleOptionSelect} />
                <SelectBox width='120px' label="January" options={numberOptions} onSelect={handleOptionSelect} />
                </Box>
                </Radio>
                <Radio >
                    <Box display='inline-flex' gap='7px' mt='10px'>
                    <SelectBox width='120px' label="First" options={numberOptions} onSelect={handleOptionSelect} />
                    <SelectBox width='120px' label="Sunday" options={numberOptions} onSelect={handleOptionSelect} />
                    <SelectBox width='120px' label="January" options={numberOptions} onSelect={handleOptionSelect} />
                </Box>
                </Radio>
                </RadioGroup>
  
          </Stack>
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default YearlyRepeat
