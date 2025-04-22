"use client";
import { useState, MouseEventHandler, useEffect, useRef } from "react";
import HeroButton from "./HeroButton";
import ImageSlider from "./ImageSlider";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import Dots from "./ImageSlider/Dots";
import Link from "next/link";

export default function Hero() {
  const [visibleEl, setVisibleEl] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const TOTAL_SLIDES = 2;
  // const { data: session } = useSession();
  // const data = useSession();
  const startAutoSwitch = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setVisibleEl((prev) => (prev + 1) % TOTAL_SLIDES);
    }, 5000);
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setVisibleEl(+e.currentTarget.id);
    startAutoSwitch(); // reset the timer after user interaction
  };

  useEffect(() => {
    startAutoSwitch(); // start on mount

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    // <div className="md:flex md:flex-row-reverse md:max-w-[120rem] md:mx-auto">
    <div className="sm:grid sm:grid-cols-2 sm:gap-8 sm:max-w-[120rem] sm:mx-auto sm:px-16 sm:py-12 bg-red-5 relative">
      <div className="relative flex items-center  ml-auto  sm:order-2">
        <ImageSlider onClick={handleClick} visibleEl={visibleEl} />
      </div>

      <div className="flex flex-col justify-center gap-8 sm:order-1 bg-yellow-5 m-8 sm:m-0 font-poppins">
        <h2
          className={clsx(
            "text-5xl/[1.2] md:text-[3.5rem]/[1.2] lg:text-7xl font-bold -tracking-wide",
            visibleEl === 0 ? "text-greeny-400" : "text-gray-800"
          )}
        >
          {visibleEl === 0 ? (
            "Goodness at your doorstep"
          ) : (
            <>
              <span className="text-greeny-400">Free</span> ship on orders over
              100$
            </>
          )}
        </h2>
        <p className="text-2xl lg:text-[1.8rem] text-gray-700 leading-relaxed mb-4">
          {visibleEl === 0
            ? "Order fresh and locally sourced fruits and vegetables today!"
            : "Exclusive offer available for first-time customers only."}
        </p>
        <div className="text-2xl font-medium mb-12 ">
          <HeroButton route="/">
            {visibleEl === 0 ? "Order Local Produce" : "Try Healthier Produce"}
          </HeroButton>
        </div>
      </div>

      {/* Dots nav */}
      <div className="absolute bottom-0 left-0 z-50 flex gap-3 ml-8 sm:ml-16 justify-center items-center">
        <Dots onClick={handleClick} visibleEl={visibleEl} />
      </div>
    </div>
  );
}
