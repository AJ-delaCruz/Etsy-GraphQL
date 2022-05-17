const {gql} = require('apollo-server');

module.exports = gql`
  
  type User {
    id: ID!
    username: String!
    password: String!

  }
  
    type LoggedUser {
    id: ID!
    username: String!
    password: String!
   
  }

  type UserList {
    id: ID!
    username: String!
  
  }


  type Mutation {
    register(username: String!, password: String!): LoggedUser!
    login(username: String!, password: String!): LoggedUser!
  }
`;
