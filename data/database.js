import Sequelize from 'sequelize';
import Faker from "faker";
import Lodash from "lodash";

const connection = new Sequelize('dev', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

const Customer = connection.define('Customer', {
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
        type: Sequelize.STRING
    }
});


//connection.sync({force: true}).then(function () {
//    Lodash.times(10, ()=> {
//        Customer.create({
//            firstName: Faker.name.firstName(),
//            lastName: Faker.name.lastName(),
//            phoneNumber: Faker.phone.phoneNumber(),
//            age: Faker.random.number() % 100
//        });
//    });
//});

module.exports = {
    connection: connection,
    customer: Customer
};
