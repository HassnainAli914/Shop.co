import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const initialTestimonials = [
  {
    name: "Samantha D.",
    feedback:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt!",
    rating: 5,
    verified: true,
    date: "Posted on August 14, 2023",
  },
  {
    name: "Alex M.",
    feedback:
      "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me!",
    rating: 4,
    verified: true,
    date: "Posted on August 15, 2023",
  },
  {
    name: "Ethan R.",
    feedback:
      "This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    rating: 4,
    verified: true,
    date: "Posted on August 16, 2023",
  },
  {
    name: "Olivia P.",
    feedback:
      "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    rating: 5,
    verified: true,
    date: "Posted on August 17, 2023",
  },
  {
    name: "Liam K.",
    feedback:
      "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    rating: 4,
    verified: true,
    date: "Posted on August 18, 2023",
  },
  {
    name: "Ava H.",
    feedback:
      "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout on the t-shirt make it a conversation starter.",
    rating: 5,
    verified: true,
    date: "Posted on August 19, 2023",
  },
];

export default function CustomerTestimonials() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [reviews, setReviews] = useState(initialTestimonials);
  const [showModal, setShowModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newAuthor || !newText) return;
    setReviews([
      {
        name: newAuthor,
        feedback: newText,
        rating: Number(newRating),
        verified: true,
        date: `Posted on ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
      },
      ...reviews,
    ]);
    setNewAuthor("");
    setNewText("");
    setShowModal(false);
  };

  return (
    <main className="mt-14 max-w-screen-xl mx-auto px-4">
      {/* Tabs */}
      <div className="flex justify-around items-center border-b border-gray-200 pb-4 text-center">
        <span
          onClick={() => setActiveTab("details")}
          className={`text-sm sm:text-base font-medium cursor-pointer pb-4 -mb-4 transition-all ${
            activeTab === "details"
              ? "border-b-2 border-black text-black font-bold"
              : "text-gray-400 hover:text-black"
          }`}
        >
          Product Details
        </span>
        <span
          onClick={() => setActiveTab("reviews")}
          className={`text-sm sm:text-base font-medium cursor-pointer pb-4 -mb-4 transition-all ${
            activeTab === "reviews"
              ? "border-b-2 border-black text-black font-bold"
              : "text-gray-400 hover:text-black"
          }`}
        >
          Rating & Reviews
        </span>
        <span
          onClick={() => setActiveTab("faqs")}
          className={`text-sm sm:text-base font-medium cursor-pointer pb-4 -mb-4 transition-all ${
            activeTab === "faqs"
              ? "border-b-2 border-black text-black font-bold"
              : "text-gray-400 hover:text-black"
          }`}
        >
          FAQs
        </span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl sm:text-2xl font-bold">
          All Reviews{" "}
          <span className="text-gray-400 font-normal text-sm sm:text-base">
            ({reviews.length})
          </span>
        </h2>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-full text-xs font-semibold"
          >
            Latest <RiArrowDropDownLine className="ml-1 text-xl" />
          </Button>
          <Button
            onClick={() => setShowModal(true)}
            className="rounded-full bg-black text-white text-xs sm:text-sm px-5 py-2 hover:bg-gray-800"
          >
            Write a Review
          </Button>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {reviews.map((testimonial, index) => (
          <Card
            key={index}
            className="rounded-2xl border border-gray-200 shadow-none hover:shadow-sm transition-shadow"
          >
            <CardContent className="flex flex-col justify-between p-6 h-full">
              <div>
                <div className="flex justify-start items-center space-x-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <h3 className="flex items-center text-base sm:text-lg font-bold mb-2">
                  {testimonial.name}
                  {testimonial.verified && (
                    <FaCircleCheck className="text-green-600 ml-2 text-sm" />
                  )}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  "{testimonial.feedback}"
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-6 font-medium">
                {testimonial.date}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center mt-10">
        <Button variant="outline" className="rounded-full px-8 py-5 text-sm font-semibold hover:bg-black hover:text-white transition">
          Load More Reviews
        </Button>
      </div>

      {/* Write Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-black"
                  placeholder="e.g. Alex M."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Rating
                </label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(e.target.value)}
                  className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-black"
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                  <option value={2}>2 Stars ★★☆☆☆</option>
                  <option value={1}>1 Star ★☆☆☆☆</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Your Feedback
                </label>
                <textarea
                  required
                  rows={4}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full border rounded-lg p-2.5 text-sm outline-none focus:border-black resize-none"
                  placeholder="Share your experience with this item..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-full py-5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-full bg-black text-white py-5 hover:bg-gray-800"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
