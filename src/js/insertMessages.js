import parceDate from './parceDate';

export default function insertMessages(messagesArray) {
  for (let i = 0; i < messagesArray.length && messagesArray.length > 0; i += 1) {
    const email = document.createElement('div');
    email.classList.add('email');
    email.textContent = messagesArray[i].email;
    const text = document.createElement('div');
    text.classList.add('message-text');
    let messageText = messagesArray[i].text;
    if (messageText.length > 15) {
      messageText = `${messageText.substr(0, 25)}...`;
    }
    text.textContent = messageText;
    const date = document.createElement('div');
    date.classList.add('date');
    date.textContent = parceDate(messagesArray[i].date);

    const message = document.createElement('div');
    message.classList.add('message');
    message.append(email, text, date);

    const messages = document.querySelector('.messages');
    messages.insertAdjacentElement('afterbegin', message);
  }
}
