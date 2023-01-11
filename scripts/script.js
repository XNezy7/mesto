const formEditProfile = document.querySelector("#popup");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const profileButton = document.querySelector("#profile_edit");
const buttonCloseEditProfilePopup = document.querySelector("#popup_close");
const nameTitle = document.querySelector("#profile_title");
const jobsubtitle = document.querySelector("#profile_subtitle");
const placesList = document.querySelector("#places_list");
const cardFormElement = document.querySelector("#card_popup");
const addCardButton = document.querySelector('#open_pop_up')
const expandForm = document.querySelector('#photo_popup');
const expandFormImg = document.querySelector('#expand_photo');
const expandFormTitle = document.querySelector('#expand_title');
const buttonCloseImagePopup = document.querySelector('#close-photo');
const placesTemplate = document.querySelector('#places').content;
const buttonCloseAddCardPopup = document.querySelector('#close_card-button');
const nameEl = document.querySelector("#place");
const linkEl = document.querySelector("#photo");

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
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
    image.addEventListener('click', openImagePopup);
    likeButton.addEventListener('click', cardLikeButton);
    deleteButton.addEventListener('click', removeCard);
    return cardElement;
}

    initialCards.reverse().forEach(addCard);

function addCard(initialCard) {
    const newCard = createCard(initialCard.name, initialCard.link);
    placesList.prepend(newCard);
}

function removeCard(evt) {
    evt.target.parentElement.remove()
}

function closeByClick(evt) {
    if (evt.target.classList.contains('popup__form')) {
      const openedPopup = document.querySelector('.popup_active');
      closePopup(openedPopup);
    }
  }

function closeByEsc(evt){
    if (evt.key === 'Escape'){
        const openedPopup = document.querySelector('.popup_active');
        closePopup(openedPopup);
    }
}

function openPopup(popup) {
    popup.classList.add("popup_active");
    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('mousedown', closeByClick);
}

function closePopup(popup) {
    popup.classList.remove("popup_active");
    document.removeEventListener('keydown', closeByEsc);
    document.removeEventListener('mousedown', closeByClick);
}



function cardLikeButton(evt) {
    const button = evt.target;
    if (button.classList.contains("card__like-button_black")) {
        evt.target.classList.remove("card__like-button_black");
    } else {
        evt.target.classList.add("card__like-button_black");
    }
}

function submitEditProfileForm(evt) {
    evt.preventDefault();
    nameTitle.textContent = nameInput.value;
    jobsubtitle.textContent = jobInput.value;
    closePopup(formEditProfile);
}

function cardFormSubmitHandler(evt) {
    evt.preventDefault();
    addCard({name: nameEl.value, link: linkEl.value});
    closePopup(cardFormElement);
}

function openImagePopup(evt) {
    expandFormImg.src = evt.target.src;
    expandFormImg.alt = evt.target.textContent;
    expandFormTitle.textContent = evt.target.alt;
    openPopup(expandForm);
}

formEditProfile.addEventListener('submit', submitEditProfileForm);
cardFormElement.addEventListener('submit', cardFormSubmitHandler);
profileButton.addEventListener('click', () => {openPopup(formEditProfile); } );
addCardButton.addEventListener('click', () => {openPopup(cardFormElement); } );
buttonCloseEditProfilePopup.addEventListener('click', () =>{closePopup(formEditProfile);});
buttonCloseAddCardPopup.addEventListener('click', () => {closePopup(cardFormElement);});
buttonCloseImagePopup.addEventListener('click', () => {closePopup(expandForm)});
