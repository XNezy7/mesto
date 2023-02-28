import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
    this._inputList = this.popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    let values = {};
    this._inputList.forEach((item) => {
      values[item.name] = item.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    const form = this.popup.querySelector(".popup__form");
    form.addEventListener("submit", (evt) => this._callback(evt));
  }

  close() {
    super.close();
  }
}
