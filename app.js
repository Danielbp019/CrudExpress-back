import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { articuloRouter } from './routes/ArticuloRouter.js'//Se importa la clase del archivo routes, para usar las rutas.

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

//Usar las rutas importadas, '/api' prefijo para que la ruta se vea mejor
app.use('/api', articuloRouter)

//Ruta para manejo del error de la direccion sin ruta.
app.use((req, res) => {
    res.status(404).send('Ruta no valida')
})

//Servidor
const PORT = process.env.PORT ?? 8000
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})