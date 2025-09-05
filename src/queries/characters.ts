import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters {
    characters(page: 1) {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;
