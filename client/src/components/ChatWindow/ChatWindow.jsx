import s from './ChatWindow.module.css';
import { ListGroup } from 'react-bootstrap';

const ChatWindow = ({ messages }) => {
  return (
    <ListGroup className={s.chatWindow}>
      {messages.map(mess => (
        <ListGroup.Item key={mess.id}>
          {mess.event === 'connection' ? (
            <p>Пользователь {mess.username} подключился</p>
          ) : (
            <p>
              {mess.username}: {mess.message}
            </p>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ChatWindow;
