export default class FormValidator {
  constructor(options, formElement) {
    this._formElement = formElement;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
  }

  enableValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)), //Получаем массив всех инпутов
      submitButton = this._formElement.querySelector(this._submitButtonSelector);

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._toggleButtonState(inputList, submitButton, this._inactiveButtonClass); //Блокируем кнопку отправки формы при запуске попапа

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._formElement, inputElement, inputElement.validationMessage, this._inputErrorClass, this._errorClass); //Проверяем валидность введенных данных
        this._toggleButtonState(inputList, submitButton, this._inactiveButtonClass); //Блокировка/разблокировка кнопки
      });
      this._hideInputError(this._formElement, inputElement, this._inputErrorClass, this._errorClass); //скрываем тексты ошибок при запуске валидации
    });
  }

  resetValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)), //Получаем массив всех инпутов
      submitButton = this._formElement.querySelector(this._submitButtonSelector);

    this._formElement.reset();
    this._toggleButtonState(inputList, submitButton, this._inactiveButtonClass);

    inputList.forEach(inputElement => {
      this._hideInputError(this._formElement, inputElement, this._inputErrorClass, this._errorClass);
    });
  }

  //Функция проверки полей ввода формы
  _checkInputValidity(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) this._showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass);
    else this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }

  //Функция показа текста ошибки
  _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  //Функция скрытия текста ошибки
  _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  //Функция блокировки/разблокировки кнопки отправки формы
  _toggleButtonState(inputList, buttonElement, buttonError) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(buttonError);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(buttonError);
      buttonElement.removeAttribute('disabled');
    }
  }

  //Функция проверки валидности введенных данных для функции блокировки кнопки
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }
}
