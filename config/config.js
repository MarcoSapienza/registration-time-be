module.exports = {
    app: {
        host: "localhost",
        port: 3000
    },
    db: {
        host: 'localhost',
        port: 27017,
        dbname: 'vpa-db'
    },
    permissions: {
        roles: {
            personInCharge: ['GET', 'POST', 'DELETE'],
            othersPersonInCharge: ['GET', 'POST', 'DELETE'],
            guest: ['GET']
        },
        excluded_urls: ['/api/operators/newPassword']
    }
};
