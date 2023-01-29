import { Card, placesTemplate } from "./Card.js";

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
const submitCardForm = cardFormElement.querySelector(".popup__button");
const inputsCardForm = Array.from(
  cardFormElement.querySelectorAll(".popup__input")
);
const cardForm = cardFormElement.querySelector(".popup__form");

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
  new Card(nameEl.value, linkEl.value, placesTemplate);
  closePopup(cardFormElement);
  evt.target.reset();
}

cardFormElement.addEventListener("submit", handleCardFormSubmit);
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
profileButton.addEventListener("click", () => {
  openPopup(formEditProfile);
});

buttonAddCard.addEventListener("click", () => {
  cardForm.reset();
  openPopup(cardFormElement);
});

buttonCloseEditProfilePopup.addEventListener("click", () => {
  closePopup(formEditProfile);
});

buttonCloseAddCardPopup.addEventListener("click", () => {
  closePopup(cardFormElement);
});
