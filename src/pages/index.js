import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const formEditProfile = document.querySelector("#profile_popup");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const profileButton = document.querySelector("#profile_edit");
const nameTitle = document.querySelector("#profile_title");
const jobSubtitle = document.querySelector("#profile_subtitle");
const cardFormElement = document.querySelector("#card_popup");
const buttonAddCard = document.querySelector("#open_pop_up");
const nameEl = document.querySelector("#place");
const linkEl = document.querySelector("#photo");
const placesTemplate = document.querySelector("#places").content;
const cardsContainer = document.querySelector("#places_list");
export const photoExpand = document.querySelector("#photo_popup");
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

// function closeByClick(evt) {
//   if (evt.target.classList.contains("popup_active")) {
//     closePopup(evt.target);
//   }
// }

function createCard(item) {
  const newCard = new Card(item.name, item.link, placesTemplate).createCard();
  container.addItem(newCard);
}

const container = new Section(
  { items: initialCards, renderer: createCard },
  "#places_list"
);
container.renderer();

const cardPopup = new PopupWithForm("#card_popup", handleCardFormSubmit);
const profilePopup = new PopupWithForm("#profile_popup", handleProfileFormSubmit);

const userInfo = new UserInfo({
  name: "#profile_title",
  job: "#profile_subtitle"
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userInfo.setUserInfo({name:nameInput.value, job:jobInput.value})
  profilePopup.close();
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const item = { name: nameEl.value, link: linkEl.value };
  createCard(item);
  cardPopup.close();
  evt.target.reset();
}

profileButton.addEventListener("click", () => {
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profilePopup.open();
});

buttonAddCard.addEventListener("click", () => {
  cardForm.reset();
  cardPopup.open();
  formCard.toggleButtonState();
});

const formCard = new FormValidator(configValidation, cardForm);
formCard.enableValidation();
const formProfile = new FormValidator(configValidation, profileForm);
formProfile.enableValidation();
