import { object, string, ref } from 'yup'

export const createUserSchema = object({
  body: object({
    name: string().required('Name is required'),
    email: string().required('email is required'),
    password: string()
      .required('password is required')
      .min(6, 'password is to short - should be 6 char at least ')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'password can contain one latin letter'),
    role: string()
  })
})

export const createUserSessionSchema = object({
  body: object({
    email: string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password is too short - should be 6 chars minimum.')
      .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.')
  })
})
