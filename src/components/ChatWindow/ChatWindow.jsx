import './ChatWindow.scss';
import { useRef, useEffect } from 'react';

const ChatWindow = ({ messages, username }) => {
  const chatWindow = useRef();
  useEffect(() => {
    chatWindow.current.scrollTo({
      top: 9999,
      behavior: 'smooth',
    });
  });

  return (
    <ul className="chatWindow" ref={chatWindow}>
      {messages.map(mess => {
        const messageClassName = mess.username === username ? 'you' : 'user';
        const messagePosition = messageClassName !== 'you' && 'right';

        return (
          <li className="item" key={mess.id}>
            {mess.event === 'connection' ? (
              <p>Пользователь {mess.username} подключился</p>
            ) : (
              <p className={`${messagePosition}`}>
                {mess.username}:{` `}
                <span className={`${messageClassName}`}>{mess.message}</span>
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ChatWindow;
