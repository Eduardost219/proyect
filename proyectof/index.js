const express = require('express')
const path = require("path")
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const app = express()
const bcrypt = require('bcrypt')
const User = require('./user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cookieParser())

const mongoose = require('mongoose')
var Cat = require("./Models/Cat")


app.use(express.static(path.join(__dirname, "public") ))

// Conectar a MongoDB
mongoose.connect('mongodb+srv://user:contraseñasegura@cluster0.vtw1e.mongodb.net/FINAL?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

var index = require("./routes/index")

app.get('/', function (req, res) {
    res.send('Hello World')
})


app.get('/CrearPelusas', function (req, res) {
    const kitty = new Cat({ name: 'Pelusas' });
    kitty.save().then(() => console.log('meow'));
})

app.post('/CrearGatito', function (req, res) {
    var nuevoGatito = new Cat(req.body);
    nuevoGatito.save(function(error, docs){
        if(error){
            console.log("Algo salió mal")
        }
        res.json(docs)
    })
})

app.delete('/BorrarGatito/:id', function (req, res) {
    var id = req.params.id;
    Cat.remove({_id: id}, function(error, docs ){
        if(error){
            console.log("algo salió mal")
        }
        res.json(docs)
    })
})

app.get('/MostrarGatitos', function (req, res) {
    Cat.find(function (error, docs){
        if (error){
            console.log("Algo salió mal");
        }
        console.log(docs)
        res.json(docs)
    })
})

app.get('/ObtenerGatito/:id', function (req, res) {
    var id = req.params.id;
    var gato = req.body;
    
    Cat.find({_id: id}, function (error, docs) {
        if (error) { 
            console.log("Algo salió mal");
        }
        console.log(docs)
        res.json(docs)
    })
})

app.get('/Contacto', function (req, res) {
    res.send('Esta es la página de contacto')
})

app.post('/registrado', (req, res) =>{
    const {username, password} = req.body;

    const user = new User({username, password})
    
user.save(err =>{
    if(err){
        res.status(500).send('ERROR AL REGISTRAR USUARIO');
    }else{
        res.status(200).send('USUARIO REGISTRADO SATISFACTORIAMENTE');
    }

});

});

app.post('/logeado', (req, res) =>{
    const {username, password} = req.body;
    User.findOne({username}, (err, user) =>{
    if(err){
        res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');
    }else if(!user){
        res.status(500).send('EL USUARIO NO EXISTE');
    }else {
        User.isCorrectPassword(password, (err, result) =>{
            if(err){
                res.status(500).send('ERROR AL AUTENTICAR');
            }else if(result){
                res.status(200).send('USUARIO AUTENTICADO CORRECTAMENTE');
            }else{
                res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA');
            }
        });
    }
    });
}); 


// Middleware
app.use(function(req, res, next){
    var error = new Error('Not Found')
    error.status = 404;
    next(error)
})


module.exports = app;