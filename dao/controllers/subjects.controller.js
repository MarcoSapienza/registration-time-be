const mongoose = require('mongoose');
const subjectModel = mongoose.model('Subject');

module.exports = {
    create: (req, cb) => {

        if((req.body.name && req.body.lastname) || req.body.socialName){

            let subject = req.body;

            subjectModel.create(subject, (err, data) => {

                if(err)
                    cb(err);
                else{
                    if(data)
                        cb(null, data);
                    else
                        cb("Fail Subject creation")
                }
            });
        }else
            cb("bad params");

    },
    getSubject: (req, cb) => {

        if(req.query.id){

            subjectModel.findOne({_id: req.query.id}, (err, subject) => {

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
    updateSubject: (req, cb) => {

        if((req.body._id) && ((req.body.name && req.body.lastname) || req.body.socialName)) {

            let subject = req.body;

            subjectModel.findOneAndUpdate({_id: req.body._id}, subject,{new: true}, (err, newSubject) => {

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
    dismissSubject: (req, cb) => {

        if(req.body.id) {

            let active = (req.body.active) ? true : false;

            subjectModel.findOneAndUpdate({_id: req.body.id}, {$set:{active: active}},{new: true}, (err, newSubject) => {

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
    removeSubject: (req, cb) => {

        if(req.query.id) {

            subjectModel.findOneAndDelete({_id: req.query.id}, (err, data) => {

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
    listSubjects: (req, cb) => {

        let query = ('active' in req.query) ? {active: req.query.active} : {};

        console.log(req.query);

        subjectModel.find(query, (err, results) => {

            if(err)
                cb(err);
            else
                cb(null, results);

        });

    }
};