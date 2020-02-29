var express = require('express');
var router = express.Router();
const projectController = require('../dao/controllers/project.controller');

router.post("/new", (req, res, next)=>{

    console.log("req: ",req);
    projectController.create(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })

});

router.get("/project", (req, res, next) => {

    projectController.get(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })

});

router.get("/getall", (req, res, next) => {
    projectController.getAllByCustomer(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })
});

router.get("/list", (req, res, next) => {
    projectController.list((err,data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    });
});

router.post("/update", (req, res, next)=>{

    projectController.update(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })

});

router.delete("/remove", (req, res, next) => {

    projectController.remove(req, (err, data) => {

        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);

    })

});

module.exports = router;
