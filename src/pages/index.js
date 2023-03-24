import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupConfirmDelete from "../components/PopupConfirmDelete.js";
import "./index.css";

const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const profileButton = document.querySelector("#profile_edit");
const cardFormElement = document.querySelector("#card_popup");
const buttonAddCard = document.querySelector("#open_pop_up");
const placesTemplate = document.querySelector(".places").content;
export const photoExpand = document.querySelector("#photo_popup");
export const inputsCardForm = Array.from(cardFormElement.querySelectorAll(".popup__input"));
const cardForm = document.querySelector(".popup__form_card");
const profileForm = document.querySelector(".popup__form_profile");
const avatarForm = document.querySelector(".popup__form_avatar");
const changeAvatar = document.querySelector('#profile__avatar-button');


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
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'a8ffb240-ff73-4a9e-8ad1-0029aba72e90',
    'Content-Type': 'application/json'
  }
}); 

function openImagePopup(alt, src){
  photoPopup.open(src, alt);
}

function openDeletePopup(element, elementID) {
  confirmPopup.open(element, elementID);
}

function confirmPopupHandler(element, elementID, submitButton) {
  const originalButtonText = submitButton.textContent;
  changeButtonText(submitButton, 'Loading...');
  api
    .removeCard(elementID)
    .then(() => {
      element.remove();
      this.close();
    })
    .catch((e) => console.log('Delete Error: ', e))
    .finally(() => changeButtonText(submitButton, originalButtonText));
}

function avatarSubmitHandler(value, submitButton) {
  const originalButtonText = submitButton.textContent;
  changeButtonText(submitButton, 'Loading...');

  api
    .setAvatar(value.inputAvatarUrl)
    .then((res) => {
      profileAvatar.src = res.avatar;

      formAvatar.clearForm();
      avatarPopup.close();
    })
    .catch((e) => console.log(e))
    .finally(() => changeButtonText(submitButton, originalButtonText));
}

function addCard(item, userID){
  const newCard = createCard(item, userID);
  container.addItem(newCard);
}

function createCard(item, userID) {
  return new Card(item, {withTrash: '#placesWithTrash', withOutTrash: '#placesWithOutTrash'}, openImagePopup, openDeletePopup, clickLike, userID).createCard();
}

const container = new Section(
  addCard,
  "#places_list"
);


const avatarPopup = new PopupWithForm('#popup_avatar', avatarSubmitHandler);
avatarPopup.setEventListeners();
// const confirmPopup = new PopupConfirmDelete('#popup_delete', confirmPopupHandler);
// confirmPopup.setEventListeners();
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

function clickLike(element, elementId, isLiked) {
  if (isLiked) {
    api
      .removeLike(elementId)
      .then((updatedCard) => {
        element.updateLikes(updatedCard.likes.length);
      })
      .catch((err) => console.log('Remove Like Error: ', err));
  } else {
    api
      .addLike(elementId)
      .then((updatedCard) => {
        element.updateLikes(updatedCard.likes.length);
      })
      .catch((err) => console.log('Add Like Error: ', err));
  }
}

Promise.all([
  api.getInitialCards(), 
  api.getUserInfo()

]).then((res) => {
  const initialCards = res[0]
  const user = res[1]
  userInfo.id = user._id
  container.renderItems(initialCards, userInfo.id) 
  
})

changegvatar.addEventListener('click', () => {
  formAvatar.clearForm();
  formAvatar.toggleButtonState();
  avatarPopup.open();
});

const formCard = new FormValidator(configValidation, cardForm);
formCard.enableValidation();
const formProfile = new FormValidator(configValidation, profileForm);
formProfile.enableValidation();
const formAvatar = new FormValidator(configValidation, avatarForm);
formAvatar.enableValidation();
