import path from 'path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

const ProdEnv = new DataSource({
  type: 'postgres',
  url: process.env.DB_URI,
  logging: false,
  entities: [path.join(__dirname, './entities/**/*.{js,ts}')],
  migrations: [path.join(__dirname, './migrations/**/*.{js,ts}')],
})
const TestEnv = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities: [path.join(__dirname, './entities/**/*.{js,ts}')],
})
export default process.env.NODE_ENV == 'test' ? TestEnv : ProdEnv
