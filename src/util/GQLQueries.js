import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username
      userPhoto
      likes {
        id
        createdAt
        username
      }
      comments {
        id
        createdAt
        username
        body
      }
      commentCount
    }
  }
`;
