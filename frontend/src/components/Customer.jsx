import React from "react";
import { FaStar } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const testimonials = [
  {
    name: "Sarah M.",
    feedback:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 5,
    verified: true,
  },
  {
    name: "Alex K.",
    feedback:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    rating: 5,
    verified: true,
  },
  {
    name: "James L.",
    feedback:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    rating: 5,
    verified: true,
  },
  {
    name: "Emma L.",
    feedback:
      "The delivery was incredibly fast and the packaging was immaculate. I've recommended Shop.co to all my friends and family!",
    rating: 5,
    verified: true,
  },
];

export default function CustomerCarousel() {
  return (
    <main className="mt-14 max-w-screen-xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-black text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          OUR HAPPY CUSTOMERS
        </h1>
      </div>

      <Carousel className="w-full relative">
        <div className="absolute right-0 -top-14 sm:-top-16 flex gap-2">
          <CarouselPrevious className="static transform-none border border-gray-300 hover:bg-black hover:text-white" />
          <CarouselNext className="static transform-none border border-gray-300 hover:bg-black hover:text-white" />
        </div>

        <CarouselContent className="-ml-2 sm:-ml-4 flex mt-2">
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-full rounded-2xl border border-gray-200 shadow-none hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-start justify-between p-6 h-full">
                  <div>
                    <div className="flex justify-start items-center space-x-1 mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-base" />
                      ))}
                    </div>
                    <h2 className="flex items-center text-lg font-bold mb-2">
                      {testimonial.name}
                      {testimonial.verified && (
                        <FaCircleCheck className="text-green-600 ml-2 text-base" />
                      )}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      "{testimonial.feedback}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </main>
  );
}
