const express = require('express');
const router = express.Router();

const { Notas } = require('../modules/orm/models');

router.put('/:idMateria', async function(req, res, next) {
    if (req.user.tipo === 'profesor') {
        const { alumno, nota } = req.body;
        const idMateria = req.params.idMateria;

        try {
            const rta = await Notas.update({
                nota: nota
            }, {
                where: {
                    [Op.and]: [
                        {idAlumno: alumno},
                        {idMateria: idMateria}
                    ]         
                }
            });            
            res.status(200).send({code: 400, data: rta});
        } catch (err) {
            res.status(500).send({code: 500, data: {error: err}});
        }
        
    } else {
        res.status(401).send({code: 401, data: 'Acceso denegado'});
    }

});

module.exports = router;
