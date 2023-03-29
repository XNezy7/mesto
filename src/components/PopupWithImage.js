import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);

        this._photoExpandImg = this.popup.querySelector("#expand_photo");
        this._photoExpandTitle = this.popup.querySelector("#expand_title");
      }

    open(name, link){
        super.open();
        
        this._photoExpandImg.src = link;
        this._photoExpandImg.alt = name;
        this._photoExpandTitle.textContent = name;
    }
}