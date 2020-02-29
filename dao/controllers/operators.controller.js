const mongoose = require('mongoose');
const config = require('../../config/config');
const operatorModel = mongoose.model('Operator');
// const activationModel = mongoose.model('Activation');
const jwt = require("jsonwebtoken");
const validator = require("../../utils/validator");
const mailHandler = require("../../utils/mailHandler");
const passGenerator = require("../../utils/passwordGenerator");

module.exports = {
    create: (req, cb) => {

        if(req.body.password && validator.passwordValidator(req.body.password)){

            var new_operator = {
                name: req.body.name,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            };

            if(req.body.title)
                new_operator["title"] = req.body.title;
            if(req.body.role)
                new_operator["role"] = req.body.role; // else choose default value

            operatorModel.create(new_operator,
                (err, result) => {
                    if (err)
                        cb('Fail Operator creation');
                    else{
                        let token = jwt.sign({username: req.body.username, role: result.role},
                            config.auth.activation_secret
                        );

                        let message = mailHandler.activationMailFormatter({operator: result, token: token});

                        mailHandler.sendMail(config.mail.administrator, "Richiesta Di Attivazione", message, (err, msg)=>{

                            if(err)
                                cb(err);
                            else
                                cb(null,'Operator Created, wait for activation');


                        })


                    }

                });
        }else
            cb('Wrong password format')

    },
    login: (req, cb) => {

        if(req.body.username){

            operatorModel.findOne({username: req.body.username}, (err, operator)=>{

                if(err)
                    cb('Missing Operator');
                else{
                    if(operator){

                        if(operator.active){

                            operator.comparePassword(req.body.password, operator.password, (err, isMatch) => {

                                if(isMatch){
                                    let token = jwt.sign({username: req.body.username, role: operator.role},
                                        config.auth.secret,
                                        {
                                            expiresIn: '12h'
                                        }
                                    );

                                    cb(null,{token: token});

                                }else
                                    cb({code: 0,text:'Wrong Credentials'});
                            });

                        }else
                            cb({code: 1, text: 'Operator inactive: Need admin activation'});



                    }else
                        cb({code:0, text: 'Missing Operator'});

                }

            });

        }else
            cb({code: 0,text:'Wrong Credentials'})


    },
    getOperator: (username, cb) => {

        operatorModel.findOne({username: username}, (err, operator)=>{

            if(err)
                cb('Missing operator');
            else{
                if(operator)
                    cb(null, operator);
                else
                    cb('Missing operator');
            }

        });
    },
    changePassword: (req, cb) => {

        if(req.body.username){

            operatorModel.findOne({username: req.body.username}, function (err, operator) {
                if (err) {
                    return cb(err);
                } else {

                    if(operator){

                        operator.comparePassword(req.body.oldPassword, operator.password, (err, isMatch) => {

                            if(isMatch){

                                operator.password = req.body.newPassword;
                                operator.save(function (err, operator) {
                                    if (err) {
                                        cb(err);
                                    } else {
                                        cb(null, "password updated successfully!");
                                    }
                                });

                            }else
                                cb('Wrong Credentials')
                        });

                    }else
                        cb('Wrong Credentials')

                }
            });

        }else
            cb('Wrong Credentials')
    },
    activateOperator: (req, cb) => {

        try {

            jwt.verify(req.query.token, config.auth.activation_secret, (err, decoded) => {
                if (err) {
                    cb(err);
                } else {
                    req.decoded = decoded;
                    let username = req.decoded.username;

                    operatorModel.findOneAndUpdate({username: username}, {$set:{active:true}}, {new: true}, (err, result) => {

                        if(err)
                            cb(err);
                        else{
                            if(result){

                                let message = mailHandler.confirmActivationMailFormatter();

                                mailHandler.sendMail(result.email, "Conferma Attivazione", message, (err, msg)=>{

                                    if(err)
                                        cb(err);
                                    else
                                        cb(null, "Operator enabled")

                                })

                            }else
                                cb('Missing Operator')

                        }
                    });
                }
            })

        } catch (e) {
            return res.status(401).json('Invalid token');
        }
    },
    resetPassword: (req, cb) =>{

        if(req.body.username){

            operatorModel.findOne({username: req.body.username}, function (err, operator) {
                if (err) {
                    return cb(err);
                } else {

                    if(operator){

                        let newPassword = passGenerator.generatePassword();

                        operator.password = newPassword;
                        operator.save(function (err, operator) {
                            if (err) {
                                cb(err);
                            } else {


                                let message = mailHandler.resetPasswordMailFormatter(newPassword);

                                mailHandler.sendMail(operator.email, "Richiesta Reset Password", message, (err, msg)=>{

                                    if(err)
                                        cb(err);
                                    else{
                                        cb(null,'password generated!');

                                    }
                                });

                            }
                        });

                    }else
                        cb('Wrong Username')

                }
            });

        }else
            cb('Wrong Username')

    },
    listOperators: (req, cb) => {

        let query = ('notified' in req.query) ? {notified: req.query.notified}: {};

        operatorModel.find(query, (err, results) => {

            if(err)
                cb(err);
            else
                cb(null, results);

        });

    }

};