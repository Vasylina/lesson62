import cookieParser from 'cookie-parser'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/', (req, res) => {
  const expiresTime = new Date(Date.now() + 10000)
  res.cookie('date', new Date().toISOString(), { path: '/', expires: expiresTime })
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
  console.log(req.cookie)
})

app.get('/settings', (req, res) => {
  res.cookie('language', 'uk', { path: '/settings' })
  res.send('Language preference set to Ukrainian')
  console.log(req.cookie)
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
