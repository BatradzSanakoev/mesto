//Можете пожалуйста объяснить в чем проблема с адаптивкой ?  Я уже 2 раза переделывал и все равно толком не понял, где конкретно возникает ошибка

const page = document.querySelector('.page'),
  content = document.querySelector('.content'),
  editPopUp = document.querySelector('.edit-pop'),
  addPopUp = document.querySelector('.add-pop'),
  editButton = content.querySelector('.profile__edit-button'),
  addButton = content.querySelector('.profile__add-button'),
  profName = content.querySelector('.profile__name'),
  profDesc = content.querySelector('.profile__description'),
  elements = content.querySelector('.elements');

//Загружаю исходные карточки при загрузке страницы
initialCards.forEach(item => {
  const card = createCard(item.link, item.name);
  addElementToDOM(card, elements);
});

//Функция создания карточки
function createCard(link, name) {
  const cardTemplate = document.querySelector('#element').content,
    cardContent = cardTemplate.cloneNode(true),
    cardPhoto = cardContent.querySelector('.element__photo'),
    cardName = cardContent.querySelector('.element__name'),
    cardDelete = cardContent.querySelector('.element__del'),
    cardLike = cardContent.querySelector('.element__icon'),
    card = cardContent.querySelector('.element');

  cardPhoto.src = link;
  cardPhoto.alt = name; //не понял замечание по поводу alt - при загрузке карточки в альт записывается название картинки, а что еще нужно?
  cardName.textContent = name;

  cardDelete.addEventListener('click', deleteButton);
  cardLike.addEventListener('click', likedIcon);
  cardPhoto.addEventListener('click', openImagePopUp);

  return card;
}

//Функция добавления карточки в DOM
function addElementToDOM(card, container) {
  container.prepend(card);
}

//Функция удаления карточки
function deleteButton(evt) {
  const delElement = evt.target.closest('.element');
  delElement.remove();
}

//Функция изменения иконки лайка при нажатии
function likedIcon(evt) {
  const evtTarget = evt.target,
    likedSrc = './images/liked.svg',
    unlikeSrc = './images/like.svg';

  if (!evtTarget.classList.contains('element__like_liked')) {
    evtTarget.classList.add('element__like_liked');
    evtTarget.src = likedSrc;
  } else {
    evtTarget.classList.remove('element__like_liked');
    evtTarget.src = unlikeSrc;
  }
}

//Функция открытия/закрытия попапа
function turnPopUp(popUp) {
  popUp.classList.toggle('pops-visible');
}

//Функция, передающая turnPopUp требуемый попап для закрытия
function closeButton(evt) {
  if (evt.target.closest('.pop-up')) turnPopUp(evt.target.closest('.pop-up'));
  if (evt.target.closest('.image-popup')) turnPopUp(evt.target.closest('.image-popup'));
}

//Функция реакции на нажатие кнопки "сохранить" на попапе редактирования
function editSubmit(popUp) {
  const popName = popUp.querySelector('.pop-up__input_name'),
    popDesc = popUp.querySelector('.pop-up__input_desc');

  //Большое спасибо за REQUIRED!
  profName.textContent = popName.value;
  profDesc.textContent = popDesc.value;
}

//Функция реакции на нажатие кнопки "создать" на попапе добавления карточек
function addSubmit(popUp) {
  const addLink = popUp.querySelector('.pop-up__input_desc'),
    addName = popUp.querySelector('.pop-up__input_name');

  const addCard = createCard(addLink.value, addName.value);
  addElementToDOM(addCard, elements);
}

//Функция, реагирующая на нажатие кнопки на попапе и передающая требуемый попап функциям editSubmit/addSubmit
function formSubmitHandler(evt) {
  evt.preventDefault();

  const evtButton = evt.target.querySelector('.pop-up__button'),
    popUp = evtButton.closest('.pop-up');

  if (popUp.classList.contains('edit-pop')) editSubmit(popUp);
  else addSubmit(popUp);

  turnPopUp(popUp);
}

//Вызов попапа
function callPopUp(evt) {
  const evtTarget = evt.target;
  return evtTarget.closest('.profile__edit-part') ? openPopUp(editPopUp) : openPopUp(addPopUp);
}

//Открытие попапа(любого)
function openPopUp(popUp) {
  const popName = popUp.querySelector('.pop-up__input_name'),
    popDesc = popUp.querySelector('.pop-up__input_desc'),
    popClose = popUp.querySelector('.pop-up__close-button'),
    popForm = popUp.querySelector('.pop-up__form');

  if (popUp.classList.contains('edit-pop')) {
    popName.value = profName.textContent;
    popDesc.value = profDesc.textContent;
  } else {
    popName.value = '';
    popDesc.value = '';
  }

  turnPopUp(popUp);
  popClose.addEventListener('click', closeButton);
  popForm.addEventListener('submit', formSubmitHandler);
}

//Функция открытия попапа изображения
function openImagePopUp(card) {
  const imagePopUp = document.querySelector('.image-popup'),
    imagePopUpClose = imagePopUp.querySelector('.image-popup__close-button'),
    image = imagePopUp.querySelector('.image-popup__image'),
    name = imagePopUp.querySelector('.image-popup__name'),
    element = card.target.closest('.element');

  turnPopUp(imagePopUp);
  image.src = element.querySelector('.element__photo').src;
  image.alt = element.querySelector('.element__photo').alt;
  name.textContent = element.querySelector('.element__name').textContent;

  imagePopUpClose.addEventListener('click', closeButton);
}

editButton.addEventListener('click', callPopUp);
addButton.addEventListener('click', callPopUp);
