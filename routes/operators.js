var express = require('express');
var router = express.Router();
var operatorController = require('../dao/controllers/operators.controller');
const isAuth = require('../auth/authentication');
const mailHandler = require('../utils/mailHandler');


/* GET operators listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});


router.post('/signup', function (req, res, next) {

  operatorController.create(req, (err, data) => {
      if(err)
        res.status(404).json(err);
      else
        res.status(202).json(data);
  })

});

router.post('/login', function (req, res, next) {

  operatorController.login(req, (err, data) => {
      if(err)
        res.status(404).json(err);
      else
        res.status(200).json(data);
  })

});

router.post('/newPassword', isAuth, function (req, res, next) {

    operatorController.changePassword(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })

});

router.post('/resetPassword', function (req, res, next) {

    operatorController.resetPassword(req, (err, data) => {
        if(err)
            res.status(404).json(err);
        else
            res.status(200).json(data);
    })

});

router.get('/operator', isAuth, (req, res, next) => {

    if(res.locals && res.locals.username){

        operatorController.getOperator(res.locals.username, (err, data)=>{
            if(err)
                res.status(401).json("Unauthorized");
            else
                res.status(200).json(data);
        });

    }else
        res.status(401).json("Unauthorized");


});

router.get('/activation', (req, res, next) => {

    operatorController.activateOperator(req, (err,data) =>{
        if(err)
            res.status(401).json("Activation failed");
        else
            res.status(200).json(data);
    })


});

router.get('/list', isAuth, (req, res, next) => {

    operatorController.listOperators(req, (err,data) =>{
        if(err)
            res.status(401).json("Activation failed");
        else
            res.status(200).json(data);
    })

});

router.get('/check', isAuth, (req, res, next) => {

    if(res.locals && res.locals.username)
        res.status(200).json("Authorized");
    else
        res.status(401).json("Unauthorized");

});



module.exports = router;
