class MainApi {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _checkServerResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    //регистрация
    register(email, password, name) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify({ email, password, name })
        })
            .then(this._checkServerResponse)
    }

    //авторизация
    authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify({ email, password })
        })
            .then(this._checkServerResponse)
    }

    // данные профиля 
    getProfile(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })
            .then(this._checkServerResponse)
    }

    //изменить данные профиля
    editProfile(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                name,
                email
            })
        })
            .then(this._checkServerResponse)
    };

    //получить контент по токену
    getContent(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(this._checkServerResponse)
    }

    //сохранить фильм
    saveMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                country: movie.country || 'неизвестно',
                director: movie.director || 'неизвестно',
                duration: movie.duration || 'нет данных',
                year: movie.year || 'неизвестно',
                description: movie.description || 'отсутствует',
                image: `https://api.nomoreparties.co/${movie.image.url}`,
                trailerLink: movie.trailerLink || 'нет трейлера',
                thumbnail: `https://api.nomoreparties.co/${movie.image.url}` || 'нет изображения',
                movieId: movie.id || 'нет данных',
                nameRU: movie.nameRU,
                nameEN: movie.nameEN || 'нет данных',
            })
        })
            .then(this._checkServerResponse)
    };

    //получить сохраненные фильмы
    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(this._checkServerResponse)
    };

    //удалить фильм
    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(this._checkServerResponse)
    };
}

const mainApi = new MainApi({
    baseUrl: 'https://api.delioncourts-movies.nomoredomains.xyz',
    headers() {
        return {
            "Access-Control-Allow-Origin": "*",
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
});

export default mainApi;