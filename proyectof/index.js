const express = require('express')
const app = express();
 //settings 
app.set('port',4000);

//middlewares 


//routes 
app.get('/', (req, res) => {
    res.send('Hello World');
});



//static files


 // escuchando el servidor 
app.listen(app.get('port'), () => {
     console.log('server on port', app.get('port'))
});