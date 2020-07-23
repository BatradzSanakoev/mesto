import Popup from './Popup.js';

export default class PopupWithAvatarLink extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.pop-up__form');
    this._formSubmitHandler = formSubmitHandler;
  }

  // open(item) {
  //   super.open();
  //   this._item = item;
  // }

  setSubmit() {
    this._popupForm.addEventListener('submit', this._formSubmitHandler);
  }
}
