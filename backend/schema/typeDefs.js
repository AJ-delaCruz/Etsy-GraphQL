const {gql} = require('apollo-server');

module.exports = gql`
  
  type User {
    id: ID!
    username: String!
    password: String!
    city: String!

  }
  
    type LoggedUser {
    id: ID!
    username: String!
    password: String!
    token: String!
   
  }

  type UserList {
    id: ID!
    username: String!
  
  }


  type Query {
    getAllUsers: [UserList]!
    getProfile(userId: ID!): User!
  }

  type Mutation {
    register(username: String!, password: String!): LoggedUser!
    login(username: String!, password: String!): LoggedUser!
    
      editProfile(
      userId: ID!
      city: String!
    ): User!
    
    
  }
  
  
`;
