function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const btnStart = document.querySelector('button[data-start]');
console.log(btnStart);
const btnStop = document.querySelector('button[data-stop]');
console.log(btnStop);
const body = document.querySelector('body');

let timerId = null;

btnStart.addEventListener('click', () => {
  d;
  btnStop.removeAttr;
  console.log('S-a apasat butonul start!');
  btnStart.setAttribute('disabled', 'disabled'); //trece butonul start in starea disableibute('disabled'); //scoate starea de disable de pe butonul de stop
  timerId = setInterval(() => {
    //repeta codul intr-un interval
    body.style.backgroundColor = getRandomHexColor(); //modifica culoarea paginii
  }, 1000); //intervalul in care se modifica culorile
});

btnStop.addEventListener('click', () => {
  console.log('S-a apasat butonul stop!');
  clearInterval(timerId); //opreste functia setInterval
  btnStop.setAttribute('disabled', 'disabled');
  btnStart.removeAttribute('disabled');
});
