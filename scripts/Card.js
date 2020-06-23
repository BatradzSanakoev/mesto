import {
  openImagePopUp as _openImPopup
} from './index.js';

export default class Card {
  constructor(link, name, elementTemplate) {
    this._link = link;
    this._name = name;
    this._elementTemplate = elementTemplate;
  }

  _getCardTemplate() {
    const _cardTemplateContent = this._elementTemplate.content.cloneNode(true);
    return _cardTemplateContent;
  }

  //Функция создания карточки
  createCard() {
    const cardContent = this._getCardTemplate(),
      cardName = cardContent.querySelector(`.${this._elementTemplate.id}__name`),
      cardPhoto = cardContent.querySelector(`.${this._elementTemplate.id}__photo`),
      card = cardContent.querySelector(`.${this._elementTemplate.id}`);

    cardPhoto.src = this._link;
    cardPhoto.alt = `Картинка ${this._name} не загрузилась`;
    cardName.textContent = this._name;

    this._setEventListeners(card);

    return card;
  }

  //Функция удаления карточки
  _deleteButton(evt) {
    const delElement = evt.target.closest('.element');
    delElement.remove();
  }

  //Функция изменения иконки лайка при нажатии
  _likedIcon(evt) {
    const evtTarget = evt.target,
      likedSrc = './images/liked.svg',
      unlikedSrc = './images/like.svg';

    if (!evtTarget.classList.contains('element__like_liked')) {
      evtTarget.classList.add('element__like_liked');
      evtTarget.src = likedSrc;
    } else {
      evtTarget.classList.remove('element__like_liked');
      evtTarget.src = unlikedSrc;
    }
  }

  _setEventListeners(card) {
    const cardDelete = card.querySelector(`.${this._elementTemplate.id}__del`),
      cardLike = card.querySelector(`.${this._elementTemplate.id}__icon`),
      cardPhoto = card.querySelector(`.${this._elementTemplate.id}__photo`);

    cardDelete.addEventListener('click', this._deleteButton);

    cardLike.addEventListener('click', this._likedIcon);

    cardPhoto.addEventListener('click', _openImPopup);
  }
}
