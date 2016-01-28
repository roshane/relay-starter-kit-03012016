import graphql,{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} from 'graphql';

import {
    customer,
    connection
} from './database';

const CustomerType = new GraphQLObjectType({
    name: "Customer",
    description: "Customer entity",
    fields: ()=> {
        return {
            id: {
                type: GraphQLString,
                resolve: (customer)=>customer.id
            },
            name: {
                type: GraphQLString,
                resolve: (customer)=>`${customer.firstName} ${customer.lastName}`
            },
            age: {
                type: GraphQLInt,
                resolve: (customer)=>customer.age
            },
            phoneNumber: {
                type: GraphQLString,
                resolve: (customer)=>customer.phoneNumber
            }
        }
    }
});


const RootQuery = new GraphQLObjectType({
    name: "query",
    description: "root query",
    fields: ()=> {
        return {
            customers: {
                args: {
                    id: {
                        type: GraphQLInt
                    },
                },
                type: new GraphQLList(CustomerType),
                resolve: (root, args)=> {
                    let {id}=args
                    var result = customer.findAll({where: {id: id}});
                    //result.then((result)=> {
                    //    console.log(JSON.stringify(result))
                    //});
                    return result;
                }
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});

module.exports = {
    Schema: schema
};