var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Constructing a schema
var schema = buildSchema(`
    type Query {
        rollDice(numDice: Int!, numSides: Int): [Int]
    }
`);

//rootValue provides a resolver function for each api endpoint
var root = {
    rollDice: ({numDice, numSides}) => {
        var output = [];
        for (var i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)))
        }
        return output;
    }
};

// Run the GraphQL query '{ hello }' and print out the response for console.log()
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