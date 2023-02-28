export default class UserInfo {
  constructor({name, job}) {
    this.name = name;
    this.job = job;

    this.nameEl =  document.querySelector(name);
    this.jobEl = document.querySelector(job);
  }


  getUserInfo() {
    return {
      name: this.nameEl.textContent,
      job: this.jobEl.textContent,
    };
  }

  setUserInfo({name, job}) {
    this.nameEl.textContent = name;
    this.jobEl.textContent = job;
  }
}
