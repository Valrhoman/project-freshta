import Image from "next/image";

export default function ImageSlider({ visibleEl }: ImageSliderProps) {
  const className = (id: number) =>
    `w-full ${visibleEl === id ? "" : "hidden"} sm:rounded-3xl`;
  return (
    <>
      <Image
        className={className(0)}
        src="/images/pexels-zen-chung-5529606.jpg"
        alt="woman carrying fresh produce"
        width={1000}
        height={1000}
        priority
      />
      <Image
        className={className(1)}
        src="/images/pexels-zen-chung-5529567.jpg"
        alt="woman carrying fresh produce"
        width={1000}
        height={1000}
        priority
      />
      {/* <Dots onClick={onClick} visibleEl={visibleEl} /> */}
    </>
  );
}
