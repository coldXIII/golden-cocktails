import { gql } from '@apollo/client';

export const MainCocktailsQuery = gql`
  query CocktailsQuery {
    cocktails {
      id
      title
      recipe
      rating
      imageUrl
    }
  }
`;

export const CocktailQuery = gql`
  query CocktailQuery($cocktailId: String!) {
    cocktail(cocktailId: $cocktailId) {
      id
      title
      content
      recipe
      history
      imageUrl
      rating
      author {
        email
      }
    }
  }
`;
