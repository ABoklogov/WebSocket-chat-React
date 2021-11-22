import s from './Chat.module.css';

const Chat = () => {
  return (
    <div className={s.chat}>
      <div className={s.chatWindow}></div>
      <form className={s.chatForm} action="">
        <input
          className={s.chatInput}
          type="text"
          placeholder="Введите сообщение"
        />
        <button>Отправить</button>
      </form>
    </div>
  );
};

export default Chat;
