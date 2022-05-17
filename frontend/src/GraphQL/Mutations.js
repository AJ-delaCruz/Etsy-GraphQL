import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $email: String!
    $password: String
  ) {
    createUser(
      email: $email
      password: $password
    ) {
      id
    }
  }
`;
