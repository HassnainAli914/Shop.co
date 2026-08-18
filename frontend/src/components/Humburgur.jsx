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
import { NavigationMenuDemo } from "./navigationMenu";

export function SheetSide({ onNavigate }) {
  return (
    <div className="gap-2">
      <Sheet>
        <SheetTrigger className="xl:hidden p-2">
          <TiThMenu className="text-2xl" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>SHOP.CO</SheetTitle>
          </SheetHeader>
          <ul className="mt-6 flex flex-col space-y-4">
            <li>
              <NavigationMenuDemo onNavigate={onNavigate} />
            </li>
            <li>
              <SheetClose>
                <button
                  onClick={() => onNavigate("casual")}
                  className="text-left font-medium text-gray-700 hover:text-black py-1"
                >
                  On Sale
                </button>
              </SheetClose>
            </li>
            <li>
              <SheetClose>
                <button
                  onClick={() => onNavigate("casual")}
                  className="text-left font-medium text-gray-700 hover:text-black py-1"
                >
                  New Arrivals
                </button>
              </SheetClose>
            </li>
            <li>
              <SheetClose>
                <button
                  onClick={() => onNavigate("brands")}
                  className="text-left font-medium text-gray-700 hover:text-black py-1"
                >
                  Brands
                </button>
              </SheetClose>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SheetSide;
