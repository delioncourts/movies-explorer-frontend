import { MOVIE_LINK } from './constants';

class MoviesApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkServerResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(this._checkServerResponse)
    }
}

const moviesApi = new MoviesApi({
    baseUrl: `${MOVIE_LINK}`,
});

export default moviesApi;