const {gql} = require('apollo-server');

module.exports = gql`
  
  type User {
    id: ID!
    username: String!
    password: String!
    name:String!
    img:String!
    street: String!
    state:String!
    city: String!
    country: String!
    zipCode: Int!
    email: String!
    phoneNum: Int!
    birthDay: String!
    shopName:String!
    shopImg:String!

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
  
  type ProductList  {
    id: ID!
    sellerId: ID!
    title: String!
    description: String!
    img: String!
    categories: [String]!
    quantity: Int!
    price:  Int!

  
  }


  type Query {
    getAllUsers: [UserList]!
    getProfile(userId: ID!): User!
    getShop(userId: ID!): User!
    getProducts(title: String!): ProductList!
    getAllProducts: [ProductList]!
   
    
  }

  type Mutation {
    register(username: String!, password: String!): LoggedUser!
    login(username: String!, password: String!): LoggedUser!
    
    editProfile(
    userId: ID!
    city: String!
    ): User!
    
    createShop(
    userId: ID!
    shopName:String!
    ): User!
    
    editShop(
    userId: ID!
    shopName:String!
    shopImg:String!
    ): User!
    
 
    createProduct(
    sellerId: ID!
    title: String!
    description: String!
    img: String!
    categories: [String]!
    quantity: Int!
    price:  Int!
    ): ProductList!
    
    editProduct(
    id: ID!
    title: String!
    description: String!
    img: String!
    categories: [String]!
    quantity: Int!
    price:  Int!
    ): ProductList!
    
    
  }
  
  
`;
