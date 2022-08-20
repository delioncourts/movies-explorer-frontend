class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    getMovies() {
        return this._fetcher();
    }

    _fetcher() {
        const headers = this._headers;
        const options = {
            method: 'GET',
            headers,
        };
        return fetch(this._baseUrl, options).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Произошла ошибка: ${res.status}`))
        });
    }
}

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default moviesApi;