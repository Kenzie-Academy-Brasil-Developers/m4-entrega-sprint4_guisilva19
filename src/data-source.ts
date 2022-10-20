import { DataSource } from "typeorm"
import "dotenv/config"

const AppDataSource = new DataSource(
    process.env.NODE_ENV === "test" ?
    {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"]
    } :
    {
        type: "postgres",
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'teste',
        logging: true,
        synchronize: false,
        entities: ['src/entities/*.ts'],
        migrations: ['src/migrations/*.ts']
    }
)

export default AppDataSource