import {
  Modal as ChakraModal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

const Modal = ({ isOpen, onClose, children, modalHeading, ...props }) => {
  return (
    <ChakraModal {...props} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader paddingBottom={0}>{modalHeading}</ModalHeader>
        {children}
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
