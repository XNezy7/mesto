import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "./index.css";

const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const profileButton = document.querySelector("#profile_edit");
const cardFormElement = document.querySelector("#card_popup");
const buttonAddCard = document.querySelector("#open_pop_up");
const placesTemplate = document.querySelector("#places").content;
export const photoExpand = document.querySelector("#photo_popup");
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
function openImagePopup(alt, src){
  photoPopup.open(src, alt);
}

function addCard(item){
  const newCard = createCard(item);
  container.addItem(newCard);
}

function createCard(item) {
  return new Card(item.name, item.link, placesTemplate, openImagePopup).createCard();
}

const container = new Section(
  { items: initialCards, renderer: addCard },
  "#places_list"
);
container.renderer();

const cardPopup = new PopupWithForm("#card_popup", handleCardFormSubmit);
cardPopup.setEventListeners();
const profilePopup = new PopupWithForm("#profile_popup", handleProfileFormSubmit);
profilePopup.setEventListeners();
const photoPopup = new PopupWithImage('#photo_popup');
photoPopup.setEventListeners();

const userInfo = new UserInfo({
  name: "#profile_title",
  job: "#profile_subtitle"
});

function handleProfileFormSubmit(value) {
  userInfo.setUserInfo({name:value.Name, job:value.Work})
  profilePopup.close();
}

function handleCardFormSubmit(value) {
  const item = {name:value.place, link: value.photo};
  addCard(item);
  cardPopup.close();
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
