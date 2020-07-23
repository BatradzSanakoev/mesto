import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._popupForm = this._popupSelector.querySelector('.pop-up__form');
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll('.pop-up__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._formSubmitCallback(this._getInputValues());
    // this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._formSubmitHandler);
  }
}
