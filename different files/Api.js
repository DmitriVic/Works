
const onResponce = (res)=> {
	
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}


 class Api {
	constructor({baseUrl, token}) {

		 this._baseUrl = baseUrl;
		 this._token = `Bearer ${token}`;
	}

	 getCards() {
		 return fetch(`${this._baseUrl}/posts`, {
			 headers: {
				 authorization: this._token,
			 }
		 }).then(onResponce)
	 }

	 getUser() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				authorization: this._token,
			}
		}).then(onResponce)
	}

	changeLikeStatus(postsId, isLike) {

		return fetch(`${this._baseUrl}/posts/likes/${postsId}`, {
			method: isLike ? "DELETE" : "PUT",
			headers: {
				authorization: this._token,
			}
		}).then(onResponce)

	}

	delCard(postsId) {
		return fetch(`${this._baseUrl}/posts/${postsId}`, {
			method: "DELETE",
			headers: {
				authorization: this._token,
			}
		}).then(onResponce)
	}

	getPostById(postsId) {
		return fetch(`${this._baseUrl}/posts/${postsId}`, {
			headers: {
				authorization: this._token,
			}
		}).then(onResponce)
	}

	addPost(postsOdj) {
		return fetch(`${this._baseUrl}/posts/`, {
			method:  "POST",
			headers: {
				authorization: this._token,
				"Content-type": "application/json"
			},
			
			body: JSON.stringify(postsOdj)
		}).then(onResponce)
	}

	editPost(postsId,postsOdj) {
		return fetch(`${this._baseUrl}/posts/${postsId}`, {
			method:  "PATCH",
			headers: {
				authorization: this._token,
				"Content-type": "application/json"
			},
			
			body: JSON.stringify(postsOdj)
		}).then(onResponce)
	}



 }

 const config = {
	baseUrl: 'https://api.react-learning.ru',
	token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiNmZmYzA5YjEyZjgwZjRjMTBiYjciLCJpYXQiOjE2NDcwMTM4ODYsImV4cCI6MTY3ODU0OTg4Nn0.VZVeqNqQ6bWBovjF2Jh7AMxj_htjcBdL9nHn6M11T0I'
}

const api = new Api(config);

export default api;

