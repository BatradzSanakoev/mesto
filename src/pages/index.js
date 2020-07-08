import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, valObj} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

const content = document.querySelector('.content'),
  editPopUp = document.querySelector('.edit-pop'),
  editButton = content.querySelector('.profile__edit-button'),
  editForm = editPopUp.querySelector('.pop-up__form_edit'),
  editName = editPopUp.querySelector('.pop-up__input_edit-name'),
  editDesc = editPopUp.querySelector('.pop-up__input_edit-desc'),
  addPopUp = document.querySelector('.add-pop'),
  addButton = content.querySelector('.profile__add-button'),
  addForm = addPopUp.querySelector('.pop-up__form_add'),
  imagePopUp = document.querySelector('.image-popup'),
  cardTemplate = document.querySelector('#element');

//создаем экземпляры класса валидации для каждого попапа
const editValidation = new FormValidator(valObj, editForm),
  addValidation = new FormValidator(valObj, addForm);

//создаем экземпляр класса попапа изображения
const popupImage = new PopupWithImage(imagePopUp);
popupImage.setEventListeners();

//функция renderer для класса Section
const renderer = item => {
  const card = new Card(item.link, item.name, cardTemplate, () => popupImage.open(item.link, item.name));
  const cardElement = card.createCard();
  cardsRender.addItem(cardElement);
}

//создание экземпляра класса Section
const cardsRender = new Section({
  items: initialCards,
  renderer: renderer
}, '.elements');

//отрисовываем карточки
cardsRender.renderItems();

//создание экземпляра класса UserInfo
const editInfo = new UserInfo({
  nameSelector: '.profile__name',
  descSelector: '.profile__description'
});

//функция editFormSubmitCallback для передачи в экземпляр класса попапа
const editFormSubmitCallback = (item) => {
  editInfo.setUserInfo({
    newName: item.name,
    newDesc: item.description
  })
};

//создание экземпляра класса PopupWithForm
const editPop = new PopupWithForm(editPopUp, editFormSubmitCallback);
editPop.setEventListeners();

//открытие попапа редактирования
editButton.addEventListener('click', () => {
  const getEditInfo = editInfo.getUserInfo();
  editValidation.resetValidation();
  editName.value = getEditInfo.name;
  editDesc.value = getEditInfo.description;
  editPop.open();
});

//создание экземпляра класса Section
const addCardsRender = new Section({
  items: []
}, '.elements');

//функция editFormSubmitCallback для передачи в экземпляр класса попапа
const addFormSubmitCallback = (item) => {
  const card = new Card(item.url, item.name, cardTemplate, () => popupImage.open(item.url, item.name));
  const cardElement = card.createCard();
  addCardsRender.addItem(cardElement);
}

//создание экземпляра класса PopupWithForm
const addPop = new PopupWithForm(addPopUp, addFormSubmitCallback);
addPop.setEventListeners();

//открытие попапа добавления
addButton.addEventListener('click', () => {
  addValidation.resetValidation();
  addPop.open();
})

//включение валидации
editValidation.enableValidation();
addValidation.enableValidation();
