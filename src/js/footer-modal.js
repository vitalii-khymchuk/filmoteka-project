openModalFooter = () => {
    this.refs.ourTeam.addEventListener('click', this.onOpenModalFooter);
  };
  onOpenModalFooter = () => {
    this.refs.upScroll.classList.add('visually-hidden');
    this.refs.backdropFooter.classList.remove('visually-hidden');
    this.refs.body.classList.add('no-scroll');
    this.closeModalFooter();
  };
  
  closeModalFooter = () => {
    this.refs.backdropFooter.addEventListener('click', this.onCloseModalFooterBackdrop);
    this.refs.closeFooterBt.addEventListener('click', this.onCloseModalFooterBt);
    window.addEventListener('keydown', this.onEscKeyFooter);
  };
  onCloseModalFooterBackdrop = event => {
    if (event.target.className !== 'backdrop-footer-modal') {
      return;
    }
    this.refs.backdropFooter.classList.add('visually-hidden');
    this.refs.body.classList.remove('no-scroll');
    this.refs.upScroll.classList.remove('visually-hidden');
    this.refs.backdropFooter.removeEventListener('click', this.onCloseModalFooterBackdrop);
  };
  onCloseModalFooterBt = () => {
    this.refs.backdropFooter.classList.add('visually-hidden');
    this.refs.body.classList.remove('no-scroll');
    this.refs.upScroll.classList.remove('visually-hidden');
    this.refs.closeFooterBt.removeEventListener('click', this.onCloseModalFooterBt);
  };

  onEscKeyFooter = evn => {
    console.log(evn.code);
    if (evn.code !== 'Escape') {
      return;
    }
    this.refs.body.classList.remove('no-scroll');
    this.refs.backdropFooter.classList.add('visually-hidden');
    this.refs.upScroll.classList.remove('visually-hidden');
    window.removeEventListener('keydown', this.onEscKeyFooter);
  };