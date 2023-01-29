const userNameInput = document.querySelector("#name");
const userJobInput = document.querySelector("#job");
const userPlaceInput = document.querySelector("#place");
const userLinkInput = document.querySelector("#photo");

const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

class Validate {
  constructor(config) {
    this.config = config;
    this.enableValidation(this.config);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.add(this.config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this.config.inputErrorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this.config.inputErrorClass);
  }

  _checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement);
    } else {
      this._showInputError(formElement, inputElement);
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this.config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      this.config.submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

    formElement.addEventListener("submit", () => {
      const buttonElement = formElement.querySelector(
        this.config.submitButtonSelector
      );
      buttonElement.classList.add(this.config.inactiveButtonClass);
      buttonElement.disabled = true;
    });
  }

  enableValidation({ formSelector }) {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  }
}

const form = new Validate(configValidation);
