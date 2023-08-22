import { ModalBody, ModalFooter,Text,Spacer } from '@chakra-ui/react'
import { useState } from 'react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'
import SelectBox from '../TaskModals/SelectBox'

const EditTask1 = ({ isOpen, onClose, onAddCustomer, onChangeInput, errorMessage, isInvalid }) => {
    const numberOptions = ['January','sunday' ,'mondy', 'july','march'];
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
    };

  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Edit task' >
      <Form onSubmit={onAddCustomer} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
        <Text fontSize='12px' fontWeight={500} mt='15px'  >Task group</Text>
        <SelectBox width='400px' h='500px' label="Select" options={numberOptions} onSelect={handleOptionSelect}/>
        <Input errorMessage={errorMessage.task} onChange={onChangeInput} label='Task' name='name' placeholder='Enter task title' marginX={0} />
        <Button  title='Delete task' size='large' color='default' />
      
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditTask1
