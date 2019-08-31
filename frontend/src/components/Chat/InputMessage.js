import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { ChatContext } from '../../contexts/ChatContext';

export default function InputMessage() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { socket, user, userInfo } = useContext(UserContext);
  const { chat, chats, setChats } = useContext(ChatContext);

  const getTime = date => `${date.getHours()}:${(`0${date.getMinutes()}`).slice(-2)}`;

  const sendMessage = (send) => {
    // socket.emit('MESSAGE_SENT', { chatId: chat.id, send });
  };


  const createMessageForServer = (message = '', sender = '') => ({
    chatId: chat.id,
    // id: uuidv4(),
    time: getTime(new Date(Date.now())),
    message,
    sender,
    status: false,
  });


  const addMessageToChat = (chatId, mes) => {
    // eslint-disable-next-line no-shadow
    const newChats = chats.map((chat) => {
      if (chat.id === chatId && !chat.messages.some(msg => msg.id === mes.id)) {
        chat.messages.push(mes);
      }
      return chat;
    });

    setChats(newChats);
  };

  const handleSubmit = () => {
    if (message !== '') {
      // sendMessage(send);
      // addMessageToChat(chat.id, send);
    }
    setMessage('');
  };
  return (
    <form onSubmit={(e) => {
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
