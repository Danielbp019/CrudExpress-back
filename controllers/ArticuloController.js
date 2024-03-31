import { ArticuloModel } from '../models/mysql/ArticuloModel.js'

export class ArticuloController {

    static async getArticulos(req, res) {
        try {
            const [datos] = await ArticuloModel.query(
                "SELECT id ,titulo ,cuerpo ,autor ,created_at ,updated_at FROM articulos;");
            res.json(datos);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Ha ocurrido un error al obtener los artículos' })
        }
    }

    static async postCreateArticulos(req, res) {
        /* Desde postman los datos no se envian como parametros si no como body, con application/x-www-form-urlencoded activado y Content-Type: "application/json" en el header */
        try {
            const { titulo, cuerpo, autor } = req.body //o req.query para enviar por url pero es mejor el body.
            const [rows] = await ArticuloModel.query(
                "INSERT INTO articulos (titulo ,cuerpo ,autor) VALUES (?, ?, ?)", [titulo, cuerpo, autor])
            res.status(201).json({ id: rows.insertId, titulo, cuerpo, autor })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Ha ocurrido un error al crear el artículo' })
        }
    }

}
