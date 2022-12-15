const formElement = document.querySelector(".popup");
const nameInput = document.querySelector("#Edit_type_name");
const jobInput = document.querySelector("#Edit_type_job");
const profileButton = document.querySelector(".profile__edit");
const popUpClose = document.querySelector(".popup__close");
const nameTitle = document.querySelector(".profile__title");
const jobsubtitle = document.querySelector(".profile__subtitle");
const placesList = document.querySelector(".places__list");
const cardFormElement = document.querySelector("#cardPopup");
const addCardButton = document.querySelector('#open_pop_up');
const expandForm = document.querySelector('#photoPopup');
const expandFormImg = document.querySelector('#expandPhoto');
const expandFormTitle = document.querySelector('#expandTitle');
const closeExpandForm = document.querySelector('#closePhoto');

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

function createCard(initialCard) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const likeButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    div.classList.add("card__description");
    h2.classList.add("card__title");
    likeButton.classList.add("card__like-button");
    img.classList.add("card__image");
    li.classList.add("places__item", "card");
    deleteButton.classList.add("card__delete-photo");

    img.addEventListener('click', expandPhoto);

    likeButton.attributes.type = "button";
    likeButton.addEventListener('click', like);

    deleteButton.attributes.type = "button";
    deleteButton.addEventListener('click', removeCard);

    h2.textContent = initialCard.name;
    img.src = initialCard.link;
    img.alt = initialCard.name;
    
    div.appendChild(h2);
    div.appendChild(likeButton);
    li.appendChild(deleteButton);
    li.appendChild(img);
    li.appendChild(div);
    placesList.prepend(li);
}

initialCards.forEach(createCard)


function removeCard(evt) {
    evt.target.parentElement.remove()
}

function openPupUp(popup) {
    popup.classList.add("popup_active");
    
}

function closePupUp(popup) {
    popup.classList.remove("popup_active");
}

function like(evt) {
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

function cardFormSubmit(evt) {
    const name = document.querySelector("#Edit_type_name_place").value;
    const link = document.querySelector("#Edit_type_id").value;
    createCard({name, link});
    closePupUp(cardFormElement);
}

function expandPhoto(evt) {
    expandFormImg.src = evt.target.src;
    expandFormTitle.textContent = evt.target.alt;
    openPupUp(expandForm);
}


formElement.addEventListener('submit', formSubmitHandler);
profileButton.addEventListener('click', () => {openPupUp(formElement); } );
addCardButton.addEventListener('click', () => {openPupUp(cardFormElement); } );
cardFormElement.addEventListener('submit', cardFormSubmit);
popUpClose.addEventListener('click', () =>{closePupUp(formElement);});
closeCardButton.addEventListener('click', () => {closePupUp(cardFormElement);});
closeExpandForm.addEventListener('click', () => {closePupUp(expandForm)});
