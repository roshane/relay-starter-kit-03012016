import graphql,{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} from 'graphql';

import {
    customer,
    connection,
    feedback
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
            },
            feedback:{
                type:new GraphQLList(FeedbackType),
                resolve:(customer)=>customer.Feedbacks
            }
        }
    }
});

const FeedbackType = new GraphQLObjectType({
    name: "Feedback",
    description: "Feedback entity",
    fields: ()=> {
        return {
            id: {
                type: GraphQLString,
                resolve: (feedback)=>feedback.id
            },
            comment: {
                type: GraphQLString,
                resolve: (feedback)=>feedback.comment
            },
            rating: {
                type: GraphQLString,
                resolve: (feedback)=>feedback.rating
            }
        }
    }
});


const RootQuery = new GraphQLObjectType({
    name: "query",
    description: "root query",
    fields: ()=> {
        return {
            feedbacks: {
                type: new GraphQLList(FeedbackType),
                resolve: ()=>feedback.findAll()
            },
            customers: {
                args: {
                    id: {
                        type: GraphQLInt
                    },
                },
                type: new GraphQLList(CustomerType),
                resolve: (root, args)=> {
                    let {id}=args;
                    let query = (id) ? {id: id}:{};
                    var result = customer
                        .findAll({where: query,include:[{
                            model:feedback
                        }]});
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
});

module.exports = {
    Schema: schema
};