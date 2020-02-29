const mongoose = require('mongoose');
const registrationtimeSchema = mongoose.model('Registrationtime');


module.exports = {
    create: (req, cb) => {

        if (req.body.project) {

            let registrationtime = req.body;

            registrationtimeSchema.create(registrationtime, (err, data) => {

                if (err)
                    cb(err);
                else {
                    if (data)
                        cb(null, data);
                    else
                        cb("Fail Registrationtime creation")
                }
            });
        } else
            cb("bad params");

    },
    get: (req, cb) => {

        if(req.query.id){

            registrationtimeSchema.findOne({_id: req.query.id}, (err, subject) => {

                if(err)
                    cb(err);
                else{
                    if(subject)
                        cb(null, subject);
                    else
                        cb("Missing subject")
                }

            })


        }else
            cb("bad params")

    },
    getAll: (req, cb) => {
        let query = {};

        if('project' in req.query)
            query = { customer: req.query.customer };

        registrationtimeSchema.find(query)
            .populate({path: 'project'}).exec((err, projects) => {

            if(err)
                cb(err);
            else {
                cb(null, projects)
            }

        });
    },
    list: (cb) => {
        registrationtimeSchema.find({}).populate({path: 'project', select: 'name'}).exec((err, registrationTimeList) => {
            if(err)
                cb(err);
            else
                cb(null,registrationTimeList);
        })
    },
    update: (req, cb) => {

        if(req.body._id) {

            let subject = req.body;

            registrationtimeSchema.findOneAndUpdate({_id: req.body._id}, subject,{new: true}, (err, newSubject) => {

                if(err)
                    cb(err);
                else{
                    if(newSubject)
                        cb(null, newSubject);
                    else
                        cb("Missing subject")
                }


            })

        }else
            cb("bad params");

    },
    remove: (req, cb) => {

        if(req.query.id) {

            registrationtimeSchema.findOneAndDelete({_id: req.query.id}, (err, data) => {

                if(err)
                    cb(err);
                else{
                    if(data)
                        cb(null, data);
                    else
                        cb("Missing subject")
                }
            })

        }else
            cb("bad params");

    },
};
