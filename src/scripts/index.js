import '../pages/index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  initialCards,
  valObj,
  content,
  editPopUp,
  editButton,
  editForm,
  addPopUp,
  addButton,
  addForm,
  imagePopUp,
  cardTemplate
} from './constants.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

//создаем экземпляры класса валидации для каждого попапа
const editValidation = new FormValidator(valObj, editForm),
  addValidation = new FormValidator(valObj, addForm);

//создаем экземпляр класса попапа изображения
const popupImage = new PopupWithImage(imagePopUp);

//функция handleCardClick для класса Card
const handleCardClick = evt => {
  popupImage.handleCardClick(evt);
  popupImage.setEventListeners();
}

//функция renderer для класса Section
const renderer = item => {
  const card = new Card(item.link, item.name, cardTemplate, handleCardClick);
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
}

//создание экземпляра класса PopupWithForm
const editPop = new PopupWithForm(editPopUp, editFormSubmitCallback, editValidation);

//открытие попапа редактирования
editButton.addEventListener('click', () => {
  editPop.open();
  document.querySelector('.pop-up__input_edit-name').value = editInfo.getUserInfo().name;
  document.querySelector('.pop-up__input_edit-desc').value = editInfo.getUserInfo().description;
  editPop.setEventListeners();
});

//создание экземпляра класса Section
const addCardsRender = new Section({items: []}, '.elements');

//функция editFormSubmitCallback для передачи в экземпляр класса попапа
const addFormSubmitCallback = (item) => {
  const card = new Card(item.url, item.name, cardTemplate, handleCardClick);
  const cardElement = card.createCard();
  addCardsRender.addItem(cardElement);
}

//создание экземпляра класса PopupWithForm
const addPop = new PopupWithForm(addPopUp, addFormSubmitCallback, addValidation);

//открытие попапа добавления
addButton.addEventListener('click', () => {
  addPop.open();
  addPop.setEventListeners();
})

//включение валидации
editValidation.enableValidation();
addValidation.enableValidation();
