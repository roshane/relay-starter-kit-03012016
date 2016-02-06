import Lodash from 'lodash';
import Faker from 'faker';

import {
    connection,
    customer,
    feedback
} from './database';

connection.sync({force: true}).then(()=> {
    Lodash.times(10, ()=> {
        customer.create({
            firstName: Faker.name.firstName(),
            lastName: Faker.name.lastName(),
            age: Faker.random.number() % 80,
            phoneNumber: Faker.phone.phoneNumber()
        }).then((_customer)=> {
            feedback.create({
                comment: Faker.lorem.sentence(),
                rating: Faker.random.number() % 5
            }).then((feedback)=> {
                _customer.setFeedbacks([feedback]);
            })
        })
    })
});
