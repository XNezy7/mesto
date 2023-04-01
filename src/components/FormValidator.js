export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;

    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );

    this._inputListError = Array.from(
      this._form.querySelectorAll(this._config.inputErrorClass)
    );

    this._buttonSubmit = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }
  
  clearForm() {
    this._form.reset();
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
      this._buttonSubmit.disabled = false;
    }
  }

  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
