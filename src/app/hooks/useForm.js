import { useState } from 'react'

const useForm = fields => {
  const [inputFields, setInputFields] = useState(fields)
  const [errorMessages, setErrorMessages] = useState(fields)
  const [isInvalid, setIsInvalid] = useState(false)

  const onChange = ({ target: { value, name } }) => {
    setInputFields(prevState => ({ ...prevState, [name]: value }))
    setErrorMessages(prevState => ({ ...prevState, [name]: '' }))
    setIsInvalid(false)
  }

  const onSubmit = async (schema, func) => {
    try {
      await schema.validate(inputFields)
      setIsInvalid(false)
      if (func) func()

      setInputFields(fields)

      return true
    } catch (error) {
      console.log('Errorr  : ', error)
      setIsInvalid(true)
      if (error.name === 'ValidationError') setErrorMessages(prevState => ({ ...prevState, [error.path]: error.message }))
    }
  }

  return [errorMessages, isInvalid, inputFields, setInputFields, setIsInvalid, onChange, onSubmit]
}

export default useForm
