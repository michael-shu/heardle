// pages/index.tsx
'use client';
import {useState} from 'react';
import {spotifyAuthUrl } from './constants';

const Home = () => {

    const [token, setToken] = useState(null);
    
    return (
        <div>
            <h1>Spotify Login</h1>
            <a href={spotifyAuthUrl}>Login with Spotify</a>
        </div>
    );
};


export default Home;