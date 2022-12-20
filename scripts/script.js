const formElement = document.querySelector("#popup");
const nameInput = document.querySelector("#Edit_type_name");
const jobInput = document.querySelector("#Edit_type_job");
const profileButton = document.querySelector("#profile_edit");
const popUpClose = document.querySelector("#popup_close");
const nameTitle = document.querySelector("#profile_title");
const jobsubtitle = document.querySelector("#profile_subtitle");
const placesList = document.querySelector("#places_list");
const cardFormElement = document.querySelector("#cardPopup");
const addCardButton = document.querySelector('#open_pop_up');
const expandForm = document.querySelector('#photoPopup');
const expandFormImg = document.querySelector('#expandPhoto');
const expandFormTitle = document.querySelector('#expandTitle');
const closeExpandForm = document.querySelector('#closePhoto');
const placesTemplate = document.querySelector('#places').content; 
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
    const userElement = placesTemplate.cloneNode(true);
    const image = userElement.querySelector("#card_image");
    const name = userElement.querySelector("#card_title");
    const likeButton = userElement.querySelector("#card__like-button");
    const deleteButton = userElement.querySelector("#card__delete-photo");
    image.src = imageLink;
    name.textContent = title;
    likeButton.addEventListener('click', cardLikeButton);
    deleteButton.addEventListener('click', removeCard);
    return userElement;
}
    initialCards.reverse().forEach(addCard);

function addCard(initialCard) {
    const newCard = createCard(initialCard.name, initialCard.link);
    placesList.append(newCard);
}


function removeCard(evt) {
    evt.target.parentElement.remove()
}

function openPupUp(popup) {
    popup.classList.add("popup_active");
}

function closePupUp(popup) {
    popup.classList.remove("popup_active");
}

function cardLikeButton(evt) {
    const button = evt.target;
    if (button.classList.contains("card__like-button_black")) {
        evt.target.classList.remove("card__like-button_black");
    } else {
        evt.target.classList.add("card__like-button_black");
    }
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameTitle.textContent = nameInput.value;
    jobsubtitle.textContent = jobInput.value;
    closePupUp(formElement);
}

function cardFormSubmitHandler(evt) {
    const name = document.querySelector("#Edit_type_name_place").value;
    const link = document.querySelector("#Edit_type_id").value;
    createCard({name, link});
    closePupUp(cardFormElement);
}

function expandPhotoButton(evt) {
    expandFormImg.src = evt.target.src;
    expandFormTitle.textContent = evt.target.alt;
    openPupUp(expandForm);
}


formElement.addEventListener('submit', formSubmitHandler);
profileButton.addEventListener('click', () => {openPupUp(formElement); } );
addCardButton.addEventListener('click', () => {openPupUp(cardFormElement); } );
cardFormElement.addEventListener('submit', cardFormSubmitHandler);
popUpClose.addEventListener('click', () =>{closePupUp(formElement);});
closeCardButton.addEventListener('click', () => {closePupUp(cardFormElement);});
closeExpandForm.addEventListener('click', () => {closePupUp(expandForm)});