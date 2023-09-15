function ProductForm() {
  return (
    <form>
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
