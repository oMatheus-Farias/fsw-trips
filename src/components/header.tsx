"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const { status, data } = useSession();

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

  const handleLoginClick = () => {
    signIn();
  };

  const handleLogoutClick = () => {
    signOut();
    handleMenuClick();
  };

  return (
    <header className="container mx-auto px-5 h-[93px] flex items-center justify-between">
      <Image
        src="/logo.svg"
        alt="Full Stack Week"
        height={0}
        width={0}
        sizes="100vw"
        className="h-8 w-[183px]"
      />

      {status === "unauthenticated" && (
        <button
          className="text-primary text-sm font-semibold"
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}

      {status === "authenticated" && data.user && (
        <div className="flex items-center gap-3 border border-solid border-grayLighter py-2 px-3 rounded-full relative">
          <AiOutlineMenu
            size={20}
            color="#717171"
            onClick={handleMenuClick}
            className="cursor-pointer"
          />
          <Image
            src={data.user.image!}
            alt={data.user.name!}
            height={0}
            width={0}
            sizes="100vw"
            className="h-9 w-9 rounded-full shadow-md"
          />

          {menuIsOpen && (
            <div className="absolute top-14 left-0 w-full h-full bg-white shadow-md p-2 rounded-lg flex flex-col justify-center items-center">
              <button
                className="text-primary text-xs font-semibold"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;