"use client";
import { useState, MouseEventHandler } from "react";
import HeroButton from "./HeroButton";
import ImageSlider from "./ImageSlider";
import { useSession } from "next-auth/react";

export default function Hero() {
  const [visibleEl, setVisibleEl] = useState<number>(0);
  const { data: session } = useSession();
  const data = useSession();

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setVisibleEl(+e.currentTarget.id);
  };

  return (
    <>
      <ImageSlider onClick={handleClick} visibleEl={visibleEl} />

      <div className="mx-8 my-12">
        <div
          className={`font-poppins ${
            visibleEl === 0 ? "flex" : "hidden"
          } flex flex-col gap-8`}
        >
          <h2 className="text-6xl font-bold leading-[1.2] -tracking-wide text-greeny-400">
            Goodness at your doorstep
          </h2>
          <p className="text-2xl text-gray-700 leading-relaxed mb-4">
            Order fresh and locally sourced fruits and vegetables today!
          </p>
          <HeroButton route="/">
            <p className="text-2xl font-medium">Order Local Produce</p>
          </HeroButton>
        </div>

        <div
          className={`font-poppins ${
            visibleEl === 1 ? "flex" : "hidden"
          } flex flex-col gap-8`}
        >
          <h2 className="text-6xl font-bold leading-[1.2] -tracking-wide text-gray-800">
            <span className="text-greeny-400">Free</span> ship on orders over
            100$
          </h2>
          <p className="text-2xl text-gray-700 leading-relaxed mb-4">
            For first-time customers only.
          </p>
          <HeroButton route="/">
            <p className="text-2xl text-white font-medium">
              Try Healthier Produce
            </p>
          </HeroButton>
          <button
            onClick={() => {
              console.log(session);
              console.log(data);
            }}
          >
            session
          </button>
        </div>
      </div>
    </>
  );
}
