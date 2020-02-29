const mongoose = require('mongoose');
const transactionModel = mongoose.model('Transaction');
const paperworkModel = mongoose.model('Paperwork');
const config = require('../../config/config');


module.exports = {

    create: (req, cb) => {

        transactionModel.create(req.body, (err, transaction) => {

            if(err)
                cb(err);
            else{

                paperworkModel.findOneAndUpdate({_id: transaction.paperwork}, {$push: {transactions: transaction._id}}, {new:true}, (err,data) =>{

                    if(err)
                        cb(err);
                    else
                        cb(null, "Transaction created!")

                });

            }

        });

    },
    getTransaction: (req, cb) => {

        if(req.query.id){

            transactionModel.findOne({_id: req.query.id}).populate({path: 'personInCharge', select: 'name lastname'}).populate('paperwork').exec((err, transaction) => {

                if(err)
                    cb(err);
                else {
                    if(transaction)
                        cb(null, transaction);
                    else
                        cb("Missing Transaction");
                }

            });
        }
        else
            cb("Bad params");

    },
    updateTransaction: (req, cb) => {

        if((req.body._id) && req.body.type) {

            let transaction = req.body;

            findTransactionAndUpdate(req.body._id, transaction,  (err, result) => {
                if(err)
                    cb(err);
                else
                    cb(null, result)
            });

        }else
            cb("bad params");

    },
    markTransaction: (req, cb) => {

        if(req.body.id) {

            let updateFields = {};
            if('paid' in req.body){
                updateFields['paid'] = (req.body.paid) ? true : false;
            }

            if('active' in req.body){
                updateFields['active'] = (req.body.active) ? true : false;
            }

            findTransactionAndUpdate(req.body.id, {$set:updateFields},  (err, result) => {
                if(err)
                    cb(err);
                else
                    cb(null, result)
            });

        }else
            cb("bad params");

    },
    listTransactions: (req, cb) => {

        let query = (req.query.paperwork) ? {paperwork: req.query.paperwork} : ((req.query.personInCharge) ? {personInCharge: req.query.personInCharge} : {});

        if('paid' in req.query)
            query['paid'] = req.query.paid;

        if('active' in req.query)
            query['active'] = req.query.active;

        if('type' in req.query)
            query['type'] = req.query.type;

        if('paperworkActive' in req.query){

            let paperworkActive = (req.query.paperworkActive == 'true') ? true : false;
            query['paid'] = (query['paid'] == 'true') ? true : false;

            getTransactionsByActivePaperworks(query, paperworkActive, (err, appointments) => {
                if(err)
                    cb(err);
                else
                    cb(null, appointments);
            })
        }else{

            getTransactions(query, (err, appointments) =>{
                if(err)
                    cb(err);
                else
                    cb(null, appointments);
            })
        }
    },
    getTypes: () => {
        return config.transactions;
    },
    removeTransaction: (req, cb) => {

        if(req.query.id) {

            transactionModel.findOneAndDelete({_id: req.query.id}, (err, data) => {

                if(err)
                    cb(err);
                else{
                    if(data)
                        cb(null, data);
                    else
                        cb("Missing transaction")
                }
            })

        }else
            cb("bad params");
    },
    removeTransaction: (filter, cb) => {

        transactionModel.deleteMany(filter, (err, data) => {

            if(err)
                cb(err);
            else{
                if(data)
                    cb(null, data);
                else
                    cb("Missing transactions")
            }

        })

    },
};

var findTransactionAndUpdate = (transactionId, updateFields, cb) =>{

    transactionModel.findOneAndUpdate({_id: transactionId}, updateFields,{new: true}, (err, newTransaction) => {

        if(err)
            cb(err);
        else{
            if(newTransaction)
                cb(null, newTransaction);
            else
                cb("Missing transaction")
        }


    })

};

var getTransactions = (query, cb) => {

    transactionModel.find(query)
        .populate({path: 'personInCharge', select: 'name lastname'})
        .populate({path: 'paperwork', select: 'number description object id'}).sort({date: 1}).exec((err, appointments) => {

        if(err)
            cb(err);
        else
            cb(null, appointments);
    });
};


var getTransactionsByActivePaperworks = (query, paperworkActive, cb) =>{

    if(query.personInCharge)
        query['personInCharge'] = mongoose.Types.ObjectId(query['personInCharge']);

    transactionModel.aggregate([
        {$match: query},
        {
            $lookup:{
                from: 'paperworks',
                localField: 'paperwork',
                foreignField: '_id',
                as: 'paperwork'
            }
        },
        {$match:
                {"paperwork.active": paperworkActive}
        },
        {
            $lookup: {
                from: 'operators',
                localField: 'personInCharge',
                foreignField: '_id',
                as: 'personInCharge'
            }
        }
    ], (err, data) => {

        if(err)
            cb(err);
        else
            cb(null, data)

    });


};
