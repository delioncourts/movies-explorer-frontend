import React from 'react';

import './Error.css'

function Error({ errorMessage }) {
    return (
        <span className='error error__visible'>{errorMessage}</span>
    )
}

export default Error;