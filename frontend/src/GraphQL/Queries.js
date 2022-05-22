import {gql} from "@apollo/client";



export const GET_PROFILE = gql`
  query 
  getProfile($userId: ID!)  {
    getProfile(userId: $userId) { 
      name
      username
   
    }
  }
`;
export const  GET_ALL_USERS = gql`
    query  {
    getAllUsers {
    id
    name
    username
    password
    img
    street
    state
    city
    country
    zipCode
    email
    phoneNum
    birthDay
    shopName
    shopImg

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
      id
      sellerId
      title
      img
      description
      categories
      price
      quantity
    }
  }

`;

export const GET_SINGLE_PRODUCT = gql`
  query getSingleProduct($id: ID!) {
    getSingleProduct(id: $id) {
      id
      sellerId
      title
      img
      description
      categories
      price
      quantity
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
     
      id
      sellerId
      title
      img
      description
      categories
      price
      quantity
    }
  }

`;

export const  GET_ALL_PRODUCTS = gql`
    query  {
    getAllProducts {
      id
      sellerId
      title
      img
      description
      categories
      price
      quantity

    }
}

`;

export const GET_PRODUCT_OVERVIEW = gql`
  query getSingleProduct($id: ID!) {
    getSingleProduct(id: $id) {
      id
      sellerId
      shopName
      title
      img
      description
      categories
      price
      quantity
      sale
      
    }
  }

`;

export const GET_FAVORITE_PRODUCTS = gql`
  query getFavoriteProducts($userId: ID!) {
    getFavoriteProducts(userId: $userId) {
      id
      userId
      productId

    }
  }

`;
export const GET_ORDER_PRODUCTS = gql`
  query getOrder($userId: ID!) {
    getOrder(userId: $userId) {
        id
        userId
        productId
        title
        img
        quantity
        price
        createdAt

    }
  }

`;