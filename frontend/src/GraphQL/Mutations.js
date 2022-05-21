import {gql} from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation register(
    $username: String!,
    $password: String!,
  ) {
    register(
      username: $username,
      password: $password,
    ) {
    username
    }
  }
`;
export const LOGIN_USER_MUTATION = gql`
  mutation login(
    $username: String!,
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
     $city: String!
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

export const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct(
    $sellerId: ID!
    $title: String!
    $description: String!
    $img: String!
    $categories: [String]!
    $quantity: Int!
    $price:  Int!
  ) {
    createProduct(
    sellerId: $sellerId
    title:  $title
    description: $description
    img: $img
    categories: $categories
    quantity:$quantity
    price:$price
    ) {
     sellerId
    title
    description
    img
    categories
    quantity
    price
    }
  }
`;