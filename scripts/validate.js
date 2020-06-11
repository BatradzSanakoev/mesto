//Объект параметров валидации
const validObj = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_inactive',
  inputErrorClass: 'pop-up__input_type-error',
  errorClass: 'pop-up__input_error-active'
};

//Функция валидации формы
const enableValidation = validObj => {
  const formList = Array.from(document.querySelectorAll(validObj.formSelector)); //Получаем массив всех форм

  formList.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(validObj.inputSelector)), //Получаем массив всех инпутов
      submitButton = formElement.querySelector(validObj.submitButtonSelector);

    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    toggleButtonState(inputList, submitButton, validObj.inactiveButtonClass); //Блокируем кнопку отправки формы при запуске попапа

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, inputElement.validationMessage, validObj.inputErrorClass, validObj.errorClass); //Проверяем валидность введенных данных
        toggleButtonState(inputList, submitButton, validObj.inactiveButtonClass); //Блокировка/разблокировка кнопки
      });
      hideInputError(formElement, inputElement, validObj.inputErrorClass, validObj.errorClass); //скрываем тексты ошибок при запуске валидации
    });
  });
};

//Функция проверки полей ввода формы
const checkInputValidity = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass);
  else hideInputError(formElement, inputElement, inputErrorClass, errorClass);
};

//Функция показа текста ошибки
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//Функция скрытия текста ошибки
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Функция блокировки/разблокировки кнопки отправки формы
const toggleButtonState = (inputList, buttonElement, buttonError) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(buttonError);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(buttonError);
    buttonElement.removeAttribute('disabled', true);
  }
};

//Функция проверки валидности введенных данных для функции блокировки кнопки
const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const openPopUpValidate = popUp => {
  const inputList = Array.from(popUp.querySelector(validObj.formSelector).querySelectorAll(validObj.inputSelector));
  inputList.forEach(inputElement => {
    hideInputError(popUp.querySelector(validObj.formSelector), inputElement, validObj.inputErrorClass, validObj.errorClass);
    toggleButtonState(inputList, popUp.querySelector(validObj.submitButtonSelector), validObj.inactiveButtonClass);
  });
};
