import {openPopup,photoExpand} from "./index.js";

const photoExpandImg = document.querySelector("#expand_photo");
const photoExpandTitle = document.querySelector("#expand_title");

export class Card {
  constructor(title, imageLink, template) {
    this.title = title;
    this.link = imageLink;
    this.template = template;
  }

  createCard() {
    const cardElement = this.template.cloneNode(true);
    const image = cardElement.querySelector("#card_image");
    const name = cardElement.querySelector("#card_title");
    const likeButton = cardElement.querySelector("#card__like-button");
    const deleteButton = cardElement.querySelector("#card__delete-photo");
    image.src = this.link;
    image.alt = this.title;
    name.textContent = this.title;
    this._addEventListeners(image, likeButton, deleteButton);
    return cardElement;
  }

  _addEventListeners(image, likeButton, deleteButton) {
    image.addEventListener("click", this._openImagePopup);
    likeButton.addEventListener("click", this._handleLikeClick);
    deleteButton.addEventListener("click", this._removeCard);
  }

  _openImagePopup(evt) {
    photoExpandImg.src = evt.target.src;
    photoExpandImg.alt = evt.target.textContent;
    photoExpandTitle.textContent = evt.target.alt;
    openPopup(photoExpand);
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

