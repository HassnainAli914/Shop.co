import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const menuItems = [
  {
    title: "Men's clothes",
    href: "casual",
    description: "In attractive and spectacular colors and designs.",
  },
  {
    title: "Women's clothes",
    href: "casual",
    description: "Ladies, your style and tastes are important to us",
  },
  {
    title: "Kids clothes",
    href: "casual",
    description: "For all ages, with happy and beautiful colors",
  },
  {
    title: "Bags and Shoes",
    href: "casual",
    description: "Suitable for men, women and all tastes and styles",
  },
];

export function NavigationMenuDemo({ onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left" onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center text-sm md:text-base font-normal hover:font-medium transition-colors"
      >
        Shop <RiArrowDropDownLine className="text-2xl" />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-[280px] sm:w-[480px] bg-white rounded-xl shadow-xl border border-gray-100 p-4 grid sm:grid-cols-2 gap-3">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                onNavigate(item.href);
                setOpen(false);
              }}
              className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="text-sm font-semibold text-gray-900">{item.title}</div>
              <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NavigationMenuDemo;
