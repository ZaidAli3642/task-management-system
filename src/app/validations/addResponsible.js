import * as yup from 'yup'

const addResponsible = yup.object().shape({
  first_name: yup.string().required().label('Name'),
  id: yup.number().typeError('Responsible is a required field').nullable().required().label('Responsible'),
})

export default addResponsible
