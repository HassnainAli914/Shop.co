import React from "react";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { FaSquareGithub } from "react-icons/fa6";
import Stayudpate from "./update";

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#F0F0F0] relative pt-20 pb-10 mt-36 px-4">
      {/* Floating Newsletter Card */}
      <div className="absolute top-[-100px] left-0 right-0">
        <Stayudpate />
      </div>

      <div className="max-w-screen-xl mx-auto pt-16">
        <div className="w-full flex flex-col md:flex-row justify-between items-start border-b border-gray-300 pb-10 gap-8">
          {/* Brand Col */}
          <div className="w-full md:w-[35%] space-y-4">
            <h1
              onClick={() => onNavigate && onNavigate("home")}
              className="text-2xl md:text-3xl font-extrabold cursor-pointer"
            >
              SHOP.CO
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            <div className="flex space-x-3 pt-2">
              <span className="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition">
                <FaTwitter className="text-sm" />
              </span>
              <span className="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition">
                <BsFacebook className="text-sm" />
              </span>
              <span className="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition">
                <FaInstagram className="text-sm" />
              </span>
              <span className="w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition">
                <FaSquareGithub className="text-sm" />
              </span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="w-full md:w-[60%] grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
                Company
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li className="hover:text-black cursor-pointer">About</li>
                <li className="hover:text-black cursor-pointer">Features</li>
                <li className="hover:text-black cursor-pointer">Works</li>
                <li className="hover:text-black cursor-pointer">Career</li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
                Help
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li className="hover:text-black cursor-pointer">
                  Customer Support
                </li>
                <li className="hover:text-black cursor-pointer">
                  Delivery Details
                </li>
                <li className="hover:text-black cursor-pointer">
                  Terms & Conditions
                </li>
                <li className="hover:text-black cursor-pointer">
                  Privacy Policy
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
                FAQ
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li className="hover:text-black cursor-pointer">Account</li>
                <li className="hover:text-black cursor-pointer">
                  Manage Deliveries
                </li>
                <li className="hover:text-black cursor-pointer">Orders</li>
                <li className="hover:text-black cursor-pointer">Payments</li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
                Resources
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li className="hover:text-black cursor-pointer">Free eBooks</li>
                <li className="hover:text-black cursor-pointer">
                  Development Tutorial
                </li>
                <li className="hover:text-black cursor-pointer">How to - Blog</li>
                <li className="hover:text-black cursor-pointer">
                  Youtube Playlist
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-6 gap-4">
          <p className="text-xs text-gray-500">
            Shop.co © 2000-2024, All Rights Reserved
          </p>
          <div className="flex items-center gap-2">
            <img
              src="/images/Visa.png"
              className="w-[45px] h-[30px] object-contain bg-white rounded p-1 border border-gray-200"
              alt="Visa"
              onError={(e) => (e.target.style.display = "none")}
            />
            <img
              src="/images/applepay.png"
              className="w-[45px] h-[30px] object-contain bg-white rounded p-1 border border-gray-200"
              alt="Apple Pay"
              onError={(e) => (e.target.style.display = "none")}
            />
            <img
              src="/images/paypal.png"
              className="w-[45px] h-[30px] object-contain bg-white rounded p-1 border border-gray-200"
              alt="PayPal"
              onError={(e) => (e.target.style.display = "none")}
            />
            <img
              src="/images/Badge.png"
              className="w-[45px] h-[30px] object-contain bg-white rounded p-1 border border-gray-200"
              alt="MasterCard"
              onError={(e) => (e.target.style.display = "none")}
            />
            <img
              src="/images/gpay.png"
              className="w-[45px] h-[30px] object-contain bg-white rounded p-1 border border-gray-200"
              alt="G Pay"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
