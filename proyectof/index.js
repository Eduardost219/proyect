const express = require('express')
const path = require("path")
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const app = express()
const bcrypt = require('bcrypt')
const User = require('/Users/USUARIO/GIT/proyect/proyectof/user')
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cookieParser())



var Productos = require("./Models/Productos")


app.use(express.static(path.join(__dirname, "public") ))

// Conectar a MongoDB
mongoose.connect('mongodb+srv://usuario:contraseñasegura@cluster0.cf67m.mongodb.net/ProyectoFinal?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});





app.get('/Contacto', function (req, res) {
    res.send('Esta es la página de contacto')
})

app.post('/registrado', (req, res) =>{
    const {username, password} = req.body;

    const user = new User({username, password})
    
user.save(err =>{
    if(err){
        res.status(500).send('ESTE NOMBRE DE USUARIO YA HA SIDO USADO ELIGE OTRO');
    }else{
        res.status(200).send('USUARIO REGISTRADO ');
    }

});

});

app.post('/Logeado', (req, res) =>{
    const {username, password} = req.body;

    User.findOne({username}, (err, user) =>{
        if(err){
            res.status(500).send('ERROR AL AUTENTICAR AL USUARIO');
        }else if(!user){
            res.status(500).send('EL USUARIO NO EXISTE');
        }else {
            user.isCorrectPassword(password, (err, result) =>{
                if(err){
                    res.status(500).send('ERROR AL AUTENTICAR');
                }else if(result){
                    res.redirect('index.html');
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