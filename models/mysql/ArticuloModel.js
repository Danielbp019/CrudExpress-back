import mysql from 'mysql2/promise';

// Crear la conexión a la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export class ArticuloModel {

    static async query(sql, params) {
        const datos = await pool.execute(sql, params);
        return datos;
    }
}
