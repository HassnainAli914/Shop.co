import React from "react";

export default function Hero({ onNavigate }) {
  return (
    <main className="bg-[#F2F0F1] mt-24 md:mt-28 lg:h-[615px] md:px-10 sm:pt-4 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start max-w-screen-2xl mx-auto overflow-hidden">
      <div className="md:pl-0 lg:w-[600px] space-y-5 sm:pt-7 mt-6 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>
        <p className="text-sm text-gray-600">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <button
          onClick={() => onNavigate && onNavigate("casual")}
          className="w-full sm:w-[160px] text-sm bg-black text-white py-3 px-8 rounded-full font-medium hover:bg-gray-800 transition"
        >
          Shop Now
        </button>

        <div className="flex justify-evenly md:justify-between flex-wrap md:flex-nowrap gap-y-4 mt-6 pt-4 border-t border-gray-200">
          <div className="border-r pr-4">
            <h1 className="text-2xl md:text-4xl font-bold">200+</h1>
            <p className="text-xs md:text-sm text-gray-500">International Brands</p>
          </div>
          <div className="border-r pr-4">
            <h1 className="text-2xl md:text-4xl font-bold">2,000+</h1>
            <p className="text-xs md:text-sm text-gray-500">High-Quality Products</p>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">30,000+</h1>
            <p className="text-xs md:text-sm text-gray-500">Happy Customers</p>
          </div>
        </div>
      </div>

      <div className="relative mt-8 lg:mt-0 flex justify-center items-end">
        <img
          src="/profile.png"
          className="w-[340px] sm:w-[450px] lg:w-[540px] object-contain"
          alt="hero-image"
          onError={(e) => {
            e.target.src = "/hero.jpg";
          }}
        />
        <img
          src="/images/star.png"
          className="w-[50px] sm:w-[80px] absolute top-[40px] right-6"
          alt="star"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <img
          src="/images/star.png"
          className="w-[35px] sm:w-[50px] absolute top-[200px] left-[10px] sm:left-[-20px]"
          alt="star"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>
    </main>
  );
}
