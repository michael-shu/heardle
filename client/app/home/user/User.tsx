import React from 'react';
import Image from 'next/image';


interface userProfile {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: Array<{ url: string; height?: number; width?: number }>;
    type: string;
    uri: string;
    followers: {
      href: string | null;
      total: number;
    };
    country: string;
    product: string;
    explicit_content: {
      filter_enabled: boolean;
      filter_locked: boolean;
    };
    email: string;
}

interface userArtists {
    external_urls: { spotify: string };
    followers: { href: string | null; total: number };
    genres: string[];
    href: string;
    id: string;
    images: { height: number; url: string; width: number }[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

interface userTracks {
    name: string;
    album: {
        artists: {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          };
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    };
    external_urls: {
      spotify: string;
    };
  }

const spotifyAuthUrl = "https://heardle.herokuapp.com"
//const spotifyAuthUrl = 'http://localhost:5000/auth/login';


const User: React.FC = async () => {

    const res = await fetch(spotifyAuthUrl + '/auth/token', { cache: 'no-store' });
    const res_data = await res.json();
    const token = res_data.access_token;

    // Fetch user data using the token
    const userRes = await fetch('https://api.spotify.com/v1/me', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    const profileData: userProfile = await userRes.json();

    //Fetch top artists for user
    const artistsRes = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    const topArtists = await artistsRes.json();

    //Fetch top tracks for user
    const tracksRes = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10', {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    const topTracks = await tracksRes.json();


    return (
      <div className = "bg-slate-900 p-6">
      
      <div className="bg-white rounded-2xl p-5 mb-5 flex flex-col md:flex-row md:w-4/12 items-center mx-auto">
  <Image
    className="rounded-xl flex-shrink-0"
    src={profileData.images && profileData.images.length > 0 ? profileData.images[1].url : '/default_user_icon.jpg'}
    alt={profileData.display_name}
    width={200}
    height={200}
  />
  <div className="flex flex-col text-center m-4 md:basis-2/3 w-full">
    <p className="md:text-3xl text-xl font-semibold text-gray-800">{profileData.display_name}</p>
    <p className="text-gray-600">Followers: {profileData.followers.total}</p>
    <a
      href={profileData.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline mt-2"
    >
      View on Spotify
    </a>
  </div>
</div>


    <div className="flex flex-col items-center md:grid md:grid-cols-2 gap-6 rounded-md">

        <table className="rounded-2xl bg-slate-700 p-4 w-full md:w-auto">
    <thead>
      <tr>
        <th colSpan={2} className="text-center py-2 px-2">
          <div className="md:text-3xl text-indigo-200 font-bold p-2 border-b-4 border-black">Top Artists</div>
        </th>
      </tr>
    </thead>
    <tbody>
      {topArtists.items.map((artist: userArtists, index: number) => (
        <tr key={index}>
          <td className={index === 9 ? "p-2" : "p-2 border-b-2 border-black"}>
            <Image
              className="rounded-full"
              src={artist.images.length > 0 ? artist.images[2].url : '/default_user_icon.jpg'}
              alt={artist.name}
              width={50}
              height={50}
            />
          </td>
          <td className={index === 9 ? "p-2" : "p-2 border-b-2 border-black"}>
            <a
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500"
            >
              {artist.name}
            </a>
          </td>
        </tr>
      ))}
    </tbody>
        </table>

        <table className="rounded-2xl bg-slate-700 p-4">
    <thead>
      <tr>
        <th colSpan={2} className="text-center py-2 px-2">
          <div className="md:text-3xl text-indigo-200 font-bold p-2 border-b-4 border-black">Top Songs</div>
        </th>
      </tr>
    </thead>
    <tbody>
      {topTracks.items.map((track: userTracks, index: number) => (
        <tr key={index}>
          <td className={index === 9 ? "p-2" : "p-2 border-b-2 border-black"}>
            <Image
              className="rounded-md"
              src={track.album.images.length > 0 ? track.album.images[0].url : '/default_user_icon.jpg'}
              alt={track.album.artists.name}
              width={50}
              height={50}
            />
          </td>
          <td className={index === 9 ? "p-2" : "p-2 border-b-2 border-black"}>
            <a
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500"
            >
              {track.name}
            </a>
          </td>
        </tr>
      ))}
    </tbody>
        </table>

    </div>

    </div>
    );
}

export default User;