const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaperworkSchema = new Schema({
    id: {
      type: Number
    },
    number:{
      type: Number
    },
    object: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    startTime:{
        type: Date,
        required: true,
        default: Date.now()
    },
    clients: [{
        type: Schema.ObjectId,
        ref: 'Subject'
    }],
    personInCharge: [{
        type: Schema.ObjectId,
        ref: 'Operator',
        require: true
    }],
    counterparts:[{
        type: Schema.ObjectId,
        ref: 'Subject'
    }],
    othersSubjects: [{
        type: Schema.ObjectId,
        ref: 'Subject'
    }],
    transactions: [{
        type: Schema.ObjectId,
        ref: 'Transaction'
    }],
    appointments: [{
        type: Schema.ObjectId,
        ref: 'Appointment'
    }],
    description: String,
    legalActivity: String,
    extraLegalActivity: String,
    documents: [{
        type: Schema.ObjectId,
        ref: 'Document'
    }],
    roleNumber: [{
        type: Schema.ObjectId,
        ref: 'Role'
    }],
    value: Number,
    othersPersonInCharge: [{
        type: Schema.ObjectId,
        ref: 'Operator'
    }]
});

const CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counterModel = mongoose.model('counter', CounterSchema);

PaperworkSchema.pre('save', function(next) {
    var doc = this;
    counterModel.findByIdAndUpdate({_id: 'id'}, {$inc: { seq: 1} }, {upsert:true, new:true}, function(error, counter)   {
        if(error)
            return next(error);

        doc.id = counter.seq;
        next();
    });
});

module.exports = PaperworkSchema;
