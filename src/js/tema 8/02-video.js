import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

console.log(throttle);

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);
console.log(player);
player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }, 1000)
);
const currentTime = localStorage.getItem('videoplayer-current-time');
if (currentTime) {
  player
    .setCurrentTime(currentTime)
    .then(function (seconds) {
      console.log('Resuming playback at ' + seconds + ' seconds');
    })
    .catch(function (error) {
      console.log('Error setting current time: ' + error);
    });
}
