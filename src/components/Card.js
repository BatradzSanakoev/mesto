export default class Card {
  constructor({
    link,
    name,
    _id,
    likes,
    owner
  }, elementTemplate, handleCardClick, cardDeleteConfirm, liked) {
    this._link = link;
    this._name = name;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;
    this._elementTemplate = elementTemplate;
    this._handleCardClick = handleCardClick;
    this._cardDeleteConfirm = cardDeleteConfirm;
    this._liked = liked;
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
      cardLikes = cardContent.querySelector(`.${this._elementTemplate.id}__like-count`),
      card = cardContent.querySelector(`.${this._elementTemplate.id}`);

    cardPhoto.src = this._link;
    cardPhoto.alt = `Картинка ${this._name} не загрузилась`;
    cardName.textContent = this._name;
    cardLikes.textContent = this._likes.length;

    this._likes.find(owner => {
      if (owner._id === 'c58d0e152de19d7deeb93b37') card.querySelector(`.${this._elementTemplate.id}__like`).classList.add('element__like_liked')
    });

    this._element = card;
    this._setEventListeners(this._element);

    return this._element;
  }

  //Функция удаления карточки
  // _deleteButton() {
  //   this._element.remove();
  //   delete this._element;
  // }

  //Функция изменения иконки лайка при нажатии
  _likedIcon() {
    this._element.querySelector('.element__like').classList.toggle('element__like_liked');
  }

  _setEventListeners(card) {
    const cardDelete = card.querySelector(`.${this._elementTemplate.id}__del`),
      cardLike = card.querySelector(`.${this._elementTemplate.id}__like`),
      cardPhoto = card.querySelector(`.${this._elementTemplate.id}__photo`),
      cardLikes = card.querySelector(`.${this._elementTemplate.id}__like-count`);

    cardDelete.addEventListener('click', this._cardDeleteConfirm);

    cardLike.addEventListener('click', this._liked);
    // () => {

    //   this._likedIcon();
    //   if (cardLike.classList.contains('element__like_liked')) {
    //     this._likes.push(this._owner);
    //     this._api.likeCard(this._id);
    //     cardLikes.textContent = this._likes.length;
    //   } else {
    //     this._likes.pop(this._owner);
    //     this._api.unlikeCard(this._id);
    //     cardLikes.textContent = this._likes.length;
    //   }
    // });
    cardPhoto.addEventListener('click', this._handleCardClick);
  }
}
