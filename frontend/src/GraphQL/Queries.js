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
