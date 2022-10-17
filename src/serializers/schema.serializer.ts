import * as yup from 'yup'

const userWithOutPassword = yup.object().shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    isAdm: yup.boolean().notRequired(),
    isActive: yup.boolean().notRequired()

})

const arrayUsersWithOutPassword = yup.array(userWithOutPassword)

export { userWithOutPassword, arrayUsersWithOutPassword }