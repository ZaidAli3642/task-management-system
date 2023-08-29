import { ModalBody, ModalFooter } from '@chakra-ui/react'
import { Button, Form, Input } from '../../Form'
import Modal from '../Modal'

const EditNote = ({ isOpen, onClose, onEditTask, errorMessage, onChangeInput, isInvalid, showOption, options, selectedOption, onSelect }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Edit note' subHeading={'Capital budgeting'}>
      <Form onSubmit={onEditTask} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <Input textArea errorMessage={'errorMessage.code'} onChange={onChangeInput} label='Note' name='code' placeholder='Enter note' marginX={0} />
          <Button title={'Remove note'} color='default' size='large' />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditNote
