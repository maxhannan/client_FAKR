import { createContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
export const myContext = createContext({});

const Context = ({ children }) => {
  const { data: { getCurrentUser: user } = {} } = useQuery(GET_CURRENT_USER);

  return <myContext.Provider value={user}>{children}</myContext.Provider>;
};

export default Context;

const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      displayName
      photos
      username
      followers {
        displayName
        photos
        username
      }
      following {
        displayName
        photos
        username
      }
    }
  }
`;
