import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts, updateProduct } from "../api/productsAPI";

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

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
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
          <button onClick={() => deleteProductMutation.mutate(product.id)}>
            Delete
          </button>
          <input
            type="checkbox"
            checked={product.inStock}
            name="stock"
            id={`stock${product.id}`}
            onChange={(e) =>
              updateProductMutation.mutate({
                ...product,
                inStock: e.target.checked,
              })
            }
          />
          <label htmlFor={`stock${product.id}`}>In Stock</label>
        </li>
      ))}
    </ul>
  );
}
