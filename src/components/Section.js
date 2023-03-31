export default class Section{
    constructor(renderer, container){
        this._renderer = renderer;
        this._container = document.querySelector(container);
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
        this._container.prepend(element);
    }

}