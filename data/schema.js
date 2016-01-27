import graphql from 'graphql';

import {
    customer,
    connection
} from './database';

const CustomerType = new graphql.GraphQLObjectType({
    name: "Customer",
    description: "Customer",
    fields: ()=> {
        return {
            firstName: {
                type: graphql.GraphQLString,
                resolve: (customer)=>customer.firstName
            },
            lastName: {
                type: graphql.GraphQLString,
                resolve: (customer)=>customer.lastName
            },
            age: {
                type: graphql.GraphQLInt,
                resolve: (customer)=>customer.age
            },
            phoneNumber: {
                type: graphql.GraphQLString,
                resolve: (customer)=>customer.phoneNumber
            }
        }
    }
});


const Query = new graphql.GraphQLObjectType({
    name: "RootQuery",
    description: "RootQuery",
    fileds: ()=> {
        return {
            customers: {
                type: CustomerType,
                resolve: ()=> customer.findAll()
            }
        }
    }
});

const Schema = new graphql.GraphQLSchema({
    query: Query
});

module.exports = {
    Schema: Schema
};