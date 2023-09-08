import { ModalBody, ModalFooter } from '@chakra-ui/react'
import { Button, Form, Input } from '../../Form'
import Modal from '../Modal'

const EditNote = ({ isLoading, isOpen, onClose, onEditNote, errorMessage, onChangeInput, isInvalid, value, onDeleteNote, subHeading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Edit note' subHeading={subHeading}>
      <Form onSubmit={onEditNote} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <Input value={value.note} textArea errorMessage={errorMessage.note} onChange={onChangeInput} label='Note' name='note' placeholder='Enter note' marginX={0} />
          <Button title={'Remove note'} onClick={() => onDeleteNote(true)} color='default' size='large' />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button isLoading={isLoading} margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditNote
