import AppDataSource from '../data-source'
import { User } from '../entities/user.entity'
import { IUser, IUserLogin } from '../interfaces/users'
import { compare, hash } from 'bcrypt'
import { userWithOutPassword } from '../serializers/schema.serializer'
import jwt from 'jsonwebtoken'
import 'dotenv/config'



const createdUserService = async ({ email, name, isAdm, password }: IUser) => {

    const useRespository = AppDataSource.getRepository(User)
    
    const users = await useRespository.find()
    const userExists = users.find(user => user.email === email)

    if (userExists) {
        throw new Error("User already exists")
    }

    if(!password) {
        throw new Error("Password is missing")
    }

    const passwordHashed = await hash(password, 10)

    const user = useRespository.create({
       email,
       name, 
       isAdm,
       password: passwordHashed
    })

    const newUser = useRespository.create(user)
    await useRespository.save(newUser)

    return await userWithOutPassword.validate(newUser, {
        stripUnknown: true
    })
}


const sessionUserService = async ({email, password}: IUserLogin) => {

    const useRespository = AppDataSource.getRepository(User)

    const users = useRespository.find()

    const user = (await users).find(user => user.email === email )
    if(!user) {
        throw new Error('Invalid user or password')
    }

    const passwordMatch = await compare(password, user.password)
    if(!passwordMatch){
        throw new Error('Email or password invalid')
    }

    const token = jwt.sign({isAdm: user.isAdm}, process.env.SECRET_KEY as string, {expiresIn: '24h', subject: user.id})
    return token
}

export { createdUserService, sessionUserService }