var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Constructing a schema
var schema = buildSchema(`
    type Query {
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
    }
`);

//rootValue provides a resolver function for each api endpoint
var root = {
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
        return Math.random();
    },
    rollThreeDice: () => {
        return [1, 2, 3].map(_ => 1 + Math.floor(Math.random * 6));
    }
};

// Run the GraphQL query '{ hello }' and print out the response
// graphql({
//     schema,
//     source: '{ hello }',
//     rootValue
// }).then((response) => {
//     console.log(response);
// });

//mounting a GraphQL API server
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API at http://localhost:4000/graphql');