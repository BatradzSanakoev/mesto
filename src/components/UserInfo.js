export default class UserInfo {
  constructor({nameSelector, descSelector, avaSelector}) {
    this._nameSelector = document.querySelector(nameSelector);
    this._descSelector = document.querySelector(descSelector);
    this._avaSelector = document.querySelector(avaSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      description: this._descSelector.textContent
    };
  }

  getUserAvatar() {
    return {
      avatar: this._avaSelector
    }
  }

  setUserAvatar(newAvatar) {
    this._avaSelector.src = newAvatar;
    return this._avaSelector.src;
  }

  setUserInfo({newName, newDesc}) {
    this._nameSelector.textContent = newName;
    this._descSelector.textContent = newDesc;
  }
}
