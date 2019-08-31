import React, { useContext } from 'react';

import { ChatContext } from '../../contexts/ChatContext';
import { UserContext } from '../../contexts/UserContext';


export default function DialogMenu() {
  const {   activeChat, setActiveChat, chats, setChats, chatsLoaded } = useContext(ChatContext);
  const { userInfo } = useContext(UserContext);


  return (
    <div className="ChatMenu-Choosing-Bar">
      {
        chats.map((chat) => {
          if (chat.chat_name) {
            const chatSideName = chat.chat_name;
            return (
              <div
                key={chat.chat_id}
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
            );
          }
          return null;
        })
      }
    </div>
  );
}
