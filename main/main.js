// Находим форму в DOM
let formElement = document.querySelector(".pop_up");
// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector("#EditName");
// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector("#EditJob");
 // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    let nameTitle = document.querySelector(".profile__title");
    nameTitle.textContent = "Привет";
    nameInput.value = 
    
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    console.log(nameTitle);
    console.log(nameInput .value)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

    