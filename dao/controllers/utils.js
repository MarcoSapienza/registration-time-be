const moment = require('moment');
const momentTz = require('moment-timezone');
const categoryController = require('./appointmentsCategory.controller');

module.exports = {
    getDaysInterval: (days) => {

        var d = new Date(),
            month = d.getMonth() ,
            year = d.getFullYear(),
            day = d.getDate();

        var from = new Date(year ,month , day);
        from = moment(from);
        from = from.tz("Europe/Amsterdam").format();
        var to = moment(from).add(days, 'days')
            .format();

        return {from: from, to: to}
    },
    getCourtHearingsCategory: (callback) => {

        let query = {query : {description: '(UD) Udienza'}};

        categoryController.getAppointmentCategory(query, (err, data) => {
            if(err)
                callback(err);
            else
                callback(null, data)

        });

    }
};