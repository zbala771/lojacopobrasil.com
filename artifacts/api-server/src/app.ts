import express from 'express'
import pinoHttp from 'pino-http'

const app = express()

app.use(pinoHttp())

app.get('/', (req, res) => {
  res.send('API online')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

export default app
