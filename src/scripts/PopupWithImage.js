import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  handleCardClick(evt) {
    const element = evt.target.closest('.element'),
      elementPhoto = element.querySelector('.element__photo'),
      elementName = element.querySelector('.element__name');

    this._popupSelector.querySelector('.image-popup__image').src = elementPhoto.src;
    this._popupSelector.querySelector('.image-popup__image').alt = elementName.alt;
    this.open();
  }
}
