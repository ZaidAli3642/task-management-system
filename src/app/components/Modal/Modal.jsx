import { Box, Modal as ChakraModal, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import colors from '../../config/colors'

const Modal = ({ isOpen, onClose, children, modalHeading, employeeName, ...props }) => {
  return (
    <ChakraModal {...props} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display={'flex'} paddingBottom={0} alignItems={'center'}>
          <Text fontWeight={600} fontSize={'20px'}>
            {modalHeading}
          </Text>
          {employeeName && (
            <Text marginLeft='12px' fontSize='15px' fontWeight={400} color={colors.darkGrey}>
              {employeeName}
            </Text>
          )}
        </ModalHeader>
        {children}
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
