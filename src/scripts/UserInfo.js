export default class UserInfo {
  constructor({
    nameSelector,
    descSelector
  }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._descSelector = document.querySelector(descSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      description: this._descSelector.textContent
    };
  }

  setUserInfo({
    newName,
    newDesc
  }) {
    this._nameSelector.textContent = newName;
    this._descSelector.textContent = newDesc;
  }
}
