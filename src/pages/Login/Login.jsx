import { useState } from 'react'
import { Box, Image, useToast } from '@chakra-ui/react'
import * as yup from 'yup'

import { Input, Form, Button } from '../../components/Form'
import assets from '../../assets/assets'

const loginSchema = yup.object().shape({
  password: yup.string().required().label('Password'),
  email: yup
    .string()
    .email('Email must be a valid email')
    .required()
    .label('Email'),
})

const Login = () => {
  const toast = useToast()
  const [isInvalid, setIsInvalid] = useState(false)
  const [user, setUser] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState({ email: '', password: '' })

  const handleChange = ({ target: { name, value } }) => {
    setIsInvalid(false)
    setUser(prevState => ({ ...prevState, [name]: value }))
    setErrorMessage(prevState => ({ ...prevState, [name]: '' }))
  }

  const handleSubmit = async () => {
    try {
      await loginSchema.validate(user)

      setIsInvalid(false)

      localStorage.setItem('isLogged', true)

      toast({
        title: 'Congrats!!!',
        description: 'You are logged in.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      setIsInvalid(true)
      let errorObj = { ...errorMessage }
      let errorMes = error.message
      if (error?.message?.includes('Email')) errorObj['email'] = errorMes
      if (error?.message?.includes('Password')) errorObj['password'] = errorMes

      setErrorMessage(errorObj)
    }
  }

  return (
    <Box className='login'>
      <Box className='login-container'>
        <Image src={assets.images.logo} className='logo' />
        <Image src={assets.images.logoHeading} className='logo-heading' />
        <Image src={assets.images.tagLine} className='tag-line' />
        <Form isInvalid={isInvalid} onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            placeholder='Enter you email'
            label='Email address'
            name='email'
            isInvalid={isInvalid}
            errorMessage={errorMessage.email}
          />
          <Input
            onChange={handleChange}
            placeholder='Enter Password'
            label='Password'
            type='password'
            name='password'
            isInvalid={isInvalid}
            errorMessage={errorMessage.password}
          />

          <Button title='Login' color='default' size='large' type='submit' />
        </Form>
      </Box>
    </Box>
  )
}

export default Login
