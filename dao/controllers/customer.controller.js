const mongoose = require('mongoose');
const customerSchema = mongoose.model('Customer');


module.exports = {
    create: (req, cb) => {

        if (req.body.name  || req.body.socialName) {

            let subject = req.body;

            customerSchema.create(subject, (err, data) => {

                if (err)
                    cb(err);
                else {
                    if (data)
                        cb(null, data);
                    else
                        cb("Fail Customer creation")
                }
            });
        } else
            cb("bad params");

    },
    get: (req, cb) => {

        if(req.query.id){

            customerSchema.findOne({_id: req.query.id}, (err, subject) => {

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
    list: (cb) => {
        customerSchema.find({}, (err, customerList) => {
            if(err)
                cb(err);
            else
                cb(null,customerList);
        })
    },
    update: (req, cb) => {

        if((req.body._id) && ((req.body.name && req.body.lastname) || req.body.socialName)) {

            let subject = req.body;

            customerSchema.findOneAndUpdate({_id: req.body._id}, subject,{new: true}, (err, newSubject) => {

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

            customerSchema.findOneAndDelete({_id: req.query.id}, (err, data) => {

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
