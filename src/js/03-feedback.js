import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const feedbackForm = 'feedback-form-state';
console.log(form);

function saveStateToLocalStorage() {
  const emailInput = form.querySelector('input[name="email"]');
  const messageTextarea = form.querySelector('textarea[name="message"]');

  const state = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  console.log(state);
  localStorage.setItem(feedbackForm, JSON.stringify(state));
}

form.addEventListener(
  'input',
  throttle(saveStateToLocalStorage, 500, { leading: false, trailing: true })
);
function loadStateFromLocalStorage() {
  const state = localStorage.getItem(feedbackForm);

  if (state) {
    const { email, message } = JSON.parse(state);

    const emailInput = form.querySelector('input[name="email"]');
    const messageTextarea = form.querySelector('textarea[name="message"]');

    emailInput.value = email;
    messageTextarea.value = message;
  }
}

loadStateFromLocalStorage();
form.addEventListener('submit', event => {
  event.preventDefault;
});
