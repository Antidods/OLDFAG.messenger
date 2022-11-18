'use strict';

const WINDOW = document.querySelector('.window');
const buttonFullscreen = document.querySelector(
  '.window__manager_maximize'
);
buttonFullscreen.addEventListener('click', () => {
  WINDOW.classList.toggle('fullscreen');
});

const buttonClose = document.querySelector(
  '.window__manager_close'
);
buttonClose.addEventListener('click', () => {
  WINDOW.classList.add('hidden');
});