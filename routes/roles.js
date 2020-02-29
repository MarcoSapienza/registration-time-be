var express = require('express');
var router = express.Router();
const rolesController = require('../dao/controllers/roles.controller');


router.post('/new', (req, res, next) => {

   rolesController.createMany(req, (err, data) => {
            if(err)
                res.status(404).json(err);
            else
                res.status(202).json(data);
        })
});

router.post('/update', (req, res, next) => {

    rolesController.updateMany(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })
});

router.delete('/', (req, res, next) => {

    rolesController.deleteMany(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })
});

module.exports = router;