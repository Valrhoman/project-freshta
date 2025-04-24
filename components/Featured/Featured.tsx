import List from "./List";

export default function Featured({ products }: { products?: Product[] }) {
  return (
    <div className="mt-16 mx-4 mb-16 max-w-[120rem] sm:px-16 sm:mx-0 relative left-1/2 -translate-x-1/2">
      <h2 className="text-4xl lg:text-5xl font-poppins font-semibold mb-6 text-greeny-500">
        Fresh Picks
      </h2>
      <List products={products} />
    </div>
  );
}
