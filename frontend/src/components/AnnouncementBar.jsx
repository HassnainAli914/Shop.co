import React from "react";
import { MdOutlineClear } from "react-icons/md";

function AnnouncementBar({ onNavigate }) {
  return (
    <div className="w-full h-[38px] bg-black text-white flex justify-center items-center max-w-screen-2xl mx-auto relative px-4">
      <div className="flex items-center space-x-2">
        <h1 className="text-[10px] md:text-xs">
          Sign up and get 20% off to your first order.
        </h1>
        <button
          onClick={() => onNavigate && onNavigate("casual")}
          className="underline underline-offset-4 text-xs md:text-sm font-semibold"
        >
          Sign Up Now
        </button>
      </div>

      <MdOutlineClear className="hidden md:block absolute right-[100px] text-xl text-white cursor-pointer" />
    </div>
  );
}

export default AnnouncementBar;
