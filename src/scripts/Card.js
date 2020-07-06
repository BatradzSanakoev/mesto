export default class Card {
  constructor(link, name, elementTemplate, handleCardClick) {
    this._link = link;
    this._name = name;
    this._elementTemplate = elementTemplate;
    this._handleCardClick = handleCardClick;
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

    this._element = card;
    this._setEventListeners(this._element);

    return this._element;
  }

  //Функция удаления карточки
  _deleteButton() {
    this._element.remove();
    this._element = null;
  }

  //Функция изменения иконки лайка при нажатии
  _likedIcon() {
    this._element.querySelector('.element__like').classList.toggle('element__like_liked');
  }

  _setEventListeners(card) {
    const cardDelete = card.querySelector(`.${this._elementTemplate.id}__del`),
      cardLike = card.querySelector(`.${this._elementTemplate.id}__like`),
      cardPhoto = card.querySelector(`.${this._elementTemplate.id}__photo`);

    cardDelete.addEventListener('click', () => this._deleteButton());

    cardLike.addEventListener('click', () => this._likedIcon());

    cardPhoto.addEventListener('click', this._handleCardClick);
  }
}
