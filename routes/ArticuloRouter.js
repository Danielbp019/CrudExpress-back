import { Router } from 'express'
import { ArticuloController } from '../controllers/ArticuloController.js'

export const articuloRouter = Router()//Se exporta y se declara la clase al mismo tiempo con este codigo

//Siempre que se llaman rutas de este archivo comienzan con la constante articuloRouter.(tipo de ruta)
articuloRouter.get('/', (req, res) => res.send('Ruta get del hola desde node y express js'))

articuloRouter.get('/todo', ArticuloController.getAll)