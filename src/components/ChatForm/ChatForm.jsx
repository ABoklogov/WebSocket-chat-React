import s from './ChatForm.module.css';
import { Form, Button } from 'react-bootstrap';

const ChatForm = ({ value, setValue, sendMessage, sendMessageEnter }) => {
  return (
    <Form className={s.chatForm}>
      <Form.Control
        className={s.chatInput}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyPress={sendMessageEnter}
        placeholder="Введите сообщение"
      />

      <Button variant="success" type="button" onClick={sendMessage}>
        Отправить
      </Button>
    </Form>
  );
};

export default ChatForm;
