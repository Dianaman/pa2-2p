const express = require('express');
const router = express.Router();

const { Inscripciones } = require('../modules/orm/models');

router.post('/:idMateria', async function(req, res, next) {
    if (req.user.tipo === 'alumno') {
        const { id } = req.user;
        const { idMateria } = req.params.idMateria;

        const user = Inscripciones.build({
            idMateria: idMateria,
            idAlumno: id
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


router.get('/:idMateria', async function(req, res, next) {
    if (req.user.tipo === 'admin' || req.user.tipo === 'profesor') {
        const { id } = req.user;
        const { idMateria } = req.params.idMateria;

        try {
            const rta = await Inscripciones.findAll({
                where: {
                    idMateria: idMateria
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