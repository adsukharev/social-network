import React, { useEffect, useState, useContext } from 'react';
import Message from './Message';
import { UserContext } from '../../contexts/UserContext';
import {ChatContext} from "../../contexts/ChatContext";
import api from "../../api";

export default function Messages(props) {
const { activeChat, setActiveChat, chats, setChats, chatsLoaded} = useContext(ChatContext);
  const [msgs, setMessages] = useState([]);
  const [chatIsLoaded, setChatIsLoaded] = useState(false);
  const { userInfo } = useContext(UserContext);
  const {socket} = useContext(ChatContext);
const {messagesChanged, setMessagesChanged} = props;

  useEffect(() => {
    socket.on('notification', () => {
      setMessagesChanged(!messagesChanged);
      getMessages();
    });
  }, []);

  useEffect(() => {
    getMessages();
  }, [activeChat, messagesChanged]);

  const getMessages = async () => {
    await api().get(`chats/${activeChat.chat_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).then((data) => {
      setMessages(data.data.messages);
      setChatIsLoaded(true);
    })
      .catch(e => console.log(e));
  };
  return (
    chatIsLoaded && <div className="ChatWindow-Messages-Container">
      { msgs.length > 0
        ? msgs.map(mes => (
          <div
            key={mes.creation_date}
            className={`ChatWindow-MessageContainer-Message ${mes.author === userInfo.login ? 'right' : 'left'}`}
          >
            <Message mes={mes} user={userInfo} />
          </div>
        ))
        : null
      }
    </div>
  );
}
