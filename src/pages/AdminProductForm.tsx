import { useParams } from "react-router-dom";

import { useGetProductByIdQuery } from "../features/products/productApi";
import ProductForm from "../components/product/ProductForm";

const AdminProductForm = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetProductByIdQuery(id!, {
    skip: !id,
  });

  if (id && isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <p>Loading product...</p>
      </div>
    );
  }

  if (id && (isError || !data?.data)) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-red-500">Failed to load product.</p>
      </div>
    );
  }

  return <ProductForm product={data?.data} />;
};

export default AdminProductForm;
