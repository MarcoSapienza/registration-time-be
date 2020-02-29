const mongoose = require('mongoose');
const paperworkModel = mongoose.model('Paperwork');
const rolesController = require('./roles.controller');
const transactionsController = require('./transactions.controller');
const appointmentsController = require('./appointments.controller');
const async = require('async');


module.exports = {
    create: (req, cb) => {

        paperworkModel.create(req.body, (err, data) =>{

            if(err)
                cb(err);
            else {
                console.log("data from paperwork create: ",data);
                cb(null, data._id)
            }

        });
    },
    getPaperwork: (req, cb) => {

        if(req.query.id){

            paperworkModel.findOne({_id: req.query.id})
                .populate({path: 'clients', select: 'name lastname socialName'})
                .populate({path: 'counterparts', select: 'name lastname socialName'})
                .populate({path: 'othersSubjects', select: 'name lastname socialName'})
                .populate({path: 'personInCharge', select: 'name lastname'})
                .populate({path: 'othersPersonInCharge', select: 'name lastname'})
                .populate({path: 'documents'})
                .populate({path: 'roleNumber'}).exec((err, paperwork) => {

                if(err)
                    cb(err);
                else {
                    if(paperwork)
                        cb(null, paperwork);
                    else
                        cb("Missing Paperwork");
                }

            });
        }
        else
            cb("Bad params");

    },
    getPaperworks: (req, cb) => {

        //let query = (req.query.personInCharge) ? {personInCharge: req.query.personInCharge} : {};

        let query = {};

        if('personInCharge' in req.query)
            query = { $or: [ {personInCharge: req.query.personInCharge}, {othersPersonInCharge: req.query.personInCharge} ] };


        if('active' in req.query)
            query['active'] = req.query.active;

        if('client' in req.query)
            query['clients'] = req.query.client;

        if('othersPersonInCharge' in req.query)
            query = (req.query.personInCharge) ? {personInCharge: req.query.personInCharge} : {};

        paperworkModel.find(query)
            .populate({path: 'clients', select: 'name lastname socialName'})
            .populate({path: 'counterparts', select: 'name lastname socialName'})
            .populate({path: 'othersSubjects', select: 'name lastname socialName'})
            .populate({path: 'personInCharge', select: 'name lastname'}).exec((err, paperworks) => {

            if(err)
                cb(err);
            else {
                console.log("Paperworks: ",paperworks);
                cb(null, paperworks)
            }

        });
    },
    updatePaperwork: (req, cb) => {

        if(req.body.personInCharge) {

            let paperwork = req.body;

            paperworkModel.findOneAndUpdate({_id: req.body._id}, paperwork, {new: true}, (err, newPaperwork) => {

                if(err)
                    cb(err);
                else{
                    if(newPaperwork)
                        cb(null, newPaperwork);
                    else
                        cb("Missing paperwork")
                }
            })

        }else
            cb("bad params");

    },
    dismissPaperwork: (req, cb) => {

        if(req.body.id) {

            let active = (req.body.active) ? true : false;

            paperworkModel.findOneAndUpdate({_id: req.body.id}, {$set:{active: active}},{new: true}, (err, newPaperwork) => {

                if(err)
                    cb(err);
                else{
                    if(newPaperwork)
                        cb(null, newPaperwork);
                    else
                        cb("Missing paperwork")
                }


            })

        }else
            cb("bad params");

    },
    removePaperwork: (req, cb) => {
        if(req.query.id) {

            paperworkModel.findOne({_id: req.query.id}).populate({path: 'roleNumber'}).exec((err, paperwork) => {

                if(err)
                    cb(err);
                else {
                    if(paperwork){

                        async.parallel({
                            roles: (callback) => {

                                if (paperwork.roleNumber.length > 0){

                                    let bodyObject = {body: {roles: paperwork.roleNumber}};

                                    rolesController.deleteMany(bodyObject, (err, data) => {
                                        if(err)
                                            callback(err);
                                        else
                                            callback(null, data);
                                    });
                                }else
                                    callback(null, {})


                            },
                            appointments: (callback) => {

                                appointmentsController.removeAppointments({paperwork: paperwork._id}, (err, data) => {

                                    if(err)
                                        callback(err);
                                    else
                                        callback(null, data)

                                });

                            },
                            transactions: (callback) => {

                                transactionsController.removeTransaction({paperwork: paperwork._id}, (err,data) => {
                                    if(err)
                                        callback(err);
                                    else
                                        callback(null, data)
                                })

                            }
                        }, (err, results) => {

                            if(err)
                                cb(err);
                            else{

                                paperworkModel.findOneAndDelete({_id: req.query.id}, (err, data) => {

                                    if(err)
                                        cb(err);
                                    else{
                                        if(data){
                                            cb(null, data);
                                        }
                                        else
                                            cb("Missing paperwork")
                                    }
                                })

                            }
                        });

                    }
                    else
                        cb("Missing Paperwork");
                }

            });

        }else
            cb("bad params");

    }
};
