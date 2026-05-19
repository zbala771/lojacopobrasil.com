import express from 'express'
const pinoHttp = require('pino-http')

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
