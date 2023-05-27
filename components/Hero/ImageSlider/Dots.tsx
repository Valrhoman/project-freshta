export default function Dots({ onClick, visibleEl }: ImageSliderProps) {
  return (
    <div className="absolute bottom-0 right-0 left-0 flex gap-4 justify-center mb-8">
      {Array.from({ length: 2 }, (_, i: number) => {
        return (
          <div
            id={i.toString()}
            key={i}
            onClick={onClick}
            className={`w-2 h-2 ${
              visibleEl === i ? "bg-gray-600" : "bg-gray-300 cursor-pointer"
            } rounded-md`}
          ></div>
        );
      })}
    </div>
  );
}
