var express = require('express');
var router = express.Router();
const transactionController = require('../dao/controllers/transactions.controller');


router.post('/new', (req, res, next) => {

    transactionController.create(req, (err, data) => {
        if (err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    });
});

router.get("/transaction", (req, res, next) => {

    transactionController.getTransaction(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })

});

router.post("/update", (req, res, next) => {

    transactionController.updateTransaction(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    })

});

router.post('/mark', (req, res, next) => {

    transactionController.markTransaction(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    });

});

router.get('/list', (req, res, next) => {

    transactionController.listTransactions(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    });

});

router.delete('/remove', (req, res, next) => {

    transactionController.removeTransaction(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    });

});

router.get('/types', (req, res, next) => {
    res.status(200).json(transactionController.getTypes());
});

module.exports = router;