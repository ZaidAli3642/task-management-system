import { ModalBody, ModalFooter, Text, Spacer } from '@chakra-ui/react'
import { useState } from 'react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'
import SelectBox from '../../SelectBox'

const AddTask = ({ isOpen, onClose, onAddTask, onChangeInput, errorMessage, onSelect, isInvalid, selectedOption, options, showOption, selectErrorMessage }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Add task'>
      <Form onSubmit={onAddTask} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <SelectBox errorMessage={errorMessage.id} showOption={showOption} width='400px' h='500px' label='Task group' options={options} selectedOption={selectedOption} onSelect={onSelect} />
          <Input errorMessage={errorMessage.name} onChange={onChangeInput} label='Task' name='name' placeholder='Enter task title' marginX={0} />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Add' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default AddTask
