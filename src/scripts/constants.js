const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Объект параметров валидации
const validObj = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_inactive',
  inputErrorClass: 'pop-up__input_type-error',
  errorClass: 'pop-up__input_error-active'
};

//константы 
const content = document.querySelector('.content'),
  editPopUp = document.querySelector('.edit-pop'),
  editButton = content.querySelector('.profile__edit-button'),
  editForm = editPopUp.querySelector('.pop-up__form_edit'),
  addPopUp = document.querySelector('.add-pop'),
  addButton = content.querySelector('.profile__add-button'),
  addForm = addPopUp.querySelector('.pop-up__form_add'),
  imagePopUp = document.querySelector('.image-popup'),
  cardTemplate = document.querySelector('#element');

export {initialCards, validObj as valObj, content, editPopUp, editButton, editForm, addPopUp, addButton, addForm, imagePopUp, cardTemplate};