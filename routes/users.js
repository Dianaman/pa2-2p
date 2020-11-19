const express = require('express');
const router = express.Router();

const { Users } = require('../modules/orm/models');

router.post('/', async function(req, res, next) {
    const { email, nombre, clave, tipo } = req.body;

    if (!email) {
      res.status(400).json({error: 'Email es requerido'});
      next();
    }

    if (!nombre) {
      res.status(400).json({error: 'Nombre es requerido'});
      next();
    }

    if (nombre.indexOf(' ') > -1) {
      res.status(400).json({error: 'El nombre no puede contener espacios'});
      next();
    }

    if (!clave ) {
      res.status(400).json({error: 'Clave es requerido'});
      next();
    }

    if (clave.length < 4 ) {
      res.status(400).json({error: 'La clave debe tener al menos 4 caracteres'});
      next();
    }


    if (tipo !== 'admin' && tipo !== 'profesor' && tipo !== 'alumno') {
      res.status(400).send({code: 400, data: {error: 'Tipo debe ser admin, profesor o alumno'}});
      next();
    }

    const user = Users.build({
        email,
        nombre,
        clave,
        tipo
    });

    try {
        const rta = await user.save();
        res.status(200).send({code: 200, data: rta});
    } catch (err) {
      res.status(400).send({code: 400, data: {error: err}});
    }
    
});

module.exports = router;
