import { useProducts } from "../features/products/useProducts";

const Home = () => {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-4 gap-4">
        {data?.map((product) => (
          <div key={product.id} className="bg-(--color-surface) p-4 rounded-lg">
            <img
              src={product.image}
              className="h-40 object-contain"
              alt={product.title}
            />
            <h2 className="text-sm mt-2">{product.title}</h2>
            <p className="font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
