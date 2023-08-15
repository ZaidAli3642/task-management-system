import { FormControl } from '@chakra-ui/react'

const Form = ({ onSubmit, isInvalid, children, ...props }) => {
  return (
    <form
      {...props}
      onSubmit={e => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <FormControl isInvalid={isInvalid}>{children}</FormControl>
    </form>
  )
}

export default Form
