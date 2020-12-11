const express = require('express')
const path = require('path')
var cookieParser  = require ('cookie-parser') 
var bodyParser  = require ('body-parser')
const app = express () 

app.use(bodyParser.json())
app.use (cookieParser())

const mongoose = require('mongoose');
var Cat = require("./Models/Cat")
 
app.use(express.static(path.join(__dirname, "public") ))

//conectar a mongodb
mongoose.connect('mongodb+srv://user:contraseñasegura@democluster.itjs7.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

var index = require("./routes/index")


app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/Contacto', function (req, res) {
  res.send('Esta es la página de contacto')
})

app.get('/CrearPelusas', function (req, res) {
  app.get('/', function (req, res) {
    const kitty = new Cat({ name: 'ALAN' });
    kitty.save().then(() => console.log('meow'));
})
})

app.get('/MostrarGatitos', function (req, res) {
  Cat.find(function(error, docs){
      if(error){
        console.log("Algo salió mal");
      }
      console.log(docs)
      res.json(docs)
    })
})
    
 //Middleware
app.use(function(req, res, next){
  var error = new Error('Not Found')
  error.status = 404;
  next(error)
})

module.exports = app;