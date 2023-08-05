import { Box, Image } from '@chakra-ui/react'

import { Input } from '../../components/Form'
import assets from '../../assets/assets'
import BigButton from '../../components/Form/Button'

const Login = () => {
  return (
    <Box className='login'>
      <Box className='login-container'>
        <Image src={assets.images.logo} className='logo' />
        <Image src={assets.images.logoHeading} className='logo-heading' />
        <Image src={assets.images.tagLine} className='tag-line' />
        <Input placeholder='Enter you email' label='Email address' />
        <Input placeholder='Enter Password' label='Password' type='password' />
        <BigButton title='Login' color='default' size='large' />
      </Box>
    </Box>
  )
}

export default Login
