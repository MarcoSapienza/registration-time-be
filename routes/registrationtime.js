var express = require('express');
var router = express.Router();
const registrationtimeController = require('../dao/controllers/registrationtime.controller');

router.post("/new", (req, res, next)=>{

    registrationtimeController.create(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })

});

router.get("/project", (req, res, next) => {

    registrationtimeController.get(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })

});

router.get("/getall", (req, res, next) => {
    registrationtimeController.getAll(req, (err,data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })
});

router.get("/list", (req, res, next) => {
    registrationtimeController.list((err,data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    });
});

router.post("/update", (req, res, next)=>{

    registrationtimeController.update(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })

});

router.delete("/remove", (req, res, next) => {

    registrationtimeController.remove(req, (err, data) => {

        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);

    })

});

module.exports = router;
