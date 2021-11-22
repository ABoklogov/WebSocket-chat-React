import s from './LoginForm.module.css';

const LoginForm = () => {
  return (
    <form className={s.loginForm}>
      <input type="text" placeholder="Введите имя" />
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;
