import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../api/productsAPI";

function ProductForm() {
  const addProductMutation = useMutation({
    mutationFn: createProduct,
  });

  const handleSubmit = (evnt) => {
    evnt.preventDefault();
    const formData = new FormData(evnt.target);
    console.log(formData);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({ ...product, inStock: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />

      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" />

      <label htmlFor="price">Price</label>
      <input type="text" name="price" id="price" />

      <button>Add Product</button>
    </form>
  );
}

export default ProductForm;
