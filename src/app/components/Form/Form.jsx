import { FormControl } from '@chakra-ui/react'
import React from 'react'

const Form = React.forwardRef(({ onSubmit, isInvalid, children, ...props }, ref) => {
  return (
    <form
      ref={ref}
      {...props}
      onSubmit={e => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <FormControl isInvalid={isInvalid}>{children}</FormControl>
    </form>
  )
})

export default Form
