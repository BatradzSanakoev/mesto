import {openPopUp, imageName, image, imagePopUp} from './index.js';

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
