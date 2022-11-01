import Darkmode from 'darkmode-js';
const options = {
  bottom: '22px', // default: '32px'
  right: '25px', // default: '32px'
  left: 'unset', // default: 'unset'
  time: '0.3s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff', // default: '#fff'
  buttonColorDark: '#100f2c', // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: false, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: true, // default: true
};

const darkmode = new Darkmode(options);

const checkbox = document.getElementById('input');

const checkedColor = '#092c3e';
const uncheckedColor = '#fff';

function changeColor() {
  if (checkbox.checked) {
    document.body.style.backgroundColor = checkedColor;
    darkmode.toggle();
  } else {
    document.body.style.backgroundColor = uncheckedColor;
    darkmode.toggle();
  }
}

checkbox.addEventListener('click', changeColor);
