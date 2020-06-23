import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  cards,
  valObj
} from './const_objects.js';

const content = document.querySelector('.content'),
  editPopUp = document.querySelector('.edit-pop'),
  editName = editPopUp.querySelector('.pop-up__input_edit-name'),
  editDesc = editPopUp.querySelector('.pop-up__input_edit-desc'),
  editButton = content.querySelector('.profile__edit-button'),
  editForm = editPopUp.querySelector('.pop-up__form_edit'),
  addPopUp = document.querySelector('.add-pop'),
  addName = addPopUp.querySelector('.pop-up__input_add-name'),
  addUrl = addPopUp.querySelector('.pop-up__input_add-url'),
  addButton = content.querySelector('.profile__add-button'),
  addForm = addPopUp.querySelector('.pop-up__form_add'),
  imagePopUp = document.querySelector('.image-popup'),
  imageName = imagePopUp.querySelector('.image-popup__name'),
  image = imagePopUp.querySelector('.image-popup__image'),
  profName = content.querySelector('.profile__name'),
  profDesc = content.querySelector('.profile__description'),
  elements = content.querySelector('.elements'),
  cardTemplate = document.querySelector('#element'),
  editValidation = new FormValidator(valObj, editForm),
  addValidation = new FormValidator(valObj, addForm);

//Функция добавления карточки в DOM
function addElementToDOM(card, container) {
  container.prepend(card);
}

//Функция закрывающая попап при нажатии на оверлей, установка и удаление слушателя для нее ///////////////////////////////////////////////
function overlayClosePopUp(evt) {
  if (evt.target.matches('.pop-up')) {
    closePopUp(evt.target.closest('.pop-up'));
    removeOverlayCloseListener();
  }
}

function addOverlayCloseListener() {
  document.addEventListener('click', overlayClosePopUp);
}

function removeOverlayCloseListener() {
  document.removeEventListener('click', overlayClosePopUp);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Функция закрытия любоого попапа при нажатии Esc, установка и удаление слушателя для нее ///////////////////////////////////////////////
function escClose(evt) {
  const popUp = document.querySelector('.pops-visible');

  if (evt.key === 'Esc' || evt.key === 'Escape') {
    closePopUp(popUp);
    removeEscCloseListener();
  }
}

function addEscCloseListener() {
  document.addEventListener('keydown', escClose);
}

function removeEscCloseListener() {
  document.removeEventListener('keydown', escClose);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Функция, передающая turnPopUp требуемый попап для закрытия, установка и удаление слушателя для нее ///////////////////////////////////////////////
function closeButton(evt) {
  if (evt.target.matches('.pop-up__close-icon')) {
    closePopUp(evt.target.closest('.pop-up'));
    removeCloseButtonListener();
  }
}

function addCloseButtonListener() {
  document.addEventListener('click', closeButton);
}

function removeCloseButtonListener() {
  document.removeEventListener('click', closeButton);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Функция реакции на нажатие кнопки "сохранить" на попапе редактирования
function editSubmit() {
  profName.textContent = editName.value;
  profDesc.textContent = editDesc.value;
  editName.closest('.pop-up__form').reset();
}

//Функция реакции на нажатие кнопки "создать" на попапе добавления карточек
function addSubmit() {
  const card = new Card(addUrl.value, addName.value, cardTemplate).createCard();
  addElementToDOM(card, elements);
}

//Функция, реагирующая на нажатие кнопки на попапе и передающая требуемый попап функциям editSubmit/addSubmit
function formSubmitHandler(evt) {
  evt.preventDefault();

  const evtButton = evt.target.querySelector('.pop-up__button'),
    popUp = evtButton.closest('.pop-up');

  popUp.classList.contains('edit-pop') ? editSubmit() : addSubmit();
  closePopUp(popUp);
}

//Функция открытия попапа
function openPopUp(popUp) {
  popUp.classList.add('pops-visible');
  addCloseButtonListener();
  addEscCloseListener();
  addOverlayCloseListener();
}

//Функция закрытия попапа
function closePopUp(popUp) {
  popUp.classList.remove('pops-visible');
  removeCloseButtonListener();
  removeEscCloseListener();
  removeOverlayCloseListener();
}

//Функция открытияПопапаРедактирования
function openProfileEdit() {
  const popForm = editPopUp.querySelector('.pop-up__form');

  editValidation.enableValidation();
  openPopUp(editPopUp);

  editName.value = profName.textContent;
  editDesc.value = profDesc.textContent;
  
  popForm.addEventListener('submit', formSubmitHandler);
}

//Функция открытияПопапаДобавленияКарточки
function openProfileAdd() {
  const popForm = addPopUp.querySelector('.pop-up__form');

  popForm.reset();
  addValidation.enableValidation();
  openPopUp(addPopUp);
  popForm.addEventListener('submit', formSubmitHandler);
}

//Функция открытия попапа изображения
export function openImagePopUp(evt) {
  const element = evt.target.closest('.element'),
    elementPhoto = element.querySelector('.element__photo'),
    elementName = element.querySelector('.element__name');

  image.src = elementPhoto.src;
  image.alt = elementPhoto.alt;
  imageName.textContent = elementName.textContent;

  openPopUp(imagePopUp);
}

//Загружаю исходные карточки при загрузке страницы
cards.forEach(item => {
  const card = new Card(item.link, item.name, cardTemplate).createCard();
  addElementToDOM(card, elements);
});

// editForm.addEventListener('click', formSubmitHandler);
// addForm.addEventListener('click', formSubmitHandler);
editButton.addEventListener('click', openProfileEdit);
addButton.addEventListener('click', openProfileAdd);
