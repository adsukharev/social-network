import React, { useState, useEffect, createContext, useContext } from 'react';
import api from "../api";
import io from 'socket.io-client';
import {UserContext} from "./UserContext";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const {socket, setSocket} = props;
  const { userInfo, isLoaded} = useContext(UserContext);
  useEffect(() => {
    api().get('chats', {  headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },}).then(data => {
        setChats(data.data);
        setChatsLoaded(true);
      }).catch(e => console.log(e));
  }, []);
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [chatsLoaded, setChatsLoaded] = useState(false);
  useEffect(() => {
    if(isLoaded && socket) {
      if (socket) {
        setSocket(socket);
        socket.emit('connect_logged_user', userInfo.user_id);
      }
    }
  }, [isLoaded, socket]);
  const { children } = props;
  return (
    <ChatContext.Provider value={{
      activeChat, setActiveChat, chats, setChats, chatsLoaded, socket
    }}
    >
      { children }
    </ChatContext.Provider>
  );
};
export default ChatContextProvider;
