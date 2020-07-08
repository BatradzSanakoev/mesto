export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('pops-visible');
  }

  close() {
    this._popupSelector.classList.remove('pops-visible');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      this.close(document.querySelector('.pops-visible'));
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('.pop-up__close-button').addEventListener('click', () => {
      this.close();
    });

    document.addEventListener('click', evt => { //закрытие попапа при клике на оверлей
      if (evt.target.matches('.pop-up')) this.close();
    })

    document.addEventListener('keydown', this._handleEscClose);
  }
}
