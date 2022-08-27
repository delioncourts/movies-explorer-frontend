import { SHORT_MOVIE } from './constants.js';

function ShortsFilter(movies, request, checkboxInfo) {
    let shortsFilter = movies;
    let result;

    if (checkboxInfo) {
        shortsFilter = shortsFilter.filter((movie) => movie.duration <= SHORT_MOVIE);
    }

    result = shortsFilter.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(request.toLowerCase());
    })
    return result;
}

export default ShortsFilter;

