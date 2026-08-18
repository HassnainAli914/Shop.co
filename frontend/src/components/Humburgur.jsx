import React from "react";
import { TiThMenu } from "react-icons/ti";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";

export function SheetSide({ onNavigate }) {
  const handleNav = (view) => {
    if (onNavigate) onNavigate(view);
  };

  return (
    <Sheet>
      <SheetTrigger className="xl:hidden p-1.5 mr-1 text-gray-800 hover:text-black">
        <TiThMenu className="text-2xl" />
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>SHOP.CO</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col space-y-2">
          <SheetClose>
            <button
              onClick={() => handleNav("home")}
              className="w-full text-left font-semibold text-base py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
            >
              Home
            </button>
          </SheetClose>

          <SheetClose>
            <button
              onClick={() => handleNav("casual")}
              className="w-full text-left font-semibold text-base py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
            >
              Shop / All Products
            </button>
          </SheetClose>

          <SheetClose>
            <button
              onClick={() => handleNav("casual")}
              className="w-full text-left font-semibold text-base py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
            >
              On Sale
            </button>
          </SheetClose>

          <SheetClose>
            <button
              onClick={() => handleNav("casual")}
              className="w-full text-left font-semibold text-base py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
            >
              New Arrivals
            </button>
          </SheetClose>

          <SheetClose>
            <button
              onClick={() => handleNav("brands")}
              className="w-full text-left font-semibold text-base py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
            >
              Brands
            </button>
          </SheetClose>

          <SheetClose>
            <button
              onClick={() => handleNav("cart")}
              className="w-full text-left font-semibold text-base py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
            >
              Cart
            </button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default SheetSide;
