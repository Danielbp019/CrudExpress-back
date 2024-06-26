import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { articuloRouter } from './routes/ArticuloRouter.js'// Se importa la clase del archivo routes, para usar las rutas.
import { PORT } from './config.js' // Se importa el puerto del servidor

const app = express()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(json());
app.use(corsMiddleware())
app.disable('x-powered-by')

//Usar las rutas importadas, '/api' prefijo para que la ruta se vea mejor
app.use('/api', articuloRouter)

//Ruta para manejo del error de la direccion sin ruta.
app.use((req, res) => {
    res.status(404).send('Ruta no valida')
})

//Servidor
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})