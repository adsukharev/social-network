import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { ChatContext } from '../../contexts/ChatContext';

export default function InputMessage(props) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { user, userInfo, isLoaded } = useContext(UserContext);
  const { chat, chats, setChats, socket, activeChat } = useContext(ChatContext);

  const sendMessage = () => {
    let send = {
      text: message,
        chat_id: activeChat.chat_id,
      author: userInfo.login,
      creation_date: new Date(Date.now()).toLocaleTimeString(),
    };
    socket.emit('message', send);
  };


  const handleSubmit = () => {
    if (message !== '') {
      sendMessage();
      // addMessageToChat(chat.id, send);
    }
    setMessage('');
  };
  return (
    isLoaded && <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(e);
    }}
    >
      <input
        className="ChatWindow-Chat-Input"
        placeholder="Введите сообщение..."
        value={message}
        autoComplete="off"
        onChange={
          ({ target }) => {
            setMessage(target.value);
          }
        }
      />
      <button className="ChatWindow-ChatInput-Submit" type="submit">Отправить</button>
    </form>
  );
}
