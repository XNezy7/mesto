export default class UserInfo {
  constructor({ name, about, avatar}) {
    this.nameEl = document.querySelector(name);
    this.jobEl = document.querySelector(about);
    this.avatarEl = document.querySelector(avatar)
  }

  getUserInfo() {
    return {
      name: this.nameEl.textContent,
      about: this.jobEl.textContent,
      avatar: this.avatarEl.src,
    };
  }

  setUserInfo({ name, about, avatar}) {
    this.nameEl.textContent = name;
    this.jobEl.textContent = about;
    this.avatarEl.src = avatar;
  }
}
