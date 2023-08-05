import assets from '../../assets/assets'
import { Input } from '../../components/Form'
import BigButton from '../../components/Form/Button'

const Login = () => {
  return (
    <div className='login'>
      <div className='login-container'>
        <img src={assets.images.logo} className='logo' />
        <img src={assets.images.logoHeading} className='logo-heading' />
        <img src={assets.images.tagLine} className='tag-line' />
        <Input placeholder={'Enter you email'} label={'Email address'} />
        <Input placeholder={'Enter Password'} label={'Password'} />
        <BigButton title='Login' size='large' color='default' />
      </div>
    </div>
  )
}

export default Login
