import * as yup from 'yup'

const loginSchema = yup.object().shape({
  password: yup.string().required().label('Password'),
  email: yup.string().email('Email must be a valid email').required().label('Email'),
})

export default loginSchema
