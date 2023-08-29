import { ModalBody, ModalFooter, Text, Spacer } from '@chakra-ui/react'
import { useState } from 'react'

import Modal from '../Modal'
import { Button, Form, Input } from '../../Form'
import SelectBox from '../../SelectBox'

const EditTask = ({ isOpen, onClose, onEditTask, onChangeInput, errorMessage, isInvalid, showOption, options, selectedOption, onSelect, inputFields, deleteTaskModal }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Edit task'>
      <Form onSubmit={onEditTask} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <SelectBox errorMessage={errorMessage.id} showOption={showOption} width='400px' label='Task group' options={options} selectedOption={selectedOption} onSelect={onSelect} />
          <Input value={inputFields.name} errorMessage={errorMessage.task} onChange={onChangeInput} label='Task' name='name' placeholder='Enter task title' marginX={0} />
          <Button onClick={deleteTaskModal} title='Delete task' size='large' color='default' />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditTask
