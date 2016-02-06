import Sequelize from 'sequelize';

var connection = new Sequelize('relay', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const Customer = connection.define('customer', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
    },
    age: {
        type: Sequelize.INTEGER
    },
    phoneNumber: {
        type: Sequelize.STRING,
        field: 'phone_number'
    }
});

const Feedback = connection.define('feedback', {
    comment: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.INTEGER
    }
});

Customer.hasMany(Feedback);
Feedback.belongsTo(Customer);

module.exports = {
    customer: Customer,
    feedback: Feedback,
    connection: connection
};