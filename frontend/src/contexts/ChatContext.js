import React, { useState, useEffect, createContext } from 'react';
import api from "../api";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
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

  const { children } = props;
  return (
    <ChatContext.Provider value={{
      activeChat, setActiveChat, chats, setChats, chatsLoaded
    }}
    >
      { children }
    </ChatContext.Provider>
  );
};
export default ChatContextProvider;
