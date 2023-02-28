import Popup from "./Popup";

const photoExpandImg = document.querySelector("#expand_photo");
const photoExpandTitle = document.querySelector("#expand_title");

export default class PopupWithImage extends Popup{
    open(name, link){
        super.open();
        
        photoExpandImg.src = link;
        photoExpandImg.alt = name;
        photoExpandTitle.textContent = name;
    }
}
