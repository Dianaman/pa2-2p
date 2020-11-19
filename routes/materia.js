const express = require('express');
const router = express.Router();

const { Materias } = require('../modules/orm/models');

router.post('/', async function(req, res, next) {
    if (req.user.tipo === 'admin') {
        const { materia, cuatrimestre, cupos } = req.body;

        if (cuatrimestre < 1 || cuatrimestre > 4) {
            res.status(400).json('Cuatrimestre inváido');
            next();
        }

        const user = Materias.build({
            materia,
            cuatrimestre,
            cupos
        });

        try {
            const rta = await user.save();
            res.json(rta);
        } catch (err) {
            res.json({error: err});
        }
        
    } else {
        res.status(401).send({code: 401, data: 'Acceso denegado'});
    }

});

router.get('/', async function(req, res, next) {
    if (req.user.tipo === 'alumno') {
        const { id } = req.user;

        try {
            const rta = await Inscripciones.findAll({
                where: {
                    idAlumno: id
                }
            });
    
            res.status(200).send({code: 200, data: rta});
        } catch (err) {
            res.status(500).send({code: 500, data: {error: err}});
        }
        
    } else {
        res.status(401).send({code: 401, data: 'Acceso denegado'});
    }

});

module.exports = router;
