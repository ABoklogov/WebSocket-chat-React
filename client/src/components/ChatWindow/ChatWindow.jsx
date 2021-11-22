import s from './ChatWindow.module.css';

const ChatWindow = ({ messages }) => {
  return (
    <ul className={s.chatWindow}>
      {messages.map(mess => (
        <li key={mess.id}>{mess.message}</li>
      ))}
    </ul>
  );
};

export default ChatWindow;
