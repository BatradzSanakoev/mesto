import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, name) {
    this._popupSelector.querySelector('.image-popup__image').src = link;
    this._popupSelector.querySelector('.image-popup__image').alt = `Картинка ${name} не загрузилась`;
    this._popupSelector.querySelector('.image-popup__name').textContent = name;
    super.open();
  }
}
