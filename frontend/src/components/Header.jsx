import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { SheetSide } from "./Humburgur";
import { NavigationMenuDemo } from "./navigationMenu";
import AnnouncementBar from "./AnnouncementBar";

export default function Header({
  cart = [],
  user,
  onNavigate,
  onOpenAuth,
  onLogout,
  onOpenAddProduct,
  onSearch,
}) {
  return (
    <>
      <div className="fixed z-50 top-0 w-full bg-white">
        <AnnouncementBar onNavigate={onNavigate} />
        <header className="w-full border-b bg-white h-[60px] md:h-[90px] flex justify-between pr-4 pl-2 items-center max-w-screen-2xl mx-auto">
          <div className="flex justify-center items-center">
            <SheetSide onNavigate={onNavigate} />
            <h1
              onClick={() => onNavigate("home")}
              className="text-2xl md:text-4xl font-extrabold pl-2 cursor-pointer select-none"
            >
              SHOP.CO
            </h1>
          </div>

          <ul className="hidden xl:block">
            <li className="flex space-x-6 ml-4 items-center text-base">
              <NavigationMenuDemo onNavigate={onNavigate} />
              <button
                onClick={() => onNavigate("casual")}
                className="hover:underline text-gray-800"
              >
                On Sale
              </button>
              <button
                onClick={() => onNavigate("casual")}
                className="hover:underline text-gray-800"
              >
                New Arrivals
              </button>
              <button
                onClick={() => onNavigate("brands")}
                className="hover:underline text-gray-800"
              >
                Brands
              </button>
            </li>
          </ul>

          {/* Search bar */}
          <div className="flex justify-start items-center lg:bg-[#F0F0F0] lg:w-[480px] h-[40px] pl-3 ml-4 md:ml-0 rounded-full">
            <IoIosSearch className="text-xl hidden lg:block text-gray-500" />
            <input
              placeholder="Search for products..."
              onChange={(e) => onSearch && onSearch(e.target.value)}
              className="bg-[#F0F0F0] hidden lg:block outline-none w-full h-full rounded-full ml-2 text-sm"
            />
          </div>

          <div className="flex space-x-3 sm:space-x-4 items-center">
            {user && (
              <button
                onClick={onOpenAddProduct}
                className="bg-black text-white text-xs px-3 py-1.5 rounded-full font-medium hover:bg-gray-800"
              >
                + Add Product
              </button>
            )}

            <button
              onClick={() => onNavigate("cart")}
              className="relative p-1 focus:outline-none"
            >
              <IoCartOutline className="text-3xl lg:text-4xl" />
              {cart.length > 0 && (
                <span className="absolute top-[-2px] right-[-2px] bg-red-500 rounded-full text-white w-[18px] h-[18px] flex justify-center items-center text-[10px] font-bold">
                  {cart.length}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-xs font-semibold bg-gray-100 px-2 py-1 rounded-md">
                  {user.email?.split("@")[0]}
                </span>
                <button
                  onClick={onLogout}
                  className="text-xs text-red-500 font-bold hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-red-500 cursor-pointer font-bold text-sm hover:underline"
              >
                Login/Register
              </button>
            )}
          </div>
        </header>
      </div>
    </>
  );
}
