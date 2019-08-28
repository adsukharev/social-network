import React, { useState, createContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
// import io from 'socket.io-client';
import api from '../api';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const { children } = props;
  // const [socket, setSocket] = useState(io(`${urlPrefix}:4040`));
  const [token, setToken] = useState(jwtDecode(localStorage.getItem('token')));
  const [userInfo, setUserInfo] = useState(null);
  const [changed, setChanged] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    api().get(`users/${token.identity}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => {
        setUserInfo(res.data);
        setIsLoaded(true);
      });
  }, [changed]);
  return (
    <UserContext.Provider value={{
      token, setToken, setUserInfo, userInfo, changed, setChanged, isLoaded,
    }}
    >
      { children }
    </UserContext.Provider>
  );
};
export default UserContextProvider;
