import graphql,{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import {
    customer,
    feedback,
    connection
} from './database';

class Asset {
    constructor(props) {
        this.props = props;
    }
}

const CustomerType = new GraphQLObjectType({
    name: "Customer",
    description: "Customer",
    fields: ()=> {
        return {
            id: {
                type: GraphQLString,
                resolve: (customer)=>customer.id
            },
            firstName: {
                type: GraphQLString,
                resolve: (customer)=>customer.firstName
            },
            lastName: {
                type: GraphQLString,
                resolve: (customer)=>customer.lastName
            },
            age: {
                type: GraphQLString,
                resolve: (customer)=>customer.age
            },
            phoneNumber: {
                type: GraphQLString,
                resolve: (customer)=>  customer.phoneNumber
            },
            feedbacks: {
                type: new GraphQLList(FeedbackType),
                resolve: (customer)=>customer.feedbacks
            }
        }
    }
});

const FeedbackType = new GraphQLObjectType({
    name: "Feedback",
    description: "Feedback",
    fields: ()=> {
        return {
            id: {
                type: GraphQLString,
                resolve: (feedback)=>feedback.id
            },
            rating: {
                type: GraphQLString,
                resolve: (feedback)=>feedback.rating
            },
            comment: {
                type: GraphQLString,
                resolve: (feedback)=>feedback.comment
            },
            customer: {
                type: CustomerType,
                resolve: (feedback)=>feedback.customer
            }
        }
    }
});

const AssetType = new GraphQLObjectType({
    name: "Asset",
    description: "Asset",
    fields: ()=> {
        return {
            customers: {
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    offset: {
                        type: GraphQLInt
                    },
                    limit: {
                        type: GraphQLInt
                    }
                },
                type: new GraphQLList(CustomerType),
                resolve: (_, args)=> {

                    let {id,offset,limit}=args;
                    let pagination = {};
                    let query = {};

                    if (offset)  pagination.offset = offset;
                    if (limit)  pagination.limit = limit;
                    if (id)  query.id = id;

                    console.log(`query : ${JSON.stringify(query)}`);
                    console.log(`pagination : ${JSON.stringify(pagination)}`);

                    return customer.findAll({
                        where: query,
                        offset: pagination.offset,
                        limit: pagination.limit,
                        include: [{
                            model: feedback
                        }],
                        order: [
                            ['id', 'ASC']
                        ]
                    });
                }
            },
            feedbacks: {
                type: new GraphQLList(FeedbackType),
                resolve: (_, args)=> {
                    return feedback.findAll({
                        include: [{
                            model: customer
                        }],
                        order: [
                            ['id', 'ASC']
                        ]
                    });
                }
            }
        }
    }
});


const Query = new GraphQLObjectType({
    name: "RootQuery",
    description: "RootQuery",
    fields: ()=> {
        return {
            asset: {
                type: AssetType,
                resolve: ()=>new Asset()
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutation",
    fields: ()=> {
        return {
            addCustomer: {
                type: CustomerType,
                args: {
                    firstName: {
                        type: new GraphQLNonNull(GraphQLString),
                        resolve: (customer)=>customer.firstName
                    },
                    lastName: {
                        type: new GraphQLNonNull(GraphQLString),
                        resolve: (customer)=>customer.lastName
                    },
                    age: {
                        type: new GraphQLNonNull(GraphQLString),
                        resolve: (customer)=>customer.age
                    },
                    phoneNumber: {
                        type: new GraphQLNonNull(GraphQLString),
                        resolve: (customer)=>  customer.phoneNumber
                    }
                },
                resolve: (_, args)=> customer.create(args)
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

module.exports = {
    Schema: Schema
};