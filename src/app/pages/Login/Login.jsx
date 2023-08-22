import { Box, Image, useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { login } from '../../redux/reducers/auth/auth'
import { Input, Form, Button } from '../../components/Form'
import assets from '../../assets/assets'
import loginSchema from '../../validations/loginSchema'
import useForm from '../../hooks/useForm'
import colors from '../../config/colors'
import { useRef } from 'react'

const Login = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const formRef = useRef()
  const [errorMessages, isInvalid, inputFields, , , onChange, onSubmit] = useForm({ username: '', password: '' })

  const handleSubmit = async () => {
    await onSubmit(loginSchema, () => dispatch(login({ inputFields, toast, formRef })))
  }

  return (
    <Box className='login'>
      <Box className='login-container'>
        <Image src={assets.images.logo} className='logo' />
        <Image src={assets.images.logoHeading} className='logo-heading' />
        <Image src={assets.images.tagLine} className='tag-line' />
        <Form ref={formRef} style={{ width: '100%', padding: 20, paddingBottom: 0 }} isInvalid={isInvalid} onSubmit={handleSubmit}>
          <Input value={inputFields.username} onChange={onChange} placeholder='Enter username' label='Username' name='username' errorMessage={errorMessages.username} />
          <Input value={inputFields.password} onChange={onChange} placeholder='Enter password' label='Password' type='password' name='password' errorMessage={errorMessages.password} />
          <Button title='Login' color='green' size='large' type='submit' />
        </Form>
      </Box>
    </Box>
  )
}

export default Login
