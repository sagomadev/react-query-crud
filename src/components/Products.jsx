import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts } from "../api/productsAPI";

export default function Products() {
  const queryClient = useQueryClient();

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

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries("products"),
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
          <button onClick={() => deleteProductMutation(product.id)}>
            Delete
          </button>
          <input type="checkbox" name="stock" id="stock" />
          <label htmlFor="stock">In Stock</label>
        </li>
      ))}
    </ul>
  );
}
