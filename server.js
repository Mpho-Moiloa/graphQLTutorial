var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Constructing a schema
var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

//rootValue provides a resolver function for each api endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
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