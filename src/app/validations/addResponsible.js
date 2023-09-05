import * as yup from 'yup'

const addResponsible = yup.object().shape({
  first_name: yup.string().required().label('Name'),
  id: yup.number().nullable().typeError('Responsible is a required field').label('Responsible'),
})

export default addResponsible
