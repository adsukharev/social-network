import React from 'react';
import {Link} from "react-router-dom";

function Message(props) {
  const { mes } = props;
  return (
    <div className="ChatWindow-Message-Message">
      <div className="ChatWindow-Message-Message-Without-Time">
        <div className="ChatWindow-Message-Message-Div-For-Ava">
        </div>
        <div className="ChatWindow-Message-Message-Div">
          <div className="ChatWindow-Message-Message-Time">
            <Link to={`/user_login/${mes.author}`}>
            <h1 className="ChatWindow-Message-Message-Name">
              {`${mes.author}`}

            </h1>
            </Link>
          </div>
          <p className="ChatWindow-Message-Message-Mes-Text">{mes.text}</p>
        </div>
      </div>
      <p className="ChatWindow-Message-Message-Time-Text">{mes.creation_date}</p>
    </div>
  );
}
export default Message;
