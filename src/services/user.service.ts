import AppDataSource from '../data-source'
import { User } from '../entities/user.entity'
import { IUser, IUserLogin, IUserUpdate } from '../interfaces/users'
import { compare, hash, hashSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { AppError } from '../errors/AppError'



const createdUserService = async ({ email, name, isAdm, password }: IUser): Promise<User> => {

    const useRespository = AppDataSource.getRepository(User)

    const users = await useRespository.find()
    const userExists = users.find(user => user.email === email)

    if (userExists) {
        throw new AppError("User already exists", 400)
    }

    if (!password) {
        throw new AppError("Password is missing", 401)
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


const sessionUserService = async ({ email, password }: IUserLogin) => {

    const useRespository = AppDataSource.getRepository(User)

    const users = await useRespository.find()

    const user = users.find(user => user.email === email)
    if (!user) {
        throw new AppError('Invalid email or password', 403)
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
        throw new AppError('Invalid email or password', 403)
    }

    const token = jwt.sign({ isAdm: user.isAdm, isActive: user.isActive }, process.env.SECRET_KEY as string, { expiresIn: '24h', subject: user.id })
    return token
}


const listUsersService = async (): Promise<User[]> => {
    const useRespository = AppDataSource.getRepository(User)

    const users = await useRespository.find()

    return users
}

const updatedUserService = async ({ name, email, password }: IUserUpdate, id: string): Promise<User | null> => {

    const useRespository = AppDataSource.getRepository(User)

    const findUser = await useRespository.findOneBy({ id })

    if (!findUser) {
        throw new AppError('User not found', 404)
    }

    await useRespository.update(
        id,
        {
            name: name ? name : findUser.name,
            email: email ? email : findUser.email,
            password: password ? hashSync(password, 10) : findUser.password,
        }
    )

    const findUserUpdated = useRespository.findOneBy({ id })

    return findUserUpdated

}



const deletedUserService = async (id: string) => {

    const useRespository = AppDataSource.getRepository(User)

    const users = await useRespository.find()

    const userExist = users.find(user => user.id === id)

    if (!userExist) {
        throw new AppError('User not found', 404)
    }

    if (!userExist.isActive) {
        throw new AppError("Is active is false", 400)
    }


    await useRespository.update(
        id,
        {
            isActive: false
        }
    )

}

export { createdUserService, sessionUserService, listUsersService, updatedUserService, deletedUserService }