import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
    this._inputList = this.popup.querySelectorAll(".popup__input");
    this._form = this.popup.querySelector(".popup__form");
    this._submitForm = this._submitForm.bind(this);
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((item) => {
      values[item.name] = item.value;
    });
    return values;
  }

  _submitForm(evt){
    evt.preventDefault();
    this._callback(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitForm);
  }

  close() {
    super.close();
  }
}
