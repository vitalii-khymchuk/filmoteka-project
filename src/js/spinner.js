import { Spinner } from "spin.js";

const refs = {
    spinner: document.querySelector('.js-spinner'),
    load:document.querySelector('[data-load]'),

}

const opts = {
    lines: 18, // The number of lines to draw
    length: 42, // The length of each line
    width: 9, // The line thickness
    radius: 25, // The radius of the inner circle
    scale: 1.2, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    speed: 0.8, // Rounds per second
    rotate: 35, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#ff6b08', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    top: '49%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: 'spinner', // The CSS class to assign to the spinner
    position: 'absolute', // Element positioning
  };

const spinner = new Spinner(opts);

export function spinnerPlay() {
    spinner.spin(refs.spinner);
    refs.load.classList.remove('is-hidden');
  }

  export function spinnerStop() {
    refs.load.classList.add('is-hidden');
    spinner.stop();
  }

