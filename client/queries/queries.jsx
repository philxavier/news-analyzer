import { gql } from "apollo-boost";

const getArticlesQuery = gql`
  {
    articles {
      summary
      finalSentiment
      articleTitle
      date
      url
    }
  }
`;

const getTags = gql`
  {
    tags {
      name
      urls
    }
  }
`;

export { getArticlesQuery, getTags };
