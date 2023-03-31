export const nameInput = document.querySelector("#name");
export const jobInput = document.querySelector("#job");
export const profileButton = document.querySelector("#profile_edit");
export const cardFormElement = document.querySelector("#card_popup");
export const buttonAddCard = document.querySelector("#open_pop_up");
export const photoExpand = document.querySelector("#photo_popup");
export const inputsCardForm = Array.from(cardFormElement.querySelectorAll(".popup__input"));
export const cardForm = document.querySelector(".popup__form_card");
export const profileForm = document.querySelector(".popup__form_profile");
export const avatarForm = document.querySelector(".popup__form_avatar");
export const changeAvatar = document.querySelector(".profile__avatar-button");
export const profileAvatar = document.querySelector(".profile__avatar");

export const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
