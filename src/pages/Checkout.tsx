import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCreateOrderMutation } from "../features/order/orderApi";
import { useGetCartQuery } from "../features/cart/cartApi";
import PageWrapper from "../components/common/PageWrapper";

const Checkout = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetCartQuery();

  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();

  const cart = data?.data;
  const items = cart?.items ?? [];

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createOrder({
        shippingAddress: form,
      }).unwrap();

      toast.success("Order placed successfully");

      navigate("/orders");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to place order");
    }
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <p>Loading checkout...</p>
      </PageWrapper>
    );
  }

  if (items.length === 0) {
    return (
      <PageWrapper>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>

          <p className="text-(--color-muted) mt-2">
            Add some products before checking out.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 bg-(--color-accent) text-white px-5 py-2 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Checkout</h1>

          <p className="text-(--color-muted) mt-1">
            Enter your delivery details to place your order.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Address */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-(--color-surface) border border-gray-200 rounded-xl p-5 sm:p-6 space-y-5"
          >
            <h2 className="font-semibold text-lg">Shipping Address</h2>

            <div>
              <label className="block text-sm font-medium mb-2">
                Full name
              </label>

              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>

              <input
                name="addressLine"
                value={form.addressLine}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-gray-200 bg-transparent"
                placeholder="House / Street / Area"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>

                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent"
                  placeholder="City"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">State</label>

                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent"
                  placeholder="State"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Postal code
                </label>

                <input
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent"
                  placeholder="Postal code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Country
                </label>

                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-gray-200 bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isCreating}
              className="w-full bg-(--color-accent) text-white py-3 rounded-lg font-medium disabled:opacity-50"
            >
              {isCreating ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          {/* Summary */}
          <div className="bg-(--color-surface) border border-gray-200 rounded-xl p-5 h-fit">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product._id} className="flex gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-14 object-contain rounded-lg bg-gray-50"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product.name}</p>

                    <p className="text-sm text-(--color-muted)">
                      {item.quantity} × ₹ {item.product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between">
              <span className="font-medium">Total</span>

              <span className="text-lg font-bold">₹ {total}</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Checkout;
