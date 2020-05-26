window.onload = function () {

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


  const page = document.querySelector('.page'),
    content = document.querySelector('.content'),
    edit = content.querySelector('.profile__edit-button'),
    add = content.querySelector('.profile__add-button'),
    profName = content.querySelector('.profile__name'),
    profDesc = content.querySelector('.profile__description'),
    elements = content.querySelector('.elements'),
    elementsChildren = Array.from(elements.children);

  loadCards();
  edit.addEventListener('click', callEditPopUp);
  add.addEventListener('click', callAddPopUp);

  //Загружаю исходные карточки при загрузке страницы
  function loadCards() {
    const cardTemplate = document.querySelector('#element').content;

    initialCards.forEach(item => {
      const cardContent = cardTemplate.cloneNode(true),
        like = cardContent.querySelector('.element__icon'),
        del = cardContent.querySelector('.element__del'),
        cardPhoto = cardContent.querySelector('.element__photo');

      cardContent.querySelector('.element__photo').src = item.link;
      cardContent.querySelector('.element__photo').alt = item.name;
      cardContent.querySelector('.element__name').textContent = item.name;

      del.addEventListener('click', deleteButton);
      like.addEventListener('click', likedIcon);
      cardPhoto.addEventListener('click', openImagePopUp);
      elements.append(cardContent);
    });
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

  //Функция закрытия попапа
  function closePopUp(popUp) {
    if (!popUp.classList.contains('pop-up_opened')) {
      popUp.classList.add('pop-up_opened');
      popUp.remove();
    }
  }

  //Функция, передающая closePopUp требуемый попап для закрытия
  function closeButton(evt) {
    if (evt.target.closest('.pop-up')) closePopUp(evt.target.closest('.pop-up'));
    if (evt.target.closest('.image-popup')) closePopUp(evt.target.closest('.image-popup'));
  }

  //Функция реакции на нажатие кнопки "сохранить" на попапе редактирования
  function editSubmit(popUp) {
    const popName = popUp.querySelector('.pop-up__input_name'),
      popDesc = popUp.querySelector('.pop-up__input_desc');

    //Проверка на заполненность данных
    if (popName.value === '' || popDesc.value === '') {
      return 0;
    } else {
      profName.textContent = popName.value;
      profDesc.textContent = popDesc.value;
    }
  }

  //Функция реакции на нажатие кнопки "создать" на попапе добавления карточек
  function addSubmit(popUp) {
    const addLink = popUp.querySelector('.pop-up__input_desc'),
      addName = popUp.querySelector('.pop-up__input_name'),
      cardTemplate = document.querySelector('#element').content,
      cardContent = cardTemplate.cloneNode(true),
      elementPhoto = cardContent.querySelector('.element__photo'),
      elementName = cardContent.querySelector('.element__name'),
      like = cardContent.querySelector('.element__icon'),
      del = cardContent.querySelector('.element__del');

    //Проверка на заполненность данных
    if (addLink.value === '' || addName.value === '') {
      return 0;
    } else {
      elementPhoto.src = addLink.value;
      elementPhoto.alt = addName.value;
      elementName.textContent = addName.value;
      elementPhoto.addEventListener('click', openImagePopUp);
      del.addEventListener('click', deleteButton);
      like.addEventListener('click', likedIcon);
      elements.prepend(cardContent);
    }
  }

  //Функция, реагирующая на нажатие кнопки на попапе и передающая требуемый попап функциям editSubmit/addSubmit
  function formSubmitHandler(evt) {
    evt.preventDefault();
    const evtButton = evt.target.querySelector('.pop-up__button'),
      popUp = evtButton.closest('.pop-up');

    if (evtButton.textContent === 'Сохранить') {
      editSubmit(popUp);
    } else addSubmit(popUp);

    closePopUp(popUp);
  }

  //Открытие попапа редактирования
  function callEditPopUp() {
    const editTemplate = document.querySelector('#pop-up').content,
      editPopUp = editTemplate.cloneNode(true),
      pop = editPopUp.querySelector('.pop-up'),
      popName = editPopUp.querySelector('.pop-up__input_name'),
      popDesc = editPopUp.querySelector('.pop-up__input_desc'),
      close = editPopUp.querySelector('.pop-up__close-button'),
      form = editPopUp.querySelector('.pop-up__form');

    page.before(editPopUp);

    if (pop.classList.contains('pop-up_opened')) {
      pop.classList.remove('pop-up_opened');
      popName.value = profName.textContent;
      popDesc.value = profDesc.textContent;
    }

    close.addEventListener('click', closeButton);
    form.addEventListener('submit', formSubmitHandler);
  }

  //Открытие попапа добавления карточек
  function callAddPopUp() {
    const addTemplate = document.querySelector('#pop-up').content,
      addPopUp = addTemplate.cloneNode(true),
      add = addPopUp.querySelector('.pop-up'),
      addTitle = addPopUp.querySelector('.pop-up__form-title'),
      addName = addPopUp.querySelector('.pop-up__input_name'),
      addLink = addPopUp.querySelector('.pop-up__input_desc'),
      close = addPopUp.querySelector('.pop-up__close-button'),
      addButton = addPopUp.querySelector('.pop-up__button'),
      form = addPopUp.querySelector('.pop-up__form');

    addTitle.textContent = 'Новое место';
    addName.placeholder = 'Название';
    addLink.placeholder = 'Ссылка на картинку';
    addButton.textContent = 'Создать';

    page.before(addPopUp);

    if (add.classList.contains('pop-up_opened')) {
      add.classList.remove('pop-up_opened');
    }

    close.addEventListener('click', closeButton);
    form.addEventListener('submit', formSubmitHandler);
  }

  //Функция открытия попапа изображения
  function openImagePopUp(card) {
    const imagePopUpTemplate = document.querySelector('#image-popup').content,
      imagePopUpContent = imagePopUpTemplate.cloneNode(true),
      imagePopUp = imagePopUpContent.querySelector('.image-popup'),
      imagePopUpClose = imagePopUpContent.querySelector('.image-popup__close-button'),
      image = imagePopUpContent.querySelector('.image-popup__image'),
      name = imagePopUpContent.querySelector('.image-popup__name'),
      element = card.target.closest('.element');

    if (imagePopUp.classList.contains('pop-up_opened')) {
      imagePopUp.classList.remove('pop-up_opened');
      image.src = element.querySelector('.element__photo').src;
      name.textContent = element.querySelector('.element__name').textContent;
      page.before(imagePopUpContent);
    }

    imagePopUpClose.addEventListener('click', closeButton);
  }
}
