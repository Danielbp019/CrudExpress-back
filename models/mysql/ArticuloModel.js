import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'crud'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
const connection = await mysql.createConnection(connectionString)

//Modelo
export class ArticuloModel {

    static async getAll() {
        const result = await connection.query(
            'SELECT * FROM articulos'
        )
        console.log(result)
        return result;
    }

    /*     static async getById({ id }) {
            
        }
    
        static async create({ input }) {
            
        }
    
        static async delete({ id }) {
            
        }
    
        static async update({ id, input }) {
            
        } */
}