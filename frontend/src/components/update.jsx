import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";

export default function Stayudpate() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <main className="w-full flex justify-center items-center px-4">
      <div className="w-full max-w-screen-xl rounded-[24px] md:rounded-[32px] p-8 md:p-12 bg-black flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl">
        <div className="w-full lg:w-[550px]">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold tracking-tight uppercase leading-tight">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full sm:w-[350px] space-y-3">
          <div className="flex items-center bg-white rounded-full px-4 py-3 gap-2">
            <AiOutlineMail className="text-xl text-gray-400 shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-transparent w-full text-sm outline-none text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-sm font-semibold bg-white text-black py-3 px-6 rounded-full hover:bg-gray-100 transition shadow"
          >
            {subscribed ? "Subscribed! 🎉" : "Subscribe to Newsletter"}
          </button>
        </form>
      </div>
    </main>
  );
}
