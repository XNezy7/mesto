import { Card } from "./Card.js";

import FormValidator from "./FormValidator.js";

const formEditProfile = document.querySelector("#profile_popup");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const profileButton = document.querySelector("#profile_edit");
const buttonCloseEditProfilePopup = document.querySelector("#popup_close");
const nameTitle = document.querySelector("#profile_title");
const jobSubtitle = document.querySelector("#profile_subtitle");
const cardFormElement = document.querySelector("#card_popup");
const buttonAddCard = document.querySelector("#open_pop_up");
const buttonCloseAddCardPopup = document.querySelector("#close_card-button");
const nameEl = document.querySelector("#place");
const linkEl = document.querySelector("#photo");
const placesTemplate = document.querySelector("#places").content;
const cardsContainer = document.querySelector("#places_list");
export const photoExpand = document.querySelector("#photo_popup");
const buttonCloseImagePopup = document.querySelector("#close-photo");
const submitCardForm = cardFormElement.querySelector(".popup__button");
export const inputsCardForm = Array.from(         
  cardFormElement.querySelectorAll(".popup__input")
);
const cardForm = document.querySelector(".popup__form_card");
const profileForm = document.querySelector(".popup__form_profile");

const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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

initialCards.reverse().forEach((item) =>{
  addCard(createCard(item));
  // addCard(card);
  // createCard(item);
});

function closeByClick(evt) {
  if (evt.target.classList.contains("popup_active")) {
    closePopup(evt.target);
  }
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_active");
    closePopup(openedPopup);
  }
}

function addCard(newCard) {
  cardsContainer.prepend(newCard);
}

function createCard(item) {
  const newCard = new Card(item.name, item.link, placesTemplate).createCard();
  return newCard;
}

export function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("mousedown", closeByClick);
}

export function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", closeByEsc);
  popup.removeEventListener("mousedown", closeByClick);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobSubtitle.textContent = jobInput.value;
  closePopup(formEditProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const item = ({ name: nameEl.value, link: linkEl.value });
  addCard(createCard(item))
  closePopup(cardFormElement);
  evt.target.reset();
}

cardFormElement.addEventListener("submit", handleCardFormSubmit);
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

profileButton.addEventListener("click", () => {
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobSubtitle.textContent;
  openPopup(formEditProfile);
});

buttonAddCard.addEventListener("click", () => {
  formCard.enableValidation();
  cardForm.reset();
  openPopup(cardFormElement);
});

buttonCloseEditProfilePopup.addEventListener("click", () => {
  closePopup(formEditProfile);
});

buttonCloseAddCardPopup.addEventListener("click", () => {
  closePopup(cardFormElement);
});
buttonCloseImagePopup.addEventListener("click", () => {
  closePopup(photoExpand);
});

const formCard = new FormValidator(configValidation, cardForm);
formCard.enableValidation();
const formProfile = new FormValidator(configValidation, profileForm);
formProfile.enableValidation();
