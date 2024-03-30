import { ArticuloModel } from '../models/mysql/ArticuloModel.js'

export class ArticuloController {

    static getAll = async (req, res) => {
        try {
            const [rows] = await ArticuloModel.query("SELECT id ,titulo ,cuerpo ,autor ,created_at ,updated_at FROM articulos;");
            res.json(rows);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Ha ocurrido un error al obtener los artículos' });
        }
    };

}