import { openPopup, closePopup } from "./index.js";

const photoExpand = document.querySelector("#photo_popup");
const photoExpandImg = document.querySelector("#expand_photo");
const photoExpandTitle = document.querySelector("#expand_title");
const buttonCloseImagePopup = document.querySelector("#close-photo");

export const placesTemplate = document.querySelector("#places").content;
const cardsContainer = document.querySelector("#places_list");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export class Card {
  constructor(title, imageLink, template) {
    this.template = template;
    this.addCard({ name: title, link: imageLink });
  }

  _createCard(title, imageLink) {
    const cardElement = this.template.cloneNode(true);
    const image = cardElement.querySelector("#card_image");
    const name = cardElement.querySelector("#card_title");
    const likeButton = cardElement.querySelector("#card__like-button");
    const deleteButton = cardElement.querySelector("#card__delete-photo");
    image.src = imageLink;
    image.alt = title;
    name.textContent = title;
    image.addEventListener("click", this._openImagePopup);
    likeButton.addEventListener("click", this._handleLikeClick);
    deleteButton.addEventListener("click", this._removeCard);
    return cardElement;
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

  addCard(initialCard) {
    const newCard = this._createCard(initialCard.name, initialCard.link);
    cardsContainer.prepend(newCard);
  }
}

buttonCloseImagePopup.addEventListener("click", () => {
  closePopup(photoExpand);
});

initialCards
  .reverse()
  .forEach((card) => new Card(card.name, card.link, placesTemplate));
