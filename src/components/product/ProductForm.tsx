import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../features/products/productApi";
import { useUploadImageMutation } from "../../features/upload/uploadApi";
import type { Product } from "../../types/product";
import { normalizeImageUrl } from "../../utils/image";

interface ProductFormProps {
  product?: Product;
}

const ProductForm = ({ product }: ProductFormProps) => {
  const navigate = useNavigate();

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const isEditMode = Boolean(product);

  useEffect(() => {
    if (!product) return;

    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category,
      stock: String(product.stock),
    });

    setImagePreview(normalizeImageUrl(product.images[0]) ?? "");
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageKey = product?.images[0];

      // Upload only when a new image was selected
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const response = await uploadImage(formData).unwrap();

        imageKey = response.data.key;
        const previewUrl = response.data.url;

        if (previewUrl) {
          setImagePreview(previewUrl);
        }
      }

      if (isEditMode && product) {
        await updateProduct({
          id: product._id,
          data: {
            name: form.name,
            description: form.description,
            price: Number(form.price),
            category: form.category,
            stock: Number(form.stock),
            ...(imageKey ? { images: [imageKey] } : {}),
          },
        }).unwrap();

        toast.success("Product updated successfully");
      } else {
        if (!imageKey) {
          toast.error("Please select a product image");
          return;
        }

        await createProduct({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category,
          stock: Number(form.stock),
          images: [imageKey],
        }).unwrap();

        toast.success("Product created successfully");
      }

      navigate("/admin/inventory");
    } catch (error: any) {
      toast.error(
        error?.data?.message ??
          `Failed to ${isEditMode ? "update" : "create"} product`,
      );
    }
  };

  const isSubmitting = isUploading || isCreating || isUpdating;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate("/admin/inventory")}
          className="text-sm text-(--color-muted) hover:text-(--color-text) mb-4"
        >
          ← Back to Inventory
        </button>

        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit Product" : "Add Product"}
        </h1>

        <p className="text-(--color-muted) mt-1">
          {isEditMode
            ? "Update product information and stock."
            : "Add a new product to your inventory."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-(--color-surface) p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium mb-2">Product name</label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={3}
            placeholder="Enter product name"
            className="w-full p-3 border rounded-lg bg-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            minLength={10}
            rows={4}
            placeholder="Describe your product"
            className="w-full p-3 border rounded-lg bg-transparent resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Price</label>

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
            <label className="block text-sm font-medium mb-2">Stock</label>

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
          <label className="block text-sm font-medium mb-2">Category</label>

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="Electronics"
            className="w-full p-3 border rounded-lg bg-transparent"
          />
        </div>

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
                alt={form.name || "Product preview"}
                className="w-full max-h-64 object-contain rounded-lg border"
              />
            </div>
          )}

          {isEditMode && (
            <p className="text-xs text-(--color-muted) mt-2">
              Leave the image unchanged if you don't want to replace it.
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/inventory")}
            disabled={isSubmitting}
            className="flex-1 border border-gray-200 py-3 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-(--color-accent) text-white py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {isUploading
              ? "Uploading image..."
              : isCreating
                ? "Creating product..."
                : isUpdating
                  ? "Updating product..."
                  : isEditMode
                    ? "Save Changes"
                    : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
