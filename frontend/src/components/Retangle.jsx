import React from "react";

export default function FontShowcase() {
  return (
    <div className="bg-black w-full min-h-[90px] py-6 flex flex-wrap justify-around items-center px-6 text-center gap-6 max-w-screen-2xl mx-auto">
      <h1 className="text-2xl md:text-4xl text-white font-serif font-bold tracking-wider">
        VERSACE
      </h1>
      <h1 className="text-2xl md:text-4xl text-white font-serif font-bold italic tracking-wide">
        ZARA
      </h1>
      <h1 className="text-2xl md:text-4xl text-white font-serif font-bold tracking-widest">
        GUCCI
      </h1>
      <h1 className="text-2xl md:text-4xl text-white font-serif font-extrabold tracking-widest">
        PRADA
      </h1>
      <h1 className="text-2xl md:text-4xl text-white font-sans font-light tracking-wide">
        Calvin Klein
      </h1>
    </div>
  );
}
