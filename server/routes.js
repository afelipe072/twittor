// Routes.js - Módulo de rutas
const  express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const push = require('./push')

const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});


// Post mensaje
router.post('/', function (req, res) {
  
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log(mensajes);


  res.json({
    ok: true,
    mensaje
  });
});

//Almacenar la suscripción
router.post('/subscribe',(req,res)=>{

  const suscripcion=req.body;

  push.addSubscription(suscripcion);
  

  res.json('subscribe');

});

//
router.get('/key',(req,res)=>{

  const key = push.getKey();
  res.send(key);

});

//enviar notificaciones push a los que queramos
//esto se controla del lado del server
router.post('/push',(req,res)=>{

  const notificacion={
    titulo:req.body.titulo,
    cuerpo:req.body.cuerpo,
    usuario:req.body.usuario
  };

  push.sendPush(notificacion)

  res.json(notificacion)
})

module.exports = router;