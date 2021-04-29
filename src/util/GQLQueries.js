import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      postType
      title
      body
      liveLink
      repoLink
      photoURL
      createdAt
      username
      userPhoto
      likes {
        id
        createdAt
        userPhoto
        username
      }
      likeCount
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
