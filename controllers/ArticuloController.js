import { ArticuloModel } from '../models/mysql/ArticuloModel.js'

export class ArticuloController {

    static getAll = async (req, res) => {
        const articulos = await this.ArticuloModel.getAll()
        res.json(articulos)
    }

}