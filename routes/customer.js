var express = require('express');
var router = express.Router();
const customerController = require('../dao/controllers/customer.controller');

router.post("/new", (req, res, next)=>{

    console.log("req: ",req);
    customerController.create(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })

});

router.get("/customer", (req, res, next) => {

    customerController.get(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })

});

router.get("/list", (req, res, next) => {
    customerController.list((err,data) => {
       if(err)
           res.status(404).json(err);
       else
           res.status(200).json(data);
    });

});

router.post("/update", (req, res, next)=>{

    customerController.update(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })

});

router.delete("/remove", (req, res, next) => {

    customerController.remove(req, (err, data) => {

        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);

    })

});

module.exports = router;
