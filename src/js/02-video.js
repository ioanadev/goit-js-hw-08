import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

player.ready().then(() => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }

  player.on(
    'timeupdate',
    throttle(() => {
      const currentTime = Math.floor(player.getCurrentTime());
      localStorage.setItem('videoplayer-current-time', currentTime);
    }, 1000)
  );
});
