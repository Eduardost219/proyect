const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/CONTACTO', function (req, res) {
    res.send('Esta es la pagina de contacto')
  })
 
app.listen(8080)