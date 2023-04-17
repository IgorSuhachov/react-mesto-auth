export default class Api {
	constructor(data) {
		this._baseUrl = data.baseUrl
		this._headers = data.headers
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
		}).then(this._checkResponse)
	}

	setUserInfo(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.description,
			}),
		}).then(this._checkResponse)
	}

	addCard(card) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: card.title,
				link: card.link,
			}),
		}).then(this._checkResponse)
	}

	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers,
		}).then(this._checkResponse)
	}

	setLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: this._headers,
		}).then(this._checkResponse)
	}

	deleteLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: this._headers,
		}).then(this._checkResponse)
	}

	setAvatar(link) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: link.avatar,
			}),
		}).then(this._checkResponse)
	}

	getInitialsCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
		}).then(this._checkResponse)
	}

	changeLikeCardStatus(cardId, isLiked) {
		return isLiked ? this.deleteLike(cardId) : this.setLike(cardId)
	}
}

export const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
	headers: {
		authorization: 'deae41f5-41fa-4007-af22-3906d8bef3ad',
		'Content-Type': 'application/json',
	},
})
