import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';

export default class PopupWithAvatarLink extends PopupWithForm {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.pop-up__form');
    this._formSubmitHandler = formSubmitHandler;
  }

  setSubmit() {
    this._popupForm.addEventListener('submit', this._formSubmitHandler);
  }
}
