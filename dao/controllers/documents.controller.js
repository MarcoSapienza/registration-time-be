const mongoose = require('mongoose');
const documentModel = mongoose.model('Document');
const async = require('async');


var create = (document, cb)=>{
    documentModel.create(document, (err, data) => {
        if(err){
            console.log(err);
            cb(err);
        }
        else{
            if(data)
                cb(null, data);
            else
                cb("Fail Document creation")
        }
    })
};

var update = (document, cb) => {

    documentModel.findOneAndUpdate({_id: document._id}, document, {new: true}, (err, newDocument) => {

        if(err)
            cb(err);
        else{
            if(newDocument)
                cb(null, newDocument);
            else
                cb("Missing document objectId")
        }
    })
};

var remove = (document, cb) => {

    documentModel.findOneAndDelete({_id: document._id}, (err, data) => {

        if(err)
            cb(err);
        else{
            if(data)
                cb(null, data);
            else
                cb("Missing document objectId")
        }
    })

};

module.exports = {
    createMany: (req, cb) => {

        if(req.body.documents){
            var documentCreated = [];
            async.each(req.body.documents, (document, callback) => {

                create(document, (err, data)=>{
                    if(err)
                        callback(err);
                    else{
                        documentCreated.push(data);
                        callback(null, data);
                    }

                })

            }, (err) => {
                if(err)
                    cb('unable to create document');
                else
                    cb(err, documentCreated)
            })
        }else
            cb('bad params')
    },
    updateMany: (req, cb) => {

        if(req.body.documents){
            var documentsUpdated = [];
            async.each(req.body.documents, (document, callback) => {

                update(document, (err, data)=>{
                    if(err)
                        callback(err);
                    else{
                        documentsUpdated.push(data);
                        callback(null, data);
                    }

                })

            }, (err) => {
                if(err)
                    cb('unable to update document');
                else
                    cb(err, documentsUpdated)
            })
        }else
            cb('bad params')
    },
    deleteMany: (req, cb) => {

        if(req.body.documents){
            async.each(req.body.documents, (document, callback) => {

                remove(document, (err, data)=>{
                    if(err)
                        callback(err);
                    else
                        callback(null, data);

                })

            }, (err) => {
                if(err)
                    cb('unable to delete document');
                else
                    cb(err, 'document Deleted')
            })
        }else
            cb('bad params')
    }
};
