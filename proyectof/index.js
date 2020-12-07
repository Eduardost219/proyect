const express = require('express')
const app = express()
const mongoose = require('mongoose');
 
//conectar a mongodb
mongoose.connect('mongodb+srv://user:contraseñasegura@democluster.itjs7.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'ALAN' });
kitty.save().then(() => console.log('meow'));


app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/Contacto', function (req, res) {
  res.send('Esta es la página de contacto')
})

app.get('/Pelusas', function (req, res) {
  app.get('/', function (req, res) {
    const kitty = new Cat({ name: 'ALAN' });
    kitty.save().then(() => console.log('meow'));
})
})
 
app.listen(3000)