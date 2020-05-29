const page = document.querySelector('.page'),
  content = document.querySelector('.content'),
  edit = content.querySelector('.profile__edit-button'),
  add = content.querySelector('.profile__add-button'),
  profName = content.querySelector('.profile__name'),
  profDesc = content.querySelector('.profile__description'),
  elements = content.querySelector('.elements');

//Загружаю исходные карточки при загрузке страницы
function loadCards() {
  initialCards.forEach(item => {
    createCard(item.link, item.name);
  });
}

//Функция создания карточки
function createCard(link, name) {
  const cardTemplate = document.querySelector('#element').content,
    cardContent = cardTemplate.cloneNode(true),
    cardPhoto = cardContent.querySelector('.element__photo'),
    cardName = cardContent.querySelector('.element__name'),
    card = cardContent.querySelector('.element');

  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardName.textContent = name;

  return addElementToDOM(card);
}

//Функция добавления карточки в DOM
function addElementToDOM(card) {
  const del = card.querySelector('.element__del'),
    like = card.querySelector('.element__icon'),
    photo = card.querySelector('.element__photo');

  del.addEventListener('click', deleteButton);
  like.addEventListener('click', likedIcon);
  photo.addEventListener('click', openImagePopUp);
  elements.prepend(card);
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

  //Хотел написать условие или функцию, чтобы при пустых полях кнопка блокировалась, а при заполнении разблокировалась, но ничего не вышло, не получается в реальном времени добиться такого эффекта
  //Буду благодарен, если дадите подсказку оп данному вопросу  
  if (popName.value === '' || popDesc.value === '') return 0;
  else {
    profName.textContent = popName.value;
    profDesc.textContent = popDesc.value;
  }
}

//Функция реакции на нажатие кнопки "создать" на попапе добавления карточек
function addSubmit(popUp) {
  const addLink = popUp.querySelector('.pop-up__input_desc'),
    addName = popUp.querySelector('.pop-up__input_name');

  if (addName.value === '' || addLink.value === '') return 0;
  else {
    createCard(addLink.value, addName.value);
  }
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

//Открытие попапа редактирования
function callEditPopUp() {
  const edit = document.querySelector('.edit-pop'),
    editName = edit.querySelector('.pop-up__input_name'),
    editDesc = edit.querySelector('.pop-up__input_desc'),
    close = edit.querySelector('.pop-up__close-button'),
    form = edit.querySelector('.pop-up__form');

  editName.value = profName.textContent;
  editDesc.value = profDesc.textContent;

  turnPopUp(edit);
  close.addEventListener('click', closeButton);
  form.addEventListener('submit', formSubmitHandler);
}

//Открытие попапа добавления карточек
function callAddPopUp() {
  const add = document.querySelector('.add-pop'),
    addName = add.querySelector('.pop-up__input_name'),
    addLink = add.querySelector('.pop-up__input_desc'),
    close = add.querySelector('.pop-up__close-button'),
    form = add.querySelector('.pop-up__form');

  turnPopUp(add);
  form.addEventListener('submit', formSubmitHandler);
  close.addEventListener('click', closeButton);
  addName.value = '';
  addLink.value = '';
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

loadCards();
edit.addEventListener('click', callEditPopUp);
add.addEventListener('click', callAddPopUp);
