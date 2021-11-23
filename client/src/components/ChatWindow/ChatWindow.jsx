import s from './ChatWindow.module.css';

const ChatWindow = ({ messages }) => {
  return (
    <ul className={s.chatWindow}>
      {messages.map(mess => (
        <li key={mess.id}>
          {mess.event === 'connection' ? (
            <p>Пользователь {mess.username} подключился</p>
          ) : (
            <p>
              {mess.username}: {mess.message}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ChatWindow;
