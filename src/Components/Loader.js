import React from 'react';

import spinner from "../gif/Loader.gif"

const Loader = () => {
    return (
        <div>
            <img src={spinner} alt='Loading' />
            <h1>Loading...</h1>
        </div>
    );
};

export default Loader;