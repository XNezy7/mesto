let formElement = document.querySelector(".popup");
let nameInput = document.querySelector("#Edit_type_name");
let jobInput = document.querySelector("#Edit_type_job");
let profileButton = document.querySelector(".profile__edit");
let popUpClose = document.querySelector(".popup__close");
let nameTitle = document.querySelector(".profile__title");
let jobsubtitle = document.querySelector(".profile__subtitle");
let placesList = document.querySelector(".places__list");
let cardFormElement = document.querySelector("#cardPopup");
let addCardButton = document.querySelector('#open_pop_up');
let closeCardButton = document.querySelector('#closeCardButton')

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        // img.src = document.createElement("")
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


function openPupUp() {
    formElement.classList.add("popup_active");
}

function openCardPupUp() {
    cardFormElement.classList.add("popup_active");
}

function closePupUp() {
    formElement.classList.remove("popup_active");
}

function closeCard() {
    cardFormElement.classList.remove("popup_active");
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
    closePupUp();
}

function cardFormSubmit(evt) {
    const name = document.querySelector("#Edit_type_name_place").value;
    const link = document.querySelector("#Edit_type_id").value;
    createCard({name, link});
    closeCard();
}

formElement.addEventListener('submit', formSubmitHandler);
profileButton.addEventListener('click', openPupUp);
addCardButton.addEventListener('click', openCardPupUp);
cardFormElement.addEventListener('submit', cardFormSubmit);
popUpClose.addEventListener('click', closePupUp);
closeCardButton.addEventListener('click', closeCard)
