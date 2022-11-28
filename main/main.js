// Находим форму в DOM
let formElement = document.querySelector(".pop_up");
// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector("#EditName");
// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector("#EditJob");
let profileButton = document.querySelector(".profile__edit") 
let popUpClose = document.querySelector(".pop_up__close")
 // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function openPupUp (evt){
    formElement.style.display = "block";
}

function closePupUp (evt) {
    formElement.style.display = "none";
}

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
    // let hello = "Привет";                       // О том, как это делать, расскажем позже.
    let nameTitle = document.querySelector(".profile__title");
    nameTitle.textContent = nameInput.value;
    // nameInput.value = nameTitle;
    let jobsubtitle = document.querySelector(".profile__subtitle");
    jobsubtitle.textContent = jobInput.value;
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    console.log(nameTitle);
    console.log(nameInput.value)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
profileButton.addEventListener('click', openPupUp);
popUpClose.addEventListener('click', closePupUp);

