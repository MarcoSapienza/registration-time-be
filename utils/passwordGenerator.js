var generator = require('generate-password');

module.exports = {
    generatePassword: ()=>{
        return generator.generate({
            length: 10,
            numbers: true,
            symbols: true,
            uppercase: true
        });
    }
};