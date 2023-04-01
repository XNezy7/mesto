import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._inputList = this.popup.querySelectorAll(".popup__input");
    this._form = this.popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__button");
    this._submitHandler = submitHandler;
    this._submitForm = this._submitForm.bind(this);
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((item) => {
      values[item.name] = item.value;
    });
    return values;
  }

  _submitForm(event) {
    event.preventDefault();
    this._submitHandler(this._getInputValues(), this._submitButton);
  }

  close(){
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitForm);
  }
}
