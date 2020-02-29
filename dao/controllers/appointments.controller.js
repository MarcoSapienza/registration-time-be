const mongoose = require('mongoose');
const appointmentModel = mongoose.model('Appointment');
const paperworkModel = mongoose.model('Paperwork');
const subjectModel = mongoose.model('Subject');
const waterfall = require('async/waterfall');
const utils = require('./utils');
const async = require('async');

module.exports = {

    create: (req, cb) => {

        appointmentModel.create(req.body, (err, appointment) => {

            if(err)
                cb(err);
            else{

                paperworkModel.findOneAndUpdate({_id: appointment.paperwork}, {$push: {appointments: appointment._id}}, {new:true}, (err,data) =>{

                    if(err)
                        cb(err);
                    else
                        cb(null, "Appointment created!")

                });


            }

        });
    },
    getAppointment: (req, cb) => {

        if(req.query.id){

            appointmentModel.findOne({_id: req.query.id}).populate('personInCharge').populate('paperwork').populate('category').exec((err, appointment) => {

                if(err)
                    cb(err);
                else{
                    if(appointment)
                        cb(null, appointment);
                    else
                        cb("Missing appointment")
                }

            })


        }else
            cb("bad params")

    },
    updateAppointment: (req, cb) => {

        if(req.body._id) {

            let appointment = req.body;

            appointmentModel.findOneAndUpdate({_id: req.body._id}, appointment,{new: true}, (err, newAppointment) => {

                if(err)
                    cb(err);
                else{
                    if(newAppointment)
                        cb(null, newAppointment);
                    else
                        cb("Missing appointment")
                }

            })

        }else
            cb("bad params");

    },
    markAppointment: (req, cb) => {

        if(req.body.id) {

            let done = (req.body.done) ? true : false;

            appointmentModel.findOneAndUpdate({_id: req.body.id}, {$set:{done: done}},{new: true}, (err, newAppointment) => {

                if(err)
                    cb(err);
                else{
                    if(newAppointment)
                        cb(null, newAppointment);
                    else
                        cb("Missing appointment")
                }


            })

        }else
            cb("bad params");

    },
    removeAppointment: (req, cb) => {

        if(req.query.id) {

            appointmentModel.findOneAndDelete({_id: req.query.id}, (err, data) => {

                if(err)
                    cb(err);
                else{
                    if(data)
                        cb(null, data);
                    else
                        cb("Missing appointment")
                }

            })

        }else
            cb("bad params");

    },
    removeAppointments: (filter, cb) => {

            appointmentModel.deleteMany(filter, (err, data) => {

                if(err)
                    cb(err);
                else{
                    if(data)
                        cb(null, data);
                    else
                        cb("Missing appointments")
                }

            })

    },
    listAppointments: (req, cb) => {

        let query = (req.query.paperwork) ? {paperwork: req.query.paperwork} : ((req.query.personInCharge) ? {personInCharge: req.query.personInCharge} : {});

        if('done' in req.query)
            query['done'] = req.query.done;
        if('category' in req.query)
            query['category'] = req.query.category;
        if('days' in req.query){
            var intervalDates = utils.getDaysInterval(req.query.days);
            query['date'] = {$gte: intervalDates.from, $lte: intervalDates.to};
        }

        appointmentModel.find(query).populate('personInCharge').populate('paperwork').populate('category').sort({date: 1}).exec((err, appointments) => {
            if(err)
                cb(err);
            else {
                cb(null, appointments);
            }
        });
    },
    listAppointmentsToNotifyMailController: (req, cb) => {
        let query = (req.query.paperwork) ? {paperwork: req.query.paperwork} : ((req.query.personInCharge) ? {personInCharge: req.query.personInCharge} : {});

        if('done' in req.query)
            query['done'] = req.query.done;
        if('category' in req.query)
            query['category'] = req.query.category;
        if('days' in req.query){
            var intervalDates = utils.getDaysInterval(req.query.days);
            query['date'] = {$gte: intervalDates.from, $lte: intervalDates.to};
        }

        appointmentModel.find(query).populate('personInCharge').populate('paperwork').populate('category').sort({date: 1}).exec((err, appointments) => {
            if(err)
                cb(err);
            else {
                let counterpartsDetails = [];
                async.each(appointments, (appointment, cb) => {

                    if (appointment.paperwork.counterparts) {
                        var newAppointment = Object.assign({}, appointment._doc);
                        newAppointment['counterpartsDetails'] = new Array();
                        subjectModel.find({_id: appointment.paperwork.counterparts}, (err, counterparts) => {
                            if (err) {
                                console.log(err);
                                cb(err)
                            } else {
                                for (let i = 0; i < appointment.paperwork.counterparts.length; i++) {
                                    for (let j = 0; j < counterparts.length; j++) {
                                        if (appointment.paperwork.counterparts[i].toString() === counterparts[j]._id.toString()) {
                                            newAppointment.counterpartsDetails.push(counterparts[j]);
                                        }
                                    }
                                }
                                counterpartsDetails.push(newAppointment);
                                cb(null, counterpartsDetails);

                            }
                        })
                    }
                }, (err) => {
                    if(err)
                        cb('unable to update document');
                    else
                        cb(err, counterpartsDetails)
                })
            }
        });
    }

};
