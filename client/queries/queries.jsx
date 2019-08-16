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

const getTop3Query = gql`
  query {
    top3 {
      id
      finalSentiment
      articleTitle
      url
    }
  }
`;
const getWorst3Query = gql`
  {
    worst3 {
      id
      finalSentiment
      url
      articleTitle
    }
  }
`;
export { getArticlesQuery, getTagsQuery, getTop3Query, getWorst3Query };
