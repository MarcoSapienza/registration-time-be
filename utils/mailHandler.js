var nodemailer = require('nodemailer');
const config = require('../config/config');
const moment = require('moment');

var transporter = nodemailer.createTransport({
    service: config.mail.service,
    auth: {
        user: config.mail.user,
        pass: config.mail.password
    }
});

module.exports = {
  sendMail: (to, subject, text, cb) => {

      let mailOptions = {
          from: config.mail.from,
          to: to,
          subject: subject,
          html: text
      };

      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log("Error from transporter sendMail: ",error);
              cb(error);
          } else {
              cb(null, 'Email sent: ' + info.response);
          }
      });
  },
  activationMailFormatter: (activationObject) => {

      let operatorName = activationObject.operator.name;
      let operatorLastname = activationObject.operator.lastname;
      let token = activationObject.token;
      let host = "http://"+config.app.host+":"+config.app.port+"/api/operators/activation?token=";

      let htmlMessage = "<h3>"+ operatorName + " " + operatorLastname +" ha effettuato la registrazione e richiede l'attivazione dell'account</h3>" +
                        "<p>Se vuoi attivare l'account clicca sul seguente link:</p>"+
                        "<p>"+host+token+"</p>";

      return htmlMessage;
  },
    confirmActivationMailFormatter: () => {

        let host = "http://"+config.app.host+":"+config.app.port+"/login"; //TODO: add system name

        let htmlMessage = "<h3>Il tuo account è stato attivato </h3>" +
            "<p>Puoi ora fare il login</p>"+
            "<p>"+host+"</p>";

        return htmlMessage;
    },
    resetPasswordMailFormatter: (password) => {

        let htmlMessage = "<h4>La password del suo account è stata resettata</h4>" +
            "<p>Per accedere al portale è stata generata una nuova password: "+ password + "</p>"+
            "<p>Si ricordi di cambiare la password al primo accesso</p>";

        return htmlMessage;
    },
    dailyAppointmentsFormatter: (appointments) => {

        let closeList = '</ul>';

        let htmlMessage = "<h3>I tuoi impegni di oggi:</h3>"+
                            "<ul style='list-style-type:circle;'>";
        let appointmentsText = "";

        appointments.forEach((appointment) => {

            console.log("Appointment: ",appointment);

            let date = moment(appointment.date).format("DD/M/YYYY, H:mm");
            let appointmentType = appointment.category.description.toUpperCase();
            let idPaperwork = "ID Pratica: "+ appointment.paperwork.id;
            let counterParts = "Controparte: ";
            for(let i=0; i<appointment.counterpartsDetails.length; i++){
                counterParts = counterParts + ", " + appointment.counterpartsDetails[i].socialName;
            }

            appointmentsText += "<li style='font-size: 14px'>" + appointmentType + ": " + appointment.description + " " + date + " " +idPaperwork+ " "+counterParts+"</li>"

        });

        return htmlMessage+appointmentsText+closeList;

    }
};



