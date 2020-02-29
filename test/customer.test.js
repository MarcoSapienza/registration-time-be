const mongoose = require('mongoose');
const customerSchema = require('../dao/models/customer');
const customerData = {
    name: 'Customer1',
    fiscalCode: 'SPNMRC',
    vatNumber: '123456',
    socialName: 'Customer 1 Social Name',
    address: 'Address Customer 1',
    cap: '95045',
    city: 'Misterbianco',
    email: 'customer1@mail.it',
    phone: '095477049',
    mobilePhone: '3357289761',
    note: 'Note regards customer 1',
    active: true
};

describe('Customer Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save Customer successfully', async () => {
        const validCustomerModel = new mongoose.model('Customer',customerSchema);
        const validCustomerInstance = new validCustomerModel(customerData);
        const savedCustomer = await validCustomerInstance.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedCustomer._id).toBeDefined();
        expect(savedCustomer.name).toBe(customerData.name);
        expect(savedCustomer.fiscalCode).toBe(customerData.fiscalCode);
        expect(savedCustomer.vatNumber).toBe(customerData.vatNumber);
        expect(savedCustomer.socialName).toBe(customerData.socialName);
        expect(savedCustomer.address).toBe(customerData.address);
        expect(savedCustomer.cap).toBe(customerData.cap);
        expect(savedCustomer.city).toBe(customerData.city);
        expect(savedCustomer.email).toBe(customerData.email);
        expect(savedCustomer.phone).toBe(customerData.phone);
        expect(savedCustomer.mobilePhone).toBe(customerData.mobilePhone);
        expect(savedCustomer.note).toBe(customerData.note);
        expect(savedCustomer.active).toBe(customerData.active);
    });

    // // Test Schema is working!!!
    // // You shouldn't be able to add in any field that isn't defined in the schema
    // it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
    //     const userWithInvalidField = new CustomerModel({ name: 'TekLoon', gender: 'Male', nickname: 'Handsome TekLoon' });
    //     const savedUserWithInvalidField = await userWithInvalidField.save();
    //     expect(savedUserWithInvalidField._id).toBeDefined();
    //     expect(savedUserWithInvalidField.nickkname).toBeUndefined();
    // });
    //
    // // Test Validation is working!!!
    // // It should us told us the errors in on gender field.
    // it('create user without required field should failed', async () => {
    //     const userWithoutRequiredField = new CustomerModel({ name: 'TekLoon' });
    //     let err;
    //     try {
    //         const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
    //         error = savedUserWithoutRequiredField;
    //     } catch (error) {
    //         err = error
    //     }
    //     expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    //     expect(err.errors.gender).toBeDefined();
    // });


})
