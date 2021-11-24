import s from './LoginForm.module.css';
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ username, setUsername, connect }) => {
  return (
    <Form className={s.loginForm}>
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          className={s.input}
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Введите имя"
        />

        <Form.Text className={s.text}>
          Заполните форму для подключения к чату
        </Form.Text>

        <Button variant="success" type="button" onClick={connect}>
          Войти
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
