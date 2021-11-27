import { useRef, useState, useEffect } from 'react';
import s from './Chat.module.css';
import shortid from 'shortid';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatWindow from '../ChatWindow';
import ChatForm from '../ChatForm';
import LoginForm from '../LoginForm';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');
  const { REACT_APP_HOST } = process.env;

  useEffect(() => {
    const localMessages = localStorage.getItem('messages');

    if (!localMessages) {
      return;
    }

    const message = JSON.parse(localMessages);
    setMessages(prev => [...prev, ...message]);
  }, []);

  const connect = () => {
    socket.current = new WebSocket(REACT_APP_HOST);

    socket.current.onopen = () => {
      if (username.trim() === '') {
        toast.error(`Пожалуйста, введите имя!`, { theme: 'colored' });
        return;
      }

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
      setMessages([...messages, message]);
    };

    socket.current.onclose = () => {
      console.log('Произошло отключение');
    };

    socket.current.onerror = () => {
      console.log('Произошла ошибка');
    };
  };

  const sendMessage = () => {
    if (value.trim() === '') {
      return;
    }

    const message = {
      id: shortid.generate(),
      event: 'message',
      message: value,
      username,
    };

    socket.current.send(JSON.stringify(message));

    saveLocalMessages(message);
    setValue('');
  };

  const saveLocalMessages = mess => {
    const localMessages = localStorage.getItem('messages');
    if (localMessages === null) {
      localStorage.setItem('messages', JSON.stringify([mess]));
      return;
    }
    const parseMessages = JSON.parse(localMessages);
    parseMessages.push(mess);
    localStorage.setItem('messages', JSON.stringify(parseMessages));
  };

  const connectEnterKey = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      connect();
    }
  };

  const sendMessageEnter = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!connected && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          connect={connect}
          connectEnterKey={connectEnterKey}
        />
      )}

      {connected && (
        <div className={s.chat}>
          <ChatWindow messages={messages} username={username} />
          <ChatForm
            value={value}
            setValue={setValue}
            sendMessage={sendMessage}
            sendMessageEnter={sendMessageEnter}
          />
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Chat;
