import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');
//console.log(form);
const delayInput = document.querySelector('input[name="delay"]');
console.log(delayInput);
const stepInput = document.querySelector('input[name="step"]');
//console.log(step);
const amountInput = document.querySelector('input[name="amount"]');
//console.log(amount);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(position);
      }, delay);
    });
  } else {
    return new Promise(reject => {
      setTimeout(() => {
        reject(position);
      }, delay);
    });
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = amountInput.value;

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const currentDelay = delay + i * step;
    createPromise(position, currentDelay)
      .then(position => {
        //console.log(`Fulfilled promise ${position} in ${currentDelay}ms`);
        var successMessage = `Fulfilled promise ${position} in ${currentDelay}ms`;
        Notify.success(successMessage);
      })

      .catch(position => {
        // console.log(`Rejected promise ${position} in ${currentDelay}ms`);
        var feilureMessage = `Rejected promise ${position} in ${currentDelay}ms`;
        Notify.failure(feilureMessage);
      });
  }
});
