import { createContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from './util/GQLQueries';
export const myContext = createContext({});

const Context = ({ children }) => {
  const { data: { getCurrentUser: user } = {} } = useQuery(GET_CURRENT_USER);

  return <myContext.Provider value={user}>{children}</myContext.Provider>;
};

export default Context;
