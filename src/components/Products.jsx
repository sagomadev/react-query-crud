import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productsAPI";

export default function Products() {
  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => a.price - b.price),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error:{error.message}</div>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <button>Delete</button>
          <input type="checkbox" name="stock" id="stock" />
          <label htmlFor="stock">In Stock</label>
        </li>
      ))}
    </ul>
  );
}
