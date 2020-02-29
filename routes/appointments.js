var express = require('express');
var router = express.Router();
const appointmentController = require('../dao/controllers/appointments.controller');

router.post('/new', (req, res, next) => {

    appointmentController.create(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    });

});

router.post('/update', (req, res, next) => {

    appointmentController.updateAppointment(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    });

});

router.post('/mark', (req, res, next) => {

    appointmentController.markAppointment(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(202).json(data);
    });

});

router.get('/appointment', (req, res, next) => {

    appointmentController.getAppointment(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    });

});

router.delete('/remove', (req, res, next) => {

    appointmentController.removeAppointment(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    });

});

router.get('/list', (req, res, next) => {

    appointmentController.listAppointments(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    });

});


module.exports = router;