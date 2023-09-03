import { Box, ModalBody, ModalFooter, Text } from '@chakra-ui/react'
import Modal from './Modal'
import { Button } from '../Form'
import colors from '../../config/colors'

const ClientInfo = ({ onClose, isOpen, clientInfo, modalHeading, subHeading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} modalHeading={clientInfo?.name} subHeading={subHeading}>
      <ModalBody marginY={'13px'} paddingY={0}>
        {clientInfo?.description && (
          <Box>
            <Text fontSize={'14px'} fontWeight={400} color={colors.darkGreen}>
              General Description
            </Text>
            <Text marginTop={'12px'} fontSize={'14px'} fontWeight={400} lineHeight={'28px'}>
              {`${clientInfo?.description}`}
            </Text>
          </Box>
        )}
        {clientInfo?.code && (
          <Box marginTop={'20px'}>
            <Text fontSize={'14px'} fontWeight={400} color={colors.darkGreen}>
              Codes
            </Text>
            <Text marginTop={'12px'} fontSize={'14px'} fontWeight={400} lineHeight={'28px'}>
              {`${clientInfo?.code}`}
            </Text>
          </Box>
        )}
      </ModalBody>
      <ModalFooter paddingX={'15px'} paddingBottom='10px' paddingTop={0}>
        <Button w='100px' margin={'10px'} onClick={onClose} title='Cancel' size='small' color='grey' />
      </ModalFooter>
    </Modal>
  )
}

export default ClientInfo
