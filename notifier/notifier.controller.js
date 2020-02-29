const cron = require('cron');
const appointmentsController = require('../dao/controllers/appointments.controller');
const operatorsController = require('../dao/controllers/operators.controller');
const async = require('async');
const mailHandler = require('../utils/mailHandler');


var job = cron.job({
    cronTime: '30 07 * * *',
    //cronTime: '*/1 * * * *',
    onTick: function () {
        appointmentsHandler()
    },
    timeZone: 'Europe/Rome'
});

var appointmentsHandler = () => {

    let inputOperator = {query: {notified: true}};
    let inputAppointment = {query: {done: false, days: 1}};

    operatorsController.listOperators(inputOperator, (err, operators) => {

        async.each(operators, (operator, callback) => {

            inputAppointment.query['personInCharge'] = operator._id;
            if(operator.notified){

                appointmentsController.listAppointmentsToNotifyMailController(inputAppointment, (err, data)=>{

                    if(err)
                        callback(err);
                    else{
                        if(data.length>0){

                            console.log("Data from listAppointments: ",data);

                            mailText = mailHandler.dailyAppointmentsFormatter(data);

                            console.log("sending email");

                            mailHandler.sendMail(operator.email, "Impegni di oggi", mailText, (err, response) =>{

                                if(err) {
                                    console.log("Error from node mailer: ", err);
                                    callback(null);
                                }
                                else
                                    console.log(response);
                            });

                        }else
                            callback(null, data);
                    }

                });

            }else
                callback(null)


        }, (err) => {

            if(err)
                console.log(err);

        });

    });


};

module.exports = {
    startNofitier: () => {
        console.log(job.nextDates(5).map(date => date.toString()));
        job.start();
        return "Notifier running"
    },
    stopNofitier: () => {
        job.stop();
        return "Notifier stopped"
    },
    updateNotifier: (date) => {

    }
};
