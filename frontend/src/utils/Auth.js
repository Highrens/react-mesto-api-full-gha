export const BASE_URL = 'https://api.welcometomesto.nomoredomains.monster';
// export const BASE_URL = 'http://localhost:3001';

const _getResponseData = (res) => {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
} 

export const register = ( password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(_getResponseData); 
};

export const login = ( password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then(_getResponseData); 
  };

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
      })
    .then(_getResponseData); 
  
};