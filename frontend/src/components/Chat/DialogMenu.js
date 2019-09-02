import React, { useContext, useEffect } from 'react';
import {Link} from "react-router-dom";
import { ChatContext } from '../../contexts/ChatContext';
import { UserContext } from '../../contexts/UserContext';


export default function DialogMenu(props) {
  const {   activeChat, setActiveChat, chats, setChats, chatsLoaded, socket } = useContext(ChatContext);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    chats.forEach((chat) => {
      if(chat.chat_id == props.location.pathname.slice(7)) {
        setActiveChat(chat);
        socket.emit('join', chat.chat_id);
      }
    })
  }, [props.location.pathname]);
  return (
    <div className="ChatMenu-Choosing-Bar">
      {
        chats.map((chat) => {
          if (chat.chat_name) {
            const chatSideName = chat.chat_name;
            return (
              <Link  key={chat.chat_id} to={`/chats/${chat.chat_id}`}>
              <div
                className="ChatMenu-Choosing-Item"
                onClick={() => {
                  setActiveChat(chat);
                }}
              >
                <div style={{
                  width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '60px',
                }}
                >
                  <div className="ChatMenu-ChoosingItem-Header">
                    <h1>{chatSideName}</h1>
                  </div>

                </div>

              </div>
              </Link>
            );
          }
          return null;
        })
      }
    </div>

  );
}
