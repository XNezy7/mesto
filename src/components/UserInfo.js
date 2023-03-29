export default class UserInfo {
  constructor({ name, about }) {
    this.nameEl = document.querySelector(name);
    this.jobEl = document.querySelector(about);
  }

  getUserInfo() {
    return {
      name: this.nameEl.textContent,
      about: this.jobEl.textContent
    };
  }

  setUserInfo({ name, about }) {
    this.nameEl.textContent = name;
    this.jobEl.textContent = about;
  }
}
