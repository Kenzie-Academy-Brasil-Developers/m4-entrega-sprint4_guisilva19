import * as yup from 'yup'

const userWithOutPassword = yup.object().shape({
    id: yup.string(),
    name: yup.string(),
    email: yup.string().email(),
    createdAt: yup.date(),
    updatedAt: yup.date(),
    isAdm: yup.boolean(),
    isActive: yup.boolean()

})

export { userWithOutPassword }