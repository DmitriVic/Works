const onResponce = (res)=> {
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const BASE_URL = 'https://api.react-learning.ru';
const headers = {
    "Content-type": "application/json",
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers,
        body: JSON.stringify({email, password})
    })
        .then(onResponce)
}

export const authorize = (email, password) => {
	return fetch(`${BASE_URL}/signin`, {
		 method: 'POST',
		 headers,
		 body: JSON.stringify({email, password})
	})
		 .then(onResponce)
}

export const checkToken = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		 method: 'GET',
		 headers: {...headers, Authorization: `Bearer ${token}`},
	})
		 .then(onResponce)
}