var express = require('express');
var router = express.Router();
const appointmentCategoryController = require('../dao/controllers/appointmentsCategory.controller');

router.post('/new', (req, res, next) => {

    appointmentCategoryController.create(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    });

});

router.get('/category', (req, res, next) => {

    appointmentCategoryController.getAppointmentCategory(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    });

});


router.get('/list', (req, res, next) => {

    appointmentCategoryController.listAppointmentsCategory(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    });

});

module.exports = router;