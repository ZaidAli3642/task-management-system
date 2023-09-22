import { ModalBody, ModalFooter, Text } from '@chakra-ui/react'
import Modal from '../Modal'
import colors from '../../../config/colors'
import { Button } from '../../Form'

const Note = ({ onClose, isOpen, noteText, subHeading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading='Note' subHeading={subHeading}>
      <ModalBody marginY={'13px'} paddingY={0}>
        {noteText && (
          <Text lineHeight={'28px'} fontWeight={400} fontSize={'14px'} color={colors.black}>
            {`${noteText}`}
          </Text>
        )}
      </ModalBody>
      <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
        <Button w='100px' margin={'10px'} onClick={onClose} title='Close' size='small' color='grey' />
      </ModalFooter>
    </Modal>
  )
}

export default Note
