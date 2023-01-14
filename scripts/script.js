const formEditProfile = document.querySelector("#profile_popup");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const profileButton = document.querySelector("#profile_edit");
const buttonCloseEditProfilePopup = document.querySelector("#popup_close");
const nameTitle = document.querySelector("#profile_title");
const jobSubtitle = document.querySelector("#profile_subtitle");
const cardsContainer = document.querySelector("#places_list");
const cardFormElement = document.querySelector("#card_popup");
const buttonAddCard = document.querySelector("#open_pop_up");
const photoExpand = document.querySelector("#photo_popup");
const photoExpandImg = document.querySelector("#expand_photo");
const photoExpandTitle = document.querySelector("#expand_title");
const buttonCloseImagePopup = document.querySelector("#close-photo");
const placesTemplate = document.querySelector("#places").content;
const buttonCloseAddCardPopup = document.querySelector("#close_card-button");
const nameEl = document.querySelector("#place");
const linkEl = document.querySelector("#photo");
const submitCardForm = cardFormElement.querySelector('.popup__button');
const inputsCardForm = Array.from(cardFormElement.querySelectorAll('.popup__input'));
const cardForm = cardFormElement.querySelector('.popup__form');
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

function createCard(title, imageLink) {
  const cardElement = placesTemplate.cloneNode(true);
  const image = cardElement.querySelector("#card_image");
  const name = cardElement.querySelector("#card_title");
  const likeButton = cardElement.querySelector("#card__like-button");
  const deleteButton = cardElement.querySelector("#card__delete-photo");
  image.src = imageLink;
  image.alt = title;
  name.textContent = title;
  image.addEventListener("click", openImagePopup);
  likeButton.addEventListener("click", handleLikeClick);
  deleteButton.addEventListener("click", removeCard);
  return cardElement;
}

initialCards.reverse().forEach(addCard);

function addCard(initialCard) {
  const newCard = createCard(initialCard.name, initialCard.link);
  cardsContainer.prepend(newCard);
}

function removeCard(evt) {
  evt.target.closest("#places_item").remove();
}

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

function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("mousedown", closeByClick);
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", closeByEsc);
  popup.removeEventListener("mousedown", closeByClick);
}

function handleLikeClick(evt) {
  const button = evt.target;
  if (button.classList.contains("card__like-button_black")) {
    evt.target.classList.remove("card__like-button_black");
  } else {
    evt.target.classList.add("card__like-button_black");
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  jobSubtitle.textContent = jobInput.value;
  closePopup(formEditProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  addCard({ name: nameEl.value, link: linkEl.value });
  closePopup(cardFormElement);
  evt.target.reset();
}

function openImagePopup(evt) {
  photoExpandImg.src = evt.target.src;
  photoExpandImg.alt = evt.target.textContent;
  photoExpandTitle.textContent = evt.target.alt;
  openPopup(photoExpand);
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
cardFormElement.addEventListener("submit", handleCardFormSubmit);
profileButton.addEventListener("click", () => {
  openPopup(formEditProfile);
});

buttonAddCard.addEventListener("click", () => { 
  cardForm.reset();
  openPopup(cardFormElement);
  toggleButtonState(inputsCardForm, submitCardForm, configValidation);
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
enableValidation(configValidation);