import Sequelize from 'sequelize';
import Lodash from 'lodash';
import Faker from 'faker';

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

//connection.sync({force: true}).then(()=> {
//    Lodash.times(10, ()=> {
//        Customer.create({
//            firstName: Faker.name.firstName(),
//            lastName: Faker.name.lastName(),
//            age: Faker.random.number() % 80,
//            phoneNumber: Faker.phone.phoneNumber()
//        })
//    })
//});

module.exports = {
    customer: Customer,
    connection: connection
};