import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import fileTableTpl from '../../templates/torrentFilesTable.hbs';

const container = document.querySelector('.accordion-container');

export function createTorrentMarkup(data) {
  container.innerHTML = fileTableTpl(data);
  new Accordion('.accordion-container-main');
  new Accordion('.accordion-container');
}
