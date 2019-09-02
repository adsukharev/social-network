import React, { useContext, useState } from 'react';
import InputMessage from './InputMessage';
import Messages from './Messages';
import { ChatContext } from '../../contexts/ChatContext';
import { UserContext } from '../../contexts/UserContext';

function DialogWindow(props) {
  const {  activeChat, setActiveChat, chats, setChats, chatsLoaded } = useContext(ChatContext);
  const { userInfo } = useContext(UserContext);
  const [messagesChanged, setMessagesChanged] = useState(false);
  return (
    activeChat !== null ? (
      <div className="ChatWindow-Chat-Container">
        <div className="ChatWindow-Chat-Header">
          {activeChat.chat_name}
        </div>
        <Messages
          messagesChanged={messagesChanged}
          setMessagesChanged={setMessagesChanged}
          style={{ zIndex: 0 }}
          user={userInfo}
        />
        <div className="ChatWindow-ChatInput-Container">
          <InputMessage messagesChanged={messagesChanged} setMessagesChanged={setMessagesChanged} {...props} />
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
