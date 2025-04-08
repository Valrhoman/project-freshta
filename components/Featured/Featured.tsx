import List from "./List";

export default function Featured({ products }: { products?: Product[] }) {
  return (
    <div className="mt-16 mx-8 mb-16">
      <h2 className="text-4xl font-poppins font-semibold mb-6 text-greeny-500">
        Fresh Picks
      </h2>
      <List products={products} />
    </div>
  );
}
