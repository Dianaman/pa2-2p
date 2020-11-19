const express = require('express');
const router = express.Router();

const { Logs } = require('../../modules/orm/models');

router.use(async function(req, res, next) {
    const { url, method, user } = req;
    const ip = req.ip || req.connection?.remoteAddress;
    const usuario = user?.email;
    
    const log = Logs.build({
        usuario,
        metodo: method,
        ruta: url,
        ip
    });

    try {
        const rta = await log.save();
        next();
    } catch (err) {
        res.json({error: err});
    }

});

module.exports = router;