export default class Section{
    constructor(renderer, containerSelector){
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    renderItem(card, userID) {
        this._renderer(card, userID);
      }
    
    renderItems(initialCards, userID) {
      initialCards.forEach((card) => {
        this._renderer(card, userID);
        });
      }

    addItem(element){
        this._containerSelector.prepend(element);
    }

}