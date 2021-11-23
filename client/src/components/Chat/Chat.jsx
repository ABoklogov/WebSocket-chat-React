import { useRef, useState } from 'react';
import s from './Chat.module.css';
import shortid from 'shortid';
import ChatWindow from '../ChatWindow';
import ChatForm from '../ChatForm';
import LoginForm from '../LoginForm';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');

  const connect = () => {
    socket.current = new WebSocket('ws://localhost:5000');

    socket.current.onopen = () => {
      setConnected(true);
      console.log('Подключение установлено!');

      const message = {
        id: shortid.generate(),
        event: 'connection',
        username,
      };
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = event => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };
    socket.current.onclose = () => {
      console.log('Произошло отключение');
    };
    socket.current.onerror = () => {
      console.log('Произошла ошибка');
    };
  };
  const sendMessage = () => {
    const message = {
      id: shortid.generate(),
      event: 'message',
      message: value,
      username,
    };
    socket.current.send(JSON.stringify(message));
    setValue('');
  };

  return (
    <div className={s.chat}>
      {!connected && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          connect={connect}
        />
      )}

      {connected && (
        <>
          <ChatWindow messages={messages} />
          <ChatForm
            value={value}
            setValue={setValue}
            sendMessage={sendMessage}
          />
        </>
      )}
    </div>
  );
};

export default Chat;
