const router = require('express').Router(); 
const { Op } = require("sequelize");

const { Users } = require('../modules/orm/models');
var jwt = require('jsonwebtoken');


router.post('/', async function(req, res, next) {
  const { email, nombre, clave } = req.body;

  if (!email && !nombre) {
    res.status(400).json('Email o nombre es requerido');
    next();
  }

  if (!clave) {
    res.status(400).json('La clave es requerida');
    next();
  }

  const usuario = email || nombre;

  try {
      const rta = await Users.findOne({
          where: {
            [Op.and]: [
              {clave},
              {
                [Op.or]: [
                    {email: usuario},
                    {nombre: usuario}
                ]
              }
            ]
          }
      });

      if (rta) {
        const { id, email, nombre, tipo } = rta;

        const token = jwt.sign({id, email, nombre, tipo}, 'shhhhhhared-secret');
        res.status(200).send({code: 200, data: token});
      } else {
        res.status(401).send({code: 401, data: 'Usuario o clave incorrecto'});
      }
  } catch (err) {
    res.status(500).send({code: 500, data: {error: err}});
  }
});

module.exports = router;
