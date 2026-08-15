import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useCreateProductMutation } from "../features/products/productApi";
import { useUploadImageMutation } from "../features/upload/uploadApi";

const SellerDashboard = () => {
  const navigate = useNavigate();

  const [createProduct, { isLoading: isCreatingProduct }] =
    useCreateProductMutation();

  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select a product image");
      return;
    }

    try {
      // 1. Upload image
      const formData = new FormData();
      formData.append("image", image);

      const uploadResponse = await uploadImage(formData).unwrap();

      const imageKey = uploadResponse.data.key;

      // 2. Create product using uploaded image key
      await createProduct({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        images: [imageKey],
      }).unwrap();

      toast.success("Product created successfully");

      // 3. Reset form
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });

      setImage(null);
      setImagePreview("");

      // 4. Go back to products
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
    }
  };

  const isSubmitting = isUploadingImage || isCreatingProduct;

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
        {/* Product Name */}
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

        {/* Description */}
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

        {/* Price + Stock */}
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

        {/* Category */}
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

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm"
          />

          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Product preview"
                className="w-full max-h-64 object-contain rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-(--color-accent) text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {isUploadingImage
            ? "Uploading image..."
            : isCreatingProduct
              ? "Creating product..."
              : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default SellerDashboard;