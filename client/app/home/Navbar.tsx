import React from "react";
import Link from "next/link";
import Image from 'next/image';

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
            <li>
                <Image alt="logo" src="/logo.svg" width={50} height={75}/>
              </li>
                <li>
                <Link href = '/home'>
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href = '/home/user'>
                  <p>User</p>
                </Link>
              </li>
              <li>
                <Link href="/home/play">
                  <p>Play</p>
                </Link>
              </li>
              <li>
                <Link href="/home/about">
                  <p>About</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;