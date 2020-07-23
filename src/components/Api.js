export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers["Content-type"];
  }

  loadUserInfo() {
    return fetch(`${this._url}/users/me`, {
        headers: {
          authorization: this._authorization,
          'Content-type': `${this._contentType}`
        }
      })
      .then(result => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch(err => console.log(`Error ${err}`));
  }

  loadCards() {
    return fetch(`${this._url}/cards`, {
        headers: {
          authorization: this._authorization,
          'Content-type': this._contentType
        }
      })
      .then(result => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch(err => console(`Error ${err}`));
  }

  editUserProfile(name, desc) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-type': this._contentType
        },
        body: JSON.stringify({
          name: name,
          about: desc
        })
      })
      .then(result => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch(err => console.log(`Error ${err}`));
  }

  editUserAvatar({url}) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-type': this._contentType
        },
        body: JSON.stringify({
          avatar: url
        })
      })
      .then(result => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch(err => console.log(`Error ${err}`));
  }

  addCard({
    name,
    link
  }) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._authorization,
          'Content-type': this._contentType
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(result => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch(err => console.log(`Error ${err}`));
  }

  delCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-type': this._contentType
        }
      })
      .then(result => {
        if (!result.ok) return Promise.reject(result.status);
        else return result.json();
      })
      .catch(err => console.log(`Error ${err}`));
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._authorization,
          'Content-type': this._contentType
        }
      })
      .then(result => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch(err => console.log(`Error ${err}`));
  }

  unlikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-type': this._contentType
        }
      })
      .then(result => {
        if (result.ok) return result.json();
        else return Promise.reject(result.status);
      })
      .catch(err => console.log(`Error ${err}`));
  }
}
