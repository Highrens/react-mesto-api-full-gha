class Api {
    constructor(options) {
     this.baseUrl = options.baseUrl;
     this.headers = options.headers;
    }
    
    _getResponseData(res) {
      if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
  } 
  
    getInitialCards() {
      return fetch(this.baseUrl  + 'cards', { headers: this.headers})
        .then(this._getResponseData); // (res) => { res.ok ? res.json() : Promise.reject(res.status)})
    } 

    getUserInfo() {
      return fetch(this.baseUrl  + 'users/me', { headers: this.headers})
      .then(this._getResponseData);
    }
    
    updateUserAvatar(avatarlink) {
      return fetch(this.baseUrl  + 'users/me/avatar', {  
        method: 'PATCH', 
        headers:   this.headers,
        body: JSON.stringify({
          "avatar": avatarlink
        }) })
        .then(this._getResponseData);
    }

    updateUserInfo(name, about) {
      return fetch(this.baseUrl  + 'users/me', {  
        method: 'PATCH', 
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: about
        }) })
        .then(this._getResponseData);
    }

    postNewCard({name, link}) {
      return fetch(this.baseUrl  + 'cards', {  
        method: 'POST', 
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          link: link
        }) })
        .then(this._getResponseData);
    }

    deleteCard(cardId){
      return fetch(this.baseUrl  + 'cards/' + cardId, {  
        method: 'DELETE', 
        headers: this.headers})
        .then(this._getResponseData);
    }

    setLike(cardId){
      return fetch(this.baseUrl  + 'cards/' + cardId + '/likes', {  
        method: 'PUT', 
        headers: this.headers})
        .then(this._getResponseData);
    }

    takeLike(cardId){
      return fetch(this.baseUrl  + 'cards/' + cardId + '/likes', {  
        method: 'DELETE', 
        headers: this.headers})
        .then(this._getResponseData);
    }
}

export const api = new Api({
  baseUrl: 'http://localhost:3001/',

});