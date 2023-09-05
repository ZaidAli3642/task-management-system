import { useState } from 'react'

const useForm = (fields, errorFields) => {
  const [inputFields, setInputFields] = useState(fields)
  const [errorMessages, setErrorMessages] = useState(errorFields || fields)
  const [isInvalid, setIsInvalid] = useState(false)

  const onChange = ({ target: { value, name } }) => {
    setInputFields(prevState => ({ ...prevState, [name]: value }))
    setErrorMessages(prevState => ({ ...prevState, [name]: '' }))
    setIsInvalid(false)
  }

  const onSubmit = async (schema, func, isClearFields = true) => {
    try {
      schema && (await schema.validate(inputFields))
      setIsInvalid(false)
      if (func) func()

      isClearFields && setInputFields(fields)

      return true
    } catch (error) {
      setIsInvalid(true)
      if (error.name === 'ValidationError') setErrorMessages(prevState => ({ ...prevState, [error.path]: error.message }))
    }
  }

  return [errorMessages, isInvalid, inputFields, setInputFields, setIsInvalid, onChange, onSubmit]
}

export default useForm
