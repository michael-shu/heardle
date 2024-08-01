'use client'
import React from 'react'

const page = () => {
  return (
    <div className="relative w-full h-88 md:h-96 rounded-xl overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://i.scdn.co/image/ab67616d0000b273cb45edeb4ac59ac8e7fc50e3')" }}></div>
      <iframe
        className="absolute inset-0 border-0"
        src="https://open.spotify.com/embed/track/2cGxRwrMyEAp8dEbuZaVv6"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen;"
        loading="lazy"
      ></iframe>
      Currently a work in progress. Will be out soon! Thanks for waiting!
    </div>
  )
}

export default page;