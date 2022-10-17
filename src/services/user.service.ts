import AppDataSource from '../data-source'
import { User } from '../entities/user.entity'
import { IUser, IUserLogin } from '../interfaces/users'
import { compare, hash, hashSync } from 'bcrypt'
import { arrayUsersWithOutPassword, userWithOutPassword } from '../serializers/schema.serializer'
import jwt from 'jsonwebtoken'
import 'dotenv/config'



const createdUserService = async ({ email, name, isAdm, password }: IUser): Promise<User> => {

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

    return newUser
}


const sessionUserService = async ({email, password}: IUserLogin) => {

    const useRespository = AppDataSource.getRepository(User)

    const users = await useRespository.find()

    const user = users.find(user => user.email === email )
    if(!user) {
        throw new Error('Invalid email or password')
    }

    const passwordMatch = await compare(password, user.password)
    if(!passwordMatch){
        throw new Error('Invalid email or password')
    }

    const token = jwt.sign({isAdm: user.isAdm, isActive: user.isActive}, process.env.SECRET_KEY as string, {expiresIn: '24h', subject: user.id})
    return token
}


const listUsersService =  (): Promise<User[]> => {
    const useRespository = AppDataSource.getRepository(User)

    const users = useRespository.find()

    return users
}

const updatedUserService = async (user: IUser, id: string): Promise<User | null> => {

    const useRespository = AppDataSource.getRepository(User)

    const findUser = await useRespository.findOneBy({id})

    if(!findUser){
        throw new Error('User not found')
    }

    await useRespository.update(
        id,
        {
            name: user.name ? user.name : findUser.name,
            email: user.email ? user.email : findUser.email,
            password: user.password ? hashSync(user.password, 10) : findUser.password,
        }
    )

    const findUserUpdated = useRespository.findOneBy({id})
    return findUserUpdated

}



const deletedUserService = async (id:string) => {

    const useRespository = AppDataSource.getRepository(User)

    const users = await useRespository.find()

    const userExist = users.find(user => user.id === id)

    if(!userExist){
        return 'User not found'
    }

    if(userExist.isActive === true){
        userExist.isActive = false
    }
    useRespository.delete({id})

}

export { createdUserService, sessionUserService, listUsersService, updatedUserService, deletedUserService }