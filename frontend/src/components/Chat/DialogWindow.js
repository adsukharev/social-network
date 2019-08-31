import React, { useContext } from 'react';
import InputMessage from './InputMessage';
import Messages from './Messages';
import { ChatContext } from '../../contexts/ChatContext';
import { UserContext } from '../../contexts/UserContext';

function DialogWindow() {
  const {  activeChat, setActiveChat, chats, setChats, chatsLoaded } = useContext(ChatContext);
  const { userInfo } = useContext(UserContext);
  return (
    activeChat !== null ? (
      <div className="ChatWindow-Chat-Container">
        <div className="ChatWindow-Chat-Header">
          {activeChat.chat_name}
        </div>
        <Messages
          style={{ zIndex: 0 }}
          user={userInfo}
        />
        <div className="ChatWindow-ChatInput-Container">
          <InputMessage />
        </div>
      </div>
    )
      : (
        <div className="ChatWindow-Chat-Container">
          <h2>Выберите чятик</h2>
        </div>
      )
  );
}
export default DialogWindow;
