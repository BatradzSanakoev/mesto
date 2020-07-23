import Popup from './Popup.js';

export default class PopupWithDeleteConfirm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.pop-up__form');
    this._formSubmitHandler = formSubmitHandler;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setSubmit() {
    this._popupForm.addEventListener('submit', evt => this._formSubmitHandler(evt, this._card));
  }
}
