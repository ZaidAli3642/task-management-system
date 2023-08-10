import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

function ButtonwithIcon({ title }) {
  return (
    <div>
      
        <Button
          leftIcon={<AddIcon />}
          color={'#61C0A2'}
          w='153px'
          h='50px'
          mt={5}
          me={5}
          padding='15px'
          border='1px'
          borderRadius='5px'
          gap='2px'
          bg={'white'}
          variant='solid'
        >
          {title}
        </Button>
      
    </div>
  )
}

export default ButtonwithIcon
