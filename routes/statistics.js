var express = require('express');
var router = express.Router();
const statisticsController = require('../dao/controllers/statistics.controller');


router.get('/', (req, res, next) => {

    statisticsController.getStatistics(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })

});


module.exports = router;