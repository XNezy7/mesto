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
export const photoExpand = document.querySelector("#photo_popup");
export const inputsCardForm = Array.from(
  cardFormElement.querySelectorAll(".popup__input")
);
const cardForm = document.querySelector(".popup__form_card");
const profileForm = document.querySelector(".popup__form_profile");
const avatarForm = document.querySelector(".popup__form_avatar");
const changeAvatar = document.querySelector(".profile__avatar-button");
const profileAvatar = document.querySelector(".profile__avatar");

const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "a8ffb240-ff73-4a9e-8ad1-0029aba72e90",
    "Content-Type": "application/json",
  },
});

function changeButtonText(button, buttonText) {
  button.textContent = buttonText;
}

function openImagePopup(src, alt) {
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

function handleCardFormSubmit(value, submitButton) {
  const originalButtonText = submitButton.textContent;
  changeButtonText(submitButton, "Loading...");

  const newUserCard = {
    name: value.place,
    link: value.photo,
  };

  api
    .addCard(newUserCard)
    .then((res) => {
      container.renderItem(res, userInfo.id);

      formCard.clearForm();
      cardPopup.close();
    })
    .catch((e) => console.log(e))
    .finally(() => changeButtonText(submitButton, originalButtonText));
}

function handleProfileFormSubmit(element, submitButton) {
  const originalButtonText = submitButton.textContent;
  changeButtonText(submitButton, "Loading...");
  
  api
    .setUserInfo(element.Name, element.Work)

    .then((res) => {
      userInfo.setUserInfo({ name: res.name, about: res.about });
    })
    .catch((e) => console.log("Delete Error: ", e))
    .finally(() => changeButtonText(submitButton, originalButtonText));
}

function avatarSubmitHandler(value, submitButton) {
  const originalButtonText = submitButton.textContent;
  changeButtonText(submitButton, "Loading...");

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

function addCard(item, userID) {
  const newCard = createCard(item, userID);
  container.addItem(newCard);
}

function createCard(item, userID) {
  return new Card(
    item,
    {withTrash: "#placesWithTrash", withOutTrash: "#placesWithOutTrash" },
    openImagePopup,
    openDeletePopup,
    clickLike,
    userID
  ).createCard();
}

const container = new Section(addCard, "#places_list");

const avatarPopup = new PopupWithForm("#popup_avatar", avatarSubmitHandler);
avatarPopup.setEventListeners();
const confirmPopup = new PopupConfirmDelete('#popup_delete', confirmPopupHandler);
confirmPopup.setEventListeners();
const cardPopup = new PopupWithForm("#card_popup", handleCardFormSubmit);
cardPopup.setEventListeners();
const profilePopup = new PopupWithForm(
  "#profile_popup",
  handleProfileFormSubmit
);
profilePopup.setEventListeners();
const photoPopup = new PopupWithImage("#photo_popup");
photoPopup.setEventListeners();


const userInfo = new UserInfo({
  name: "#profile_title",
  about: "#profile_subtitle"
});

profileButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
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
        element._handleLikeClick(updatedCard.likes.length);
      })
      .catch((err) => console.log("Remove Like Error: ", err));
  } else {
    api
      .addLike(elementId)
      .then((updatedCard) => {
        element._handleLikeClick(updatedCard.likes.length);
      })
      .catch((err) => console.log("Add Like Error: ", err));
  }
}

Promise.all([api.getInitialCards(), api.getUserInfo()]).then((res) => {
  const initialCards = res[0];
  const user = res[1];

  profileAvatar.src = user.avatar;
  userInfo.setUserInfo(user);
  userInfo.id = user._id;
  container.renderItems(initialCards, userInfo.id);
});

changeAvatar.addEventListener("click", () => {
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
