import { ArticuloModel } from '../models/mysql/ArticuloModel.js'

export class ArticuloController {

    static async getArticulos(req, res) {
        try {
            const [datos] = await ArticuloModel.query(
                "SELECT id ,titulo ,cuerpo ,autor ,created_at ,updated_at FROM articulos;")
                
            res.json(datos);
        } catch (error) {
            res.status(500).json({ error: 'Ha ocurrido un error al obtener los artículos' })
        }
    }

    static async getbyidArticulos(req, res) {
        try {
            const id = req.params.id || req.query.id
            const [datos] = await ArticuloModel.query(
                "SELECT id ,titulo ,cuerpo ,autor ,created_at ,updated_at FROM articulos WHERE id = ?", [id])

            if (datos.length === 0) {
                return res.status(404).json({ message: "No se encontro el articulo" })
            }
            res.json(datos)

        } catch (error) {
            res.status(500).json({ error: 'Ha ocurrido un error al obtener el artículo' })
        }
    }

    static async postCreateArticulos(req, res) {
        /* Desde postman los datos no se envian como parametros si no como body, con application/x-www-form-urlencoded activado y Content-Type: "application/json" en el header */
        try {
            const { titulo, cuerpo, autor } = req.body //o req.query para enviar por url pero es mejor el body.
            const [datos] = await ArticuloModel.query(
                "INSERT INTO articulos (titulo ,cuerpo ,autor) VALUES (?, ?, ?)", [titulo, cuerpo, autor])

            res.status(201).json({ id: datos.insertId, titulo, cuerpo, autor })
        } catch (error) {
            res.status(500).json({ error: 'Ha ocurrido un error al crear el artículo' })
        }
    }

    static async putArticulos(req, res) {
        try {
            const id = req.params.id || req.query.id
            const { titulo, cuerpo, autor } = req.body;
            const [datos] = await ArticuloModel.query(
                "UPDATE articulos SET titulo = IFNULL(?, titulo), cuerpo = IFNULL(?, cuerpo), autor = IFNULL(?, autor) WHERE id = ?", [titulo, cuerpo, autor, id])

            if (datos.affectedRows === 0) {
                return res.status(404).json({ message: "No se encontro el articulo" })
            }
            res.status(200).json({ message: "Articulo editado" })

        } catch (error) {
            res.status(500).json({ error: 'Ha ocurrido un error al editar el artículo' })
        }
    }

    static async DeleteArticulos(req, res) {
        try {
            // Acepta ambas rutas por Parámetros de ruta (http://localhost:8000/api/articulos/13) y Parámetros de consulta (http://localhost:8000/api/articulos/?id=13). La ruta esta definida como /articulos/:id?
            const id = req.params.id || req.query.id
            const [datos] = await ArticuloModel.query(
                "DELETE FROM articulos WHERE id = ?", [id])

            if (datos.affectedRows === 0) {
                return res.status(404).json({ message: "No se encontro el articulo" })
            }
            res.status(200).json({ message: "Articulo eliminado" })

        } catch (error) {
            res.status(500).json({ error: 'Ha ocurrido un error al obtener el artículo' })
        }
    }
}
