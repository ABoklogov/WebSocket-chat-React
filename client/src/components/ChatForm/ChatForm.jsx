import s from './ChatForm.module.css';

const ChatForm = ({ value, setValue, sendMessage }) => {
  return (
    <form className={s.chatForm} action="">
      <input
        className={s.chatInput}
        value={value}
        onChange={e => setValue(e.target.value)}
        type="text"
        placeholder="Введите сообщение"
      />
      <button onClick={sendMessage}>Отправить</button>
    </form>
  );
};

export default ChatForm;
