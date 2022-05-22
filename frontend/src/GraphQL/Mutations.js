import {gql} from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation register(
    $name: String!
    $username: String!
    $password: String!
  ) {
    register(
      name: $name
      username: $username
      password: $password
    ) {
    username
    name
    }
  }
`;
export const LOGIN_USER_MUTATION = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ) {
    username
    token
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation editProfile(
    $userId: ID!
     $city: String
  ) {
    editProfile(userId: $userId, city: $city ) {
      city
      img
    }
  }
`;
const UPLOAD_FILE = gql`
  mutation uploadFile($file: FileUpload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;


export const CREATE_SHOP_MUTATION = gql`
  mutation createShop(
     $userId: ID!
    $shopName: String!,
  ) {
    createShop( userId: $userId, shopName: $shopName) {
      shopName
    }
  }
`;
export const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct(
    $sellerId: ID!
    $shopName: String!
    $title: String!
    $description: String!
    $img: String!
    $categories: [String]!
    $quantity: Int!
    $price:  Int!
  ) {
    createProduct(
    sellerId: $sellerId
    shopName: $shopName
    title:  $title
    description: $description
    img: $img
    categories: $categories
    quantity:$quantity
    price:$price
    ) {
     sellerId
     shopName
    title
    description
    img
    categories
    quantity
    price
    }
  }
`;

export const REMOVE_PRODUCT_MUTATION = gql`
  mutation removeProduct($id: ID!) {
    removeProduct(id: $id)
  }
`;
export const CREATE_ORDER_MUTATION = gql`
  mutation makeOrder(
    $productId: ID!
    $userId: ID!
    $title: String!
    $img: String!
    $quantity: Int!
    $price:  Int!
  ) {
    makeOrder(
    productId: $productId
    userId: $userId
    title:  $title
    img: $img
    quantity:$quantity
    price:$price
    ) {
    productId
    userId
    title
    img
    quantity
    price
    }
  }
`;

export const CREATE_FAVORITE_MUTATION = gql`
  mutation addFavoriteProduct(
    $userId: ID!
    $productId: ID!
  ) {
    addFavoriteProduct( userId: $userId, productId: $productId) {
      userId
      productId
    }
  }
`;

export const REMOVE_FAVORITE_MUTATION = gql`
  mutation removeFavoriteProduct($id: ID!) {
    removeFavoriteProduct(id: $id)
  }
`;