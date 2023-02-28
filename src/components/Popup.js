export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.popup = document.querySelector(popupSelector);
    this.closeButton = this.popup.querySelector(".popup__close");

    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeByClick = this._closeByClick.bind(this);
    this.setEventListeners();
  }

  open() {
    this.popup.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
    this.popup.addEventListener("mousedown", this._closeByClick);
  }

  close() {
    this.popup.classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEscClose);
    this.popup.removeEventListener("mousedown", this._closeByClick);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closeByClick(evt) {
    if (evt.target.classList.contains("popup_active")) {
      this.close();
    }
  }

  setEventListeners() {
    this.closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
