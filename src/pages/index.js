import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  valObj
} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteConfirm from '../components/PopupWithDeleteConfirm.js';
import PopupWithAvatarLink from '../components/PopupWithAvatarLink.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

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
  delPopUp = document.querySelector('.delete-pop'),
  avatarPopUp = document.querySelector('.avatar-pop'),
  avatarForm = avatarPopUp.querySelector('.pop-up__form_avatar'),
  profileName = content.querySelector('.profile__name'),
  profileDescription = content.querySelector('.profile__description'),
  profileAvatar = content.querySelector('.profile__avatar'),
  profileAvatarEdit = content.querySelector('.profile__avatar-overlay'),
  cardTemplate = document.querySelector('#element');

//настройки запроса
const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '8ae24bbd-d671-4b48-ac3b-ccb26b92e896',
    'Content-type': 'application/json'
  }
};

//создаем экземпляры класса валидации для каждого попапа
const editValidation = new FormValidator(valObj, editForm),
  addValidation = new FormValidator(valObj, addForm),
  avaValidation = new FormValidator(valObj, avatarForm);

//создаем экземпляр класса Api для всех операций с сервером
const api = new Api(apiOptions);

//загружаем данные профиля
api.loadUserInfo()
  .then(result => {
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    profileAvatar.src = result.avatar;
  });

// создаем экземпляр класса попапа аватара, реализуем в колбеке смену аватара
const avatarPop = new PopupWithAvatarLink(avatarPopUp, (evt) => {
  evt.preventDefault();
  const buttonValue = avatarPop._popupForm.querySelector('.pop-up__button');
  buttonValue.textContent = 'Обновление...';
  const url = avatarPop._popupForm.querySelector('.pop-up__input').value;
  api.editUserAvatar({
      url: url
    })
    .then(result => {
      profileAvatar.src = result.avatar;
      buttonValue.textContent = 'Изменить';
    })
    .finally(() => avatarPop.close());
});
avatarPop.setEventListeners();
avatarPop.setSubmit();

profileAvatarEdit.addEventListener('click', () => {
  avaValidation.resetValidation();
  avatarPop.open();
  avatarPop.escListener();
});

//создаем экземпляр класса попапа изображения
const popupImage = new PopupWithImage(imagePopUp);
popupImage.setEventListeners();

//создаем экземпляр класса попапа удаления и передаем в кач-ве колбека ф-ию удаления карточки
const delPop = new PopupWithDeleteConfirm(delPopUp, (evt, card) => {
  evt.preventDefault();
  const delButton = delPop._popupForm.querySelector('.pop-up__button');
  delButton.textContent = 'Удаление...';
  api.delCard(card._id)
    .then(() => {
      card._element.remove();
      card._element = null;
      delButton.textContent = 'Да';
    })
    .finally(() => delPop.close());
});
delPop.setSubmit();
delPop.setEventListeners();

const callbackForCardApiLoad = item => {
  const card = new Card(item, cardTemplate, () => {
      popupImage.open(item.link, item.name);
      popupImage.escListener();
    },
    () => {
      delPop.open(card);
      delPop.escListener();
    },
    evt => {
      const likeButton = evt.target;
      const likesCount = likeButton.closest('.element__likes').querySelector('.element__like-count');
      likeButton.classList.toggle('element__like_liked');
      if (likeButton.classList.contains('element__like_liked')) {
        item.likes.push(item.owner);
        api.likeCard(item._id)
          .then(() => likesCount.textContent = item.likes.length);
      } else {
        item.likes.pop(item.owner);
        api.unlikeCard(item._id)
          .then(() => likesCount.textContent = item.likes.length);
      }
    });
    return card;
};

//загружаем карточки с сервера
api.loadCards()
  .then(result => {
    const renderer = item => {
      const card = callbackForCardApiLoad(item);
      const cardElement = card.createCard();
      if (item.owner._id !== 'c58d0e152de19d7deeb93b37') cardElement.querySelector('.element__del').classList.add('element__del_hidden');
      cardsRender.addItem(cardElement);
    };

    const cardsRender = new Section({
      items: result,
      renderer: renderer
    }, '.elements');
    cardsRender.renderItems();
  });

//создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descSelector: '.profile__description',
  avaSelector: '.profile__avatar'
});

//функция editFormSubmitCallback для передачи в экземпляр класса попапа
const editFormSubmitCallback = item => {
  const editButton = editPop._popupForm.querySelector('.pop-up__button');
  editButton.textContent = 'Сохранение...';
  api.editUserProfile(item.name, item.description)
    .then(result => {
      userInfo.setUserInfo({
        newName: result.name,
        newDesc: result.about
      });
      editButton.textContent = 'Сохранить';
    })
    .finally(() => editPop.close());
};

//создание экземпляра класса PopupWithForm
const editPop = new PopupWithForm(editPopUp, editFormSubmitCallback);
editPop.setEventListeners();

//открытие попапа редактирования
editButton.addEventListener('click', () => {
  const editInfo = userInfo.getUserInfo();
  editValidation.resetValidation();
  editName.value = editInfo.name;
  editDesc.value = editInfo.description;
  editPop.open();
  editPop.escListener();
});

//создание экземпляра класса Section
const addCardsRender = new Section({
  items: []
}, '.elements');

//задаем колбек экземпляра класса попапа добавления карточки, в котором реализуется практически такой же процесс как и при загрузке карточек с сервера
const addFormSubmitCallback = item => {
  api.addCard(item)
    .then(result => {
      const card = callbackForCardApiLoad(result);
      const cardElement = card.createCard();
      addCardsRender.addItem(cardElement);
    })
    .finally(() => addPop.close());
}

// //создание экземпляра класса PopupWithForm
const addPop = new PopupWithForm(addPopUp, addFormSubmitCallback);
addPop.setEventListeners();

//открытие попапа добавления
addButton.addEventListener('click', () => {
  addValidation.resetValidation();
  addPop.open();
  addPop.escListener();
});

//включение валидации
editValidation.enableValidation();
addValidation.enableValidation();
avaValidation.enableValidation();
