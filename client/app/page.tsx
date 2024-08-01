import React from 'react'
import Link from 'next/link';

const spotifyAuthUrl = "https://heardle.herokuapp.com/auth/login"
//const spotifyAuthUrl = 'http://localhost:5000/auth/login';

const page = () => {

  return (
    <div >
        <h1>Spotify Login</h1>
        <Link href={spotifyAuthUrl} >Login with Spotify</Link> 
    </div>
  )
}

export default page;