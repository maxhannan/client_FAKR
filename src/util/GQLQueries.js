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

export const SUBMIT_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        createdAt
        username
        body
        userPhoto
      }
      commentCount
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        createdAt
        userPhoto
        username
      }
      likeCount
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $postType: String!
    $title: String!
    $body: String!
    $liveLink: String!
    $repoLink: String!
    $photoURL: String!
  ) {
    createPost(
      postType: $postType
      title: $title
      body: $body
      liveLink: $liveLink
      repoLink: $repoLink
      photoURL: $photoURL
    ) {
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

export const GET_POSTS_BY_USER = gql`
  query getPostsByUser($username: String!) {
    getPostsByUser(username: $username) {
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
        username
        userPhoto
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

export const GET_POST_BY_ID = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
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
        username
        userPhoto
      }
      likeCount
      comments {
        id
        createdAt
        username
        body
        userPhoto
      }
      commentCount
    }
  }
`;
