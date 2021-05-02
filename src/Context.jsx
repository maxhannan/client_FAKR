import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const myContext = createContext({});

const Context = ({ children }) => {
  const [userObj, setUserObj] = useState();
  console.log(userObj);
  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/getuser/', { withCredentials: true })
      .then(res => {
        if (res.data) {
          setUserObj(res.data);
        }
      });
  }, []);
  return <myContext.Provider value={userObj}>{children}</myContext.Provider>;
};

export default Context;
