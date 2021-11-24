import './ChatWindow.scss';

const ChatWindow = ({ messages, username }) => {
  return (
    <ul className="chatWindow">
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
