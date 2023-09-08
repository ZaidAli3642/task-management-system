import { ModalBody, ModalFooter } from '@chakra-ui/react'
import { Button, Form } from '../../Form'
import Modal from '../Modal'
import SelectBox from '../../SelectBox'

const EditResponsible = ({ isLoading, isOpen, onClose, onEditResponsible, onDeleteResponsible, errorMessage, isInvalid, showOption, options, selectedOption, onSelect, subHeading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Edit responsible' subHeading={subHeading}>
      <Form onSubmit={onEditResponsible} isInvalid={isInvalid}>
        <ModalBody paddingY={0}>
          <SelectBox errorMessage={errorMessage.id} showOption={showOption} width='400px' label='Responsible' options={options} selectedOption={selectedOption} onSelect={onSelect} />
          <Button onClick={() => onDeleteResponsible(true)} title={'Remove responsible'} color='default' size='large' />
        </ModalBody>
        <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
          <Button margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
          <Button isLoading={isLoading} margin={'10px'} title='Save' size='small' color='green' type='submit' />
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default EditResponsible
