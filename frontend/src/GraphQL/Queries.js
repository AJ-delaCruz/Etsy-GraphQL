import {gql} from "@apollo/client";



export const GET_PROFILE = gql`
  query 
  getProfile($userId: ID!)  {
    getProfile(userId: $userId) {
     
      username
     
    }
  }
`;


export const GET_SHOP = gql`
  query 
  getShop($userId: ID!)  {
    getShop(userId: $userId) {
      username
      name
      shopName
      shopImg
    }
  }
`;
export const GET_SELLER_PRODUCTS = gql`
  query getSellerProduct($sellerId: ID!) {
    getSellerProduct(sellerId: $sellerId) {
      id, sellerId, title, img, description, categories, price, quantity

      
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
        categories: $categories
        filters: $filters
        sortBy: $sortBy
        filterBySearch: $filterBySearch
    ) {
     
        sellerId, title, img, description, categories, price, quantity
      
    }
  }

`;

export const  GET_ALL_PRODUCTS = gql`
    query  {
    getAllProducts {
       id, sellerId, title, img, description, categories, price, quantity

    }
}

`;

export const GET_PRODUCT_OVERVIEW = gql`
  query getSingleProduct($id: ID!) {
    getSingleProduct(id: $id) {
        sellerId, title, img, description, categories, price, quantity
      
    }
  }

`;
