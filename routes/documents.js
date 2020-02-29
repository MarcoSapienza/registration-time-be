var express = require('express');
var router = express.Router();
const documentController = require('../dao/controllers/documents.controller');


router.post('/new', (req, res, next) => {

    documentController.createMany(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })
});

router.post('/update', (req, res, next) => {

    documentController.updateMany(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })
});

router.delete('/', (req, res, next) => {

    documentController.deleteMany(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })
});

module.exports = router;
