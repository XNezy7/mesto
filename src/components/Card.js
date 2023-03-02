export default class Card {
  constructor(title, imageLink, template, callback) {
    this.title = title;
    this.link = imageLink;
    this.template = template;
    this._callback = callback;
  }

  createCard() {
    this.cardElement = this.template.cloneNode(true);
    this.image = this.cardElement.querySelector("#card_image");
    this.name = this.cardElement.querySelector("#card_title");
    this.likeButton = this.cardElement.querySelector("#card__like-button");
    this.deleteButton = this.cardElement.querySelector("#card__delete-photo");
    this.image.src = this.link;
    this.image.alt = this.title;
    this.name.textContent = this.title;
    this._addEventListeners(this.image, this.likeButton, this.deleteButton);
    return this.cardElement;
  }

  _addEventListeners() {
    this.image.addEventListener("click", () => this._openImagePopup());
    this.likeButton.addEventListener("click", this._handleLikeClick);
    this.deleteButton.addEventListener("click", this._removeCard);
  }

  _openImagePopup() {
    this._callback(this.link, this.title);
  }

  
  _handleLikeClick(evt) {
    const button = evt.target;
    if (button.classList.contains("card__like-button_black")) {
      evt.target.classList.remove("card__like-button_black");
    } else {
      evt.target.classList.add("card__like-button_black");
    }
  }

  _removeCard(evt) {
    evt.target.closest("#places_item").remove();
  }
}
