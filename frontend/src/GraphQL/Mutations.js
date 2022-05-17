import { gql } from "@apollo/client";

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
    password
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
    }
  }
`;