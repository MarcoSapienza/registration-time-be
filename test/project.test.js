const mongoose = require('mongoose');
const customerSchema = require('../dao/models/customer')
const projectSchema = require('../dao/models/project');
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


describe('Project Model Test', () => {

    
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, {useNewUrlParser: true, useCreateIndex: true}, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save Customer & Project successfully', async () => {
        const validCustomerModel = new mongoose.model('Customer', customerSchema);
        const validCustomerInstance = new validCustomerModel(customerData);
        const savedCustomer = await validCustomerInstance.save();

        await validCustomerModel.find({name: 'Customer1'}, async function (err, docs) {

            if (err) {
                console.log("Error");
            } else {
                const validProjectModel = new mongoose.model('Project', projectSchema);
                const projectData = {
                    name: 'Progetto 1',
                    amountperhour: 50,
                    completed: false,
                    customer: docs._id
                };
                const validProjectInstance = new validProjectModel(projectData);
                const savedProject = await validProjectInstance.save();


                expect(savedProject._id).toBeDefined();
                expect(savedProject.name).toBe(projectData.name);
                expect(savedProject.amountperhour).toBe(projectData.amountperhour);
                expect(savedProject.completed).toBe(projectData.completed);
                expect(savedProject.customer).toBe(projectData.customer);
            }
        });

    });

    async function dropAllCollections() {
        const collections = Object.keys(mongoose.connection.collections)
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName]
            try {
                await collection.drop()
            } catch (error) {

                if (error.message === 'ns not found') return


                if (error.message.includes('a background operation is currently running')) return

                console.log(error.message)
            }
        }
    }


    afterAll(async () => {
        await dropAllCollections()
    })
});
