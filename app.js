import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

//Ruta para manejo del error de la direccion sin ruta.
app.use((req, res) => {
    res.status(404).send('Ruta no valida')
})

//Servidor
const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})