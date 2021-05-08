import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
export const myContext = createContext({});

const Context = ({ children }) => {
  const [userObj, setUserObj] = useState();
  console.log(userObj);

  const { loading, error, data: { getCurrentUser: user } = {} } = useQuery(
    GET_CURRENT_USER
  );
  console.log({ user });
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
