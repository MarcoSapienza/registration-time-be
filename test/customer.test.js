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


})
