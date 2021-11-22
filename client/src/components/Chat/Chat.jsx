import { useRef, useState } from 'react';
import s from './Chat.module.css';
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
    };
    socket.current.onmessage = () => {};
    socket.current.onclose = () => {
      console.log('Произошло отключение');
    };
    socket.current.onerror = () => {
      console.log('Произошла ошибка');
    };
  };
  const sendMessage = () => {};

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
