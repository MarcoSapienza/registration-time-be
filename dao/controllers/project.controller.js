const mongoose = require('mongoose');
const projectSchema = mongoose.model('Project');


module.exports = {
    create: (req, cb) => {

        if (req.body.name && req.body.amountperhour) {

            let project = req.body;

            projectSchema.create(project, (err, data) => {

                if (err)
                    cb(err);
                else {
                    if (data)
                        cb(null, data);
                    else
                        cb("Fail Project creation")
                }
            });
        } else
            cb("bad params");

    },
    get: (req, cb) => {

        if(req.query.id){

            projectSchema.findOne({_id: req.query.id}, (err, subject) => {

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
    getAllByCustomer: (req, cb) => {
        let query = {};

        if('customer' in req.query)
            query = { customer: req.query.customer };

        projectSchema.find(query)
            .populate({path: 'customer'}).exec((err, projects) => {

            if(err)
                cb(err);
            else {
                cb(null, projects)
            }

        });
    },
    list: (cb) => {
        projectSchema.find({}).populate({path: 'customer', select: 'name'}).exec((err, projectList) => {
            if(err)
                cb(err);
            else
                cb(null,projectList);
        })
    },
    update: (req, cb) => {

        if(req.body._id) {

            let subject = req.body;

            projectSchema.findOneAndUpdate({_id: req.body._id}, subject,{new: true}, (err, newSubject) => {

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

            projectSchema.findOneAndDelete({_id: req.query.id}, (err, data) => {

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
