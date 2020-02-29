const mongoose = require('mongoose');
const paperworkModel = mongoose.model('Paperwork');
const transactionsModel = mongoose.model('Transaction');
const appointmentsModel = mongoose.model('Appointment');
const utils = require('./utils');
const async = require('async');
const config = require('../../config/config');
const spending = config.transactions.costs;
const revenue = config.transactions.revenue;

module.exports = {
    getStatistics: (req, cb) => {

        async.parallel({
            appointments: (callback) => {

                var intervalDates = utils.getDaysInterval(30);
                var from = intervalDates.from;
                var to = intervalDates.to;

                let query = (req.query.personInCharge) ? {personInCharge: mongoose.Types.ObjectId(req.query.personInCharge)} : {};

                query['done'] = false;
                query['date'] = {$gte: from, $lte: to};

                utils.getCourtHearingsCategory((err, category) => {

                    if(category){
                        query['category'] = category._id;

                        appointmentsModel.countDocuments(query, (err,data) => {

                            if(err){
                                cb(err);
                            }
                            else
                                callback(null, data);

                        });
                    }else
                        callback(err)

                });
            },
            paperworksNumber: (callback) => {

                let query = (req.query.personInCharge) ? {personInCharge: mongoose.Types.ObjectId(req.query.personInCharge)} : {};
                query['active'] = true;

                paperworkModel.countDocuments(query).exec((err, paperworksNumber) => {

                    if(err)
                        callback(err);
                    else
                        callback(null, paperworksNumber)

                });

            },
            transactions: (callback) => {

                let query = (req.query.personInCharge) ? {personInCharge: mongoose.Types.ObjectId(req.query.personInCharge)} : {};

                transactionsModel.aggregate([
                    {$match: query},
                    {
                        $lookup:{
                            from: 'paperworks',
                            localField: 'paperwork',
                            foreignField: '_id',
                            as: 'paperworkTransaction'
                        }
                    },
                    {$match: {"paperworkTransaction.active": true}},
                    { $project: {
                            _id: 0,
                            cost: {$cond: [{$and:[{$in: ['$type', spending]},{$eq: ['$paid', false]}]}, '$amount', 0]},
                            earnings: {$cond: [{$and:[{$in: ['$type', revenue]}, {$eq:['$paid', true]}]}, '$amount', 0]}
                        }
                    },
                    {
                        $group:{
                            _id : "result",
                            costs: {$sum: "$cost"},
                            revenue: {$sum: "$earnings"}
                        }
                    },
                ], (err, data) => {

                    if(err)
                        cb(err);
                    else
                    {
                        let result = {
                            costs: 0,
                            revenue: 0
                        };
                        if(data[0]){

                            result = {
                                costs: data[0].costs,
                                revenue: data[0].revenue,
                            };
                        }
                        callback(null, result)

                    }
                });

            }
        }, (err, results) => {

            if(err)
                cb(err);
            else

                cb(null,
                    {
                        appointments: results.appointments,
                        costs: results.transactions.costs,
                        revenue: results.transactions.revenue,
                        paperworkNumber: results.paperworksNumber
                    })

        });
    }
};