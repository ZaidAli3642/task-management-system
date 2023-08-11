import { Box, Image, useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { login } from '../../redux/reducers/auth/auth'
import { Input, Form, Button } from '../../components/Form'
import assets from '../../assets/assets'
import loginSchema from '../../validations/loginSchema'
import useForm from '../../hooks/useForm'

const Login = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const [errorMessages, isInvalid, , , onChange, onSubmit] = useForm({ username: '', password: '' })

  const handleSubmit = async () => {
    const result = await onSubmit(loginSchema, () => dispatch(login()))
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
        <Form style={{ width: '100%', padding: 20, paddingBottom: 0 }} isInvalid={isInvalid} onSubmit={handleSubmit}>
          <Input onChange={onChange} placeholder='Enter username' label='Username' name='username' errorMessage={errorMessages.username} />
          <Input onChange={onChange} placeholder='Enter password' label='Password' type='password' name='password' errorMessage={errorMessages.password} />
          <Button title='Login' color='green' size='large' type='submit' />
        </Form>
      </Box>
    </Box>
  )
}

export default Login