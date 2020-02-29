var express = require('express');
var router = express.Router();
const subjectController = require('../dao/controllers/subjects.controller');

router.post("/new", (req, res, next)=>{

    subjectController.create(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })

});

router.get("/subject", (req, res, next) => {

    subjectController.getSubject(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })

});

router.post("/update", (req, res, next)=>{

    subjectController.updateSubject(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })

});

router.delete("/remove", (req, res, next) => {

    subjectController.removeSubject(req, (err, data) => {

        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);

    })

});

router.post("/state", (req, res, next)=>{

    subjectController.dismissSubject(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })

});

router.get('/list', (req, res, next) => {

    subjectController.listSubjects(req, (err,data) => {
        if(err)
            res.status(401).json("Activation failed");
        else
            res.status(200).json(data);
    })

});

module.exports = router;
