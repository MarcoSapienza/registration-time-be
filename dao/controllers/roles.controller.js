const mongoose = require('mongoose');
const roleModel = mongoose.model('Role');
const async = require('async');


var create = (role, cb)=>{
    roleModel.create(role, (err, data) => {
        if(err){
            console.log(err);
            cb(err);
        }
        else{
            if(data)
                cb(null, data);
            else
                cb("Fail Role creation")
        }
    })
};

var update = (role, cb) => {

    roleModel.findOneAndUpdate({_id: role._id}, role, {new: true}, (err, newRole) => {

        if(err)
            cb(err);
        else{
            if(newRole)
                cb(null, newRole);
            else
                cb("Missing role number")
        }
    })
};

var remove = (role, cb) => {

    roleModel.findOneAndDelete({_id: role._id}, (err, data) => {

        if(err)
            cb(err);
        else{
            if(data)
                cb(null, data);
            else
                cb("Missing role number")
        }
    })

};

module.exports = {
    createMany: (req, cb) => {

        if(req.body.roles){
            var rolesCreated = [];
            async.each(req.body.roles, (role, callback) => {

                create(role, (err, data)=>{
                    if(err)
                        callback(err);
                    else{
                        rolesCreated.push(data);
                        callback(null, data);
                    }

                })

            }, (err) => {
                if(err)
                    cb('unable to create role number');
                else
                    cb(err, rolesCreated)
            })
        }else
            cb('bad params')
    },
    updateMany: (req, cb) => {

        if(req.body.roles){
            var rolesUpdated = [];
            async.each(req.body.roles, (role, callback) => {

                update(role, (err, data)=>{
                    if(err)
                        callback(err);
                    else{
                        rolesUpdated.push(data);
                        callback(null, data);
                    }

                })

            }, (err) => {
                if(err)
                    cb('unable to update role number');
                else
                    cb(err, rolesUpdated)
            })
        }else
            cb('bad params')
    },
    deleteMany: (req, cb) => {

        if(req.body.roles){
            async.each(req.body.roles, (role, callback) => {

                remove(role, (err, data)=>{
                    if(err)
                        callback(err);
                    else
                        callback(null, data);

                })

            }, (err) => {
                if(err)
                    cb('unable to delete role number');
                else
                    cb(err, 'Role numbers Deleted')
            })
        }else
            cb('bad params')
    }
};