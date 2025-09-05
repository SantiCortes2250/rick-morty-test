import { gql } from "@apollo/client";

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      location {
        name
      }
    }
  }
`;
