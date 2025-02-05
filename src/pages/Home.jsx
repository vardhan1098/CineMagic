import React from 'react';

import MovieList from '../components/movies/MovieList';

const Home = () => {
    return (
        <div className='container mx-auto p-4'>
        <MovieList />
        </div>
    );
};

export default Home;