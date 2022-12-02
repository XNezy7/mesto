let formElement = document.querySelector(".popup");
let nameInput = document.querySelector("#Edit_type_name");
let jobInput = document.querySelector("#Edit_type_job");
let profileButton = document.querySelector(".profile__edit");
let popUpClose = document.querySelector(".popup__close");
let nameTitle = document.querySelector(".profile__title");
let jobsubtitle = document.querySelector(".profile__subtitle");


function openPupUp(evt) {
    formElement.classList.add("popup_active");
}

function closePupUp(evt) {
    formElement.classList.remove("popup_active");
}


function formSubmitHandler(evt) {
    evt.preventDefault();
    nameTitle.textContent = nameInput.value;
    jobsubtitle.textContent = jobInput.value;
    closePupUp(evt);
}

formElement.addEventListener('submit', formSubmitHandler);
profileButton.addEventListener('click', openPupUp);
popUpClose.addEventListener('click', closePupUp);

