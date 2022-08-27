function showErrorMessage(errorStatus) {
    switch (errorStatus) {
        case 400:
            return 'Некорректные данные';
        case 401:
            return 'Неправильные почта или пароль';
        case 403:
            return 'Нет доступа';
        case 404:
            return 'Не найдено';
        case 409:
            return 'Пользователь с такой почтой уже существует';
        case 500:
            return 'На сервере произошла ошибка';
        default:
            return 'Произошла ошибка';
    }
}

export default showErrorMessage;