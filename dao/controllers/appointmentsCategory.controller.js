const mongoose = require('mongoose');
const appointmentCategoryModel = mongoose.model('AppointmentCategory');

module.exports = {

    create: (req, cb) => {

        appointmentCategoryModel.create(req.body, (err, data) => {

            if(err)
                cb(err);
            else
                cb(null, "Appointment Category created !")

        });
    },
    getAppointmentCategory: (req, cb) => {
            let query = {};

            if(req.query.id)
                query['_id'] = req.query.id;
            if(req.query.description)
                query['description'] = req.query.description;
            if(req.query.category)
                query['category'] = req.query.category;

            appointmentCategoryModel.findOne(query).exec((err, appointmentCategory) => {

                if(err)
                    cb(err);
                else{
                    if(appointmentCategory)
                        cb(null, appointmentCategory);
                    else
                        cb("Missing appointmentCategory")
                }

            })

    },
    listAppointmentsCategory: (req, cb) => {

        appointmentCategoryModel.find({},(err, appointmentsCategory) => {

            if(err)
                cb(err);
            else
                cb(null, appointmentsCategory);
        });

    }
};
