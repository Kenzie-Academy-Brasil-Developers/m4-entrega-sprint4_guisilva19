import * as yup from 'yup'


const schema = yup.object().shape({
    name: yup.string().notRequired(),
    password: yup.string().notRequired(),
    email: yup.string().notRequired()

})

export default schema