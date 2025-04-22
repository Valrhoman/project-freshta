export default function Dots({ onClick, visibleEl }: ImageSliderProps) {
  return (
    <>
      {Array.from({ length: 2 }, (_, i: number) => {
        return (
          <div
            id={i.toString()}
            key={i}
            onClick={onClick}
            className={`w-12 h-2 ${
              visibleEl === i ? "bg-gray-500" : "bg-gray-200 cursor-pointer"
            } rounded-md transition-all duration-300`}
          ></div>
        );
      })}
    </>
  );
}
