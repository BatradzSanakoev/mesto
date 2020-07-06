import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback, validClass) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._validClass = validClass; //экземпляр класса валидации для вызова метода сброса полей формы при сабмите
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
    this.close();
    this._popupForm.removeEventListener('submit', this._formSubmitHandler);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._formSubmitHandler);
  }

  close() {
    super.close();
    this._validClass.resetValidation();
  }
}
