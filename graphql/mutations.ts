import { gql } from '@apollo/client';

export const CreateCocktailMutation = gql`
  mutation CreateCocktail(
    $title: String!
    $content: String
    $recipe: String
    $history: String
    $imageUrl: String
    $rating: Int
    $authorEmail: String!
  ) {
    createCocktail(
      title: $title
      content: $content
      recipe: $recipe
      history: $history
      imageUrl: $imageUrl
      rating: $rating
      authorEmail: $authorEmail
    ) {
      id
    }
  }
`;

export const EditCocktailMutation = gql`
  mutation (
    $cocktailId: ID!
    $title: String!
    $content: String!
    $recipe: String!
    $history: String!
    $imageUrl: String!
    $rating: Int!
  ) {
    editCocktail(
      cocktailId: $cocktailId
      title: $title
      content: $content
      recipe: $recipe
      history: $history
      imageUrl: $imageUrl
      rating: $rating
    ) {
      title
      content
      recipe
      history
      imageUrl
      rating
    }
  }
`;

export const DeleteMutation = gql`
  mutation DeleteMutation($cocktailId: String!) {
    deleteCocktail(cocktailId: $cocktailId) {
      id
    }
  }
`;