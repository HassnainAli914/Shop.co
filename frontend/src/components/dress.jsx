import React from "react";

export default function Dress({ onNavigate }) {
  return (
    <main id="brands" className="px-4">
      <div className="w-full flex justify-center items-center mt-14 mb-4 max-w-screen-xl mx-auto">
        <div className="w-full bg-[#F0F0F0] p-6 sm:p-12 rounded-[32px] md:rounded-[40px]">
          <div className="flex justify-center items-center">
            <h1 className="text-black text-2xl sm:text-4xl md:text-5xl font-extrabold text-center tracking-tight">
              BROWSE BY DRESS STYLE
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center items-center gap-4 sm:gap-6 mt-10">
            <div
              onClick={() => onNavigate && onNavigate("casual")}
              className="relative bg-white w-full lg:w-[360px] h-[220px] sm:h-[260px] rounded-[24px] overflow-hidden cursor-pointer group shadow-sm"
            >
              <h1 className="absolute left-8 top-6 text-2xl font-bold z-10 text-gray-900 group-hover:scale-105 transition-transform">
                Casual
              </h1>
              <img
                src="/images/dress1.png"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-[24px]"
                alt="Casual"
              />
            </div>

            <div
              onClick={() => onNavigate && onNavigate("casual")}
              className="relative bg-white w-full lg:w-[680px] h-[220px] sm:h-[260px] rounded-[24px] overflow-hidden cursor-pointer group shadow-sm"
            >
              <h1 className="absolute left-8 top-6 text-2xl font-bold z-10 text-gray-900 group-hover:scale-105 transition-transform">
                Formal
              </h1>
              <img
                src="/images/dress2.png"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-[24px]"
                alt="Formal"
              />
            </div>

            <div
              onClick={() => onNavigate && onNavigate("casual")}
              className="relative bg-white w-full lg:w-[680px] h-[220px] sm:h-[260px] rounded-[24px] overflow-hidden cursor-pointer group shadow-sm"
            >
              <h1 className="absolute left-8 top-6 text-2xl font-bold z-10 text-gray-900 group-hover:scale-105 transition-transform">
                Party
              </h1>
              <img
                src="/images/dress3.png"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-[24px]"
                alt="Party"
              />
            </div>

            <div
              onClick={() => onNavigate && onNavigate("casual")}
              className="relative bg-white w-full lg:w-[360px] h-[220px] sm:h-[260px] rounded-[24px] overflow-hidden cursor-pointer group shadow-sm"
            >
              <h1 className="absolute left-8 top-6 text-2xl font-bold z-10 text-gray-900 group-hover:scale-105 transition-transform">
                Gym
              </h1>
              <img
                src="/images/dress5.png"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-[24px]"
                alt="Gym"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
