const mongoose = require( 'mongoose' );
const config = require('../config/config');

//const dbURI = 'mongodb://' + config.db.host+':'+config.db.port+'/'+config.db.dbname;


//MongoDB on MongoDB Atlas
const dbURI = 'mongodb+srv://user_test:PHVx4CoTyhlijy3Q@cluster0-humfy.mongodb.net/test?retryWrites=true&w=majority\n';



mongoose.connect(dbURI,{ useNewUrlParser: true ,'useCreateIndex': true});

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


// mongoose.model('Operator', require('./models/operators'));
// mongoose.model('Activation', require('./models/activations'));
// mongoose.model('Subject', require('./models/subjects'));
// mongoose.model('Transaction', require('./models/transactions'));
// mongoose.model('Appointment', require('./models/appointments'));
// mongoose.model('AppointmentCategory', require('./models/appointmentCategory'));
// mongoose.model('Paperwork', require('./models/paperworks'));
// mongoose.model('Role', require('./models/roles'));
// mongoose.model('Document', require('./models/documents'));

mongoose.model('Customer', require('./models/customer'));
mongoose.model('Project', require('./models/project'));
mongoose.model('Registrationtime', require('./models/registrationtime'));
// mongoose.model('Invoice', require('./models/invoice'));
// mongoose.model('Project', require('./models/project'));
// mongoose.model('Registrationtime', require('./models/registrationtime'));
