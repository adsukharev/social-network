import React, {useState, useContext} from 'react';
import {ChatContext} from "../../contexts/ChatContext";
import DialogMenu from "./DialogMenu";
import DialogWindow from "./DialogWindow";

export default function Chat(props) {
  const {chatsLoaded} = useContext(ChatContext);
    return (
        chatsLoaded &&     <div className="Chat-Container-Background">
          <DialogMenu {...props}/>
          <DialogWindow {...props}/>
        </div>
    )
}
