import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../features/products/productApi";
import { normalizeImageUrl } from "../utils/image";

const AdminInventory = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetProductsQuery({
    page: 1,
    limit: 100,
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const products = data?.data ?? [];

  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return {
        label: "Out of Stock",
        className: "bg-red-100 text-red-700",
      };
    }

    if (stock <= 5) {
      return {
        label: "Low Stock",
        className: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: "In Stock",
      className: "bg-green-100 text-green-700",
    };
  };

  const handleDelete = async (productId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(productId);

      await deleteProduct(productId).unwrap();

      toast.success("Product deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <p>Loading inventory...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-red-500">Failed to load inventory.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>

        <p className="text-(--color-muted) mt-1">
          Manage products and stock levels.
        </p>
      </div>

      {/* Inventory card */}
      <div className="bg-(--color-surface) rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Products</h2>

            <p className="text-sm text-(--color-muted) mt-1">
              {products.length} product
              {products.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/inventory/add")}
            className="bg-(--color-accent) text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
          >
            + Add Product
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                const stockStatus = getStockStatus(product.stock);

                return (
                  <tr key={product._id} className="border-b border-gray-100">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={normalizeImageUrl(product.images[0])}
                          alt={product.name}
                          className="w-12 h-12 object-contain rounded-lg bg-gray-50"
                        />

                        <div>
                          <p className="font-medium">{product.name}</p>

                          <p className="text-xs text-(--color-muted)">
                            ID: {product._id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">{product.category}</td>

                    <td className="p-4 font-medium">₹ {product.price}</td>

                    <td className="p-4">{product.stock}</td>

                    <td className="p-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${stockStatus.className}`}
                      >
                        {stockStatus.label}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/admin/inventory/edit/${product._id}`)
                          }
                          className="px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          disabled={isDeleting && deletingId === product._id}
                          onClick={() => handleDelete(product._id)}
                          className="px-3 py-2 rounded-lg bg-red-500 text-white text-sm hover:opacity-90 disabled:opacity-50"
                        >
                          {isDeleting && deletingId === product._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden divide-y divide-gray-100">
          {products.map((product) => {
            const stockStatus = getStockStatus(product.stock);

            return (
              <div key={product._id} className="p-4 space-y-4">
                <div className="flex gap-3">
                  <img
                    src={normalizeImageUrl(product.images[0])}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>

                    <p className="text-sm text-(--color-muted)">
                      {product.category}
                    </p>

                    <p className="font-semibold mt-1">₹ {product.price}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-(--color-muted)">Stock</p>

                    <p className="font-medium">{product.stock}</p>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${stockStatus.className}`}
                  >
                    {stockStatus.label}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/admin/inventory/edit/${product._id}`)
                    }
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    disabled={isDeleting && deletingId === product._id}
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 px-3 py-2 rounded-lg bg-red-500 text-white text-sm disabled:opacity-50"
                  >
                    {isDeleting && deletingId === product._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="p-10 text-center">
            <p className="font-medium">No products found</p>

            <p className="text-sm text-(--color-muted) mt-1">
              Your inventory is currently empty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInventory;
