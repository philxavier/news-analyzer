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

const getTagsQuery = gql`
  {
    tags {
      name
      urls
    }
  }
`;

export { getArticlesQuery, getTagsQuery };
