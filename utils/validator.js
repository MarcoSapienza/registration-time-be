var passwordValidator = require('password-validator');

var schema = new passwordValidator();

schema
    .is().min(6)                                    // Minimum length 6
    .is().max(30)                                   // Maximum length 30
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().symbols()                                // Must have symbols
    .has().not().spaces();                          // Should not have spaces

module.exports = {
    passwordValidator: (password) => {

        var validation = false;

        try{

            validation = (schema.validate(password)) ? true : false;

        }catch (e) {
            console.log(e)
        }

        return validation;
    }
};