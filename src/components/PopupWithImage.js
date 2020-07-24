import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = this._popupSelector.querySelector('.image-popup__image');
    this._imagePopupName = this._popupSelector.querySelector('.image-popup__name');
  }

  open(link, name) {
    this._imagePopup.src = link;
    this._imagePopup.alt = `Картинка ${name} не загрузилась`;
    this._imagePopupName.textContent = name;
    super.open();
  }
}
