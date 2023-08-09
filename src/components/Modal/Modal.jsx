import { Box, Modal as ChakraModal, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import colors from '../../config/colors'

const Modal = ({ isOpen, onClose, children, modalHeading, ...props }) => {
  return (
    <ChakraModal {...props} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display={'flex'} paddingBottom={0} alignItems={'center'}>
          <Text>{modalHeading}</Text>
          <Text marginLeft='5px' fontSize='15px' fontWeight={400} color={colors.darkGrey}>
            Jack McDonalds
          </Text>
        </ModalHeader>
        {children}
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal