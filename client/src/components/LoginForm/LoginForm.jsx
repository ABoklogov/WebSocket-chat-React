import s from './LoginForm.module.css';

const LoginForm = ({ username, setUsername, connect }) => {
  return (
    <form className={s.loginForm}>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Введите имя"
      />
      <button type="button" onClick={connect}>
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
