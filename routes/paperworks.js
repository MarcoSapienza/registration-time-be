var express = require('express');
var router = express.Router();
const paperworksController = require('../dao/controllers/paperworks.controller');


router.post('/new', (req, res, next) => {

    paperworksController.create(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })

});

router.post('/update', (req, res, next) => {

    paperworksController.updatePaperwork(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })
});

router.get('/paperwork', (req, res, next) => {

    paperworksController.getPaperwork(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })

});

router.get('/list', (req, res, next) => {

    paperworksController.getPaperworks(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })

});

router.delete('/remove', (req, res, next) => {

    paperworksController.removePaperwork(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })

});

router.post("/state", (req, res, next) => {

    paperworksController.dismissPaperwork(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })

});


module.exports = router;