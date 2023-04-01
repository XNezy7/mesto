export default class Card {
  constructor(card, templateSelectors, openImagePopup, openDeletePopup, clickLike, userID) {
    this._title = card.name;
    this._url = card.link;
    this._likesArr = card.likes;
    this._likes = card.likes.length;
    this._id = card._id;
    this._ownerID = card.owner._id;
    this._templateSelectors = templateSelectors;
    this._openPopup = openImagePopup;
    this._openDeletePopup = openDeletePopup;
    this._clickLike = clickLike;
    this._userID = userID;
  }

  _getTemplate(templateSelector) {
    return document.querySelector(templateSelector).content.querySelector('.card').cloneNode(true);
  }

  _changeLike() {
    this._clickLike(this, this._id, this._isLiked);
  }

  handleLikeClick(count) {
    this._elementLikeCounter.textContent = count;
    this._elementLike.classList.toggle('card__like-button_black');
    this._isLiked = !this._isLiked;
  }

  _removeCard() {
    this._openDeletePopup(this._element, this._id);
  }

  _openImagePopup() {
    this._openPopup(this._title, this._url);
  }

  _addEventListeners() {
    this._elementLike.addEventListener('click', () => this._changeLike());
    if (this._isOwner) {
      this._elementDelete.addEventListener('click', () => this._removeCard());
    }
    this._photoElement.addEventListener('click', () => this._openImagePopup());
  }

  createCard() {
    this._isLiked = this._likesArr.some((like) => {
      return like._id === this._userID;
    });
    this._isOwner = this._ownerID === this._userID;

    if (this._isOwner) {
      this._templateSelector = this._templateSelectors.withTrash;
    } else {
      this._templateSelector = this._templateSelectors.withOutTrash;
    }

    this._element = this._getTemplate(this._templateSelector);
    this._photoElement = this._element.querySelector('.card__image');
    this._elementLike = this._element.querySelector('.card__like-button');

    if (this._isOwner) {
      this._elementDelete = this._element.querySelector('.card__delete-photo');
    }

    if (this._isLiked) {
      this._elementLike.classList.add('card__like-button_black');
    }


    this._photoElement.src = this._url;
    this._photoElement.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    this._elementLikeCounter = this._element.querySelector('.card__like-count');
    this._elementLikeCounter.textContent = this._likes;
    this._addEventListeners();

    return this._element;
  }
}
