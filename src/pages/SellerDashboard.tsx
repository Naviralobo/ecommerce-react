import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../features/products/productApi";

const SellerDashboard = () => {
  const navigate = useNavigate();

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createProduct({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        images: [],
      }).unwrap();

      toast.success("Product created successfully");

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <p className="text-(--color-muted) mt-1">
          Add a new product to your store.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-(--color-surface) p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium mb-2">
            Product name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
            className="w-full p-3 border rounded-lg bg-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe your product"
            className="w-full p-3 border rounded-lg bg-transparent resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Price
            </label>

            <input
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="0"
              className="w-full p-3 border rounded-lg bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Stock
            </label>

            <input
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              required
              placeholder="0"
              className="w-full p-3 border rounded-lg bg-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Category
          </label>

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="Electronics"
            className="w-full p-3 border rounded-lg bg-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-(--color-accent) text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {isLoading ? "Creating product..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default SellerDashboard;

