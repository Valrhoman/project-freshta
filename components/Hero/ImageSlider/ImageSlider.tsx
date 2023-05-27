import Image from "next/image";
import Dots from "./Dots";

export default function ImageSlider({ onClick, visibleEl }: ImageSliderProps) {
  return (
    <div className="relative">
      <Image
        className={`w-full ${visibleEl === 0 ? "" : "hidden"}`}
        src="/images/pexels-zen-chung-5529606.jpg"
        alt="woman carrying fresh produce"
        width={1000}
        height={1000}
        priority
      />
      <Image
        className={`w-full ${visibleEl === 1 ? "" : "hidden"}`}
        src="/images/pexels-zen-chung-5529567.jpg"
        alt="woman carrying fresh produce"
        width={1000}
        height={1000}
      />
      <Dots onClick={onClick} visibleEl={visibleEl} />
    </div>
  );
}
