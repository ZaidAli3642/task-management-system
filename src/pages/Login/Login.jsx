import { Box, Image, useToast } from '@chakra-ui/react'

import { Input, Form, Button } from '../../components/Form'
import assets from '../../assets/assets'
import loginSchema from '../../validations/loginSchema'
import useForm from '../../hooks/useForm'

const Login = () => {
  const toast = useToast()
  const [errorMessages, isInvalid, , , onChange, onSubmit] = useForm({ email: '', password: '' })

  const handleSubmit = async () => {
    const result = await onSubmit(loginSchema)
    if (!result) return
    toast({
      title: 'Congrats!!!',
      description: 'You are logged in.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <Box className='login'>
      <Box className='login-container'>
        <Image src={assets.images.logo} className='logo' />
        <Image src={assets.images.logoHeading} className='logo-heading' />
        <Image src={assets.images.tagLine} className='tag-line' />
        <Form isInvalid={isInvalid} onSubmit={handleSubmit}>
          <Input onChange={onChange} placeholder='Enter you email' label='Email address' name='email' errorMessage={errorMessages.email} />
          <Input onChange={onChange} placeholder='Enter Password' label='Password' type='password' name='password' errorMessage={errorMessages.password} />
          <Button title='Login' color='default' size='large' type='submit' />
        </Form>
      </Box>
    </Box>
  )
}

export default Login
