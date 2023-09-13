import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productsAPI";

export default function Products() {
  const { isLoading, data, isError, error } = useQuery(
    ["products"],
    getProducts
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error:{error.message}</div>;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
