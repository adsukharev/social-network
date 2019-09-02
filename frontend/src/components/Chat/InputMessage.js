import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { ChatContext } from '../../contexts/ChatContext';
import api from "../../api";

export default function InputMessage(props) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { user, userInfo, isLoaded } = useContext(UserContext);
  const { chat, chats, setChats, socket, activeChat } = useContext(ChatContext);
  const [toSend, setToSend] = useState(null);
  const {messagesChanged, setMessagesChanged} = props;

  useEffect(() => {
    getMessages();
  }, []);

  const sendMessage = () => {
    let send = {
      text: message,
        chat_id: activeChat.chat_id,
      author: userInfo.login,
      partner_id: toSend,
      creation_date: new Date(Date.now()).toLocaleTimeString(),
    };
    socket.emit('message', send);
    getMessages();
    setMessagesChanged(!messagesChanged);
  };

  const getMessages = async () => {
    await api().get(`chats/${activeChat.chat_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((data) => {
      setToSend(data.data.partner_id);
    })
      .catch(e => console.log(e));
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
