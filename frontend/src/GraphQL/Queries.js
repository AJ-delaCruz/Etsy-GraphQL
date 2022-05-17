import {gql} from "@apollo/client";

export const LOAD_USERS = gql`
  query {
    getAllUsers {
      id
      email
      password
    }
  }
`;


export const GET_PROFILE = gql`
  query 
  getProfile($userId: ID!)  {
    getProfile(userId: $userId) {
     
      username
     
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts(
    $categories: String!
    $filters: String!
    $sortBy: String!
    $filterBySearch: String!
   
  ) {
    getProducts(
       $categories: categories
    $filters: $filters
    $sortBy: $sortBy
     $filterBySearch: filterBySearch
    ) {
     
        title
        body
        tags
        points
        views
        createdAt
        updatedAt
        answerCount
      
    }
  }

`;
