import { Box, Modal as ChakraModal, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import colors from '../../config/colors'

const Modal = ({ isOpen, onClose, children, modalHeading, subHeading, subTitleFontWeight = 400, headerPadding, contentPadding, minW, minH, ...props }) => {
  return (
    <ChakraModal {...props} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent scrollBehavior={'auto'} minW={minW} padding={contentPadding}>
        <ModalHeader display={'flex'} paddingBottom={0} alignItems={'center'} padding={headerPadding}>
          <Text fontWeight={600} fontSize={'20px'}>
            {modalHeading}
          </Text>
          {subHeading && (
            <Text marginLeft='12px' fontSize='15px' marginTop={'3.5px'} fontWeight={subTitleFontWeight} color={colors.darkGrey}>
              {subHeading}
            </Text>
          )}
        </ModalHeader>
        {children}
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
