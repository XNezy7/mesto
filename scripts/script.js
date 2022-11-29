let formElement = document.querySelector(".popup");
let nameInput = document.querySelector("#EditName");
let jobInput = document.querySelector("#EditJob");
let profileButton = document.querySelector(".profile__edit")
let popUpClose = document.querySelector(".popup__close")
function openPupUp(evt) {
    formElement.style.display = "block";
}

function closePupUp(evt) {
    formElement.style.display = "none";
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    let nameTitle = document.querySelector(".profile__title");
    nameTitle.textContent = nameInput.value;
    let jobsubtitle = document.querySelector(".profile__subtitle");
    jobsubtitle.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
profileButton.addEventListener('click', openPupUp);
popUpClose.addEventListener('click', closePupUp);

