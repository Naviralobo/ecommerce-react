import { useNavigate } from "react-router-dom";

import PageWrapper from "../components/common/PageWrapper";
import { useGetMyOrdersQuery } from "../features/order/orderApi";

const Orders = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetMyOrdersQuery();

  const orders = data?.data ?? [];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <p>Loading orders...</p>
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper>
        <p className="text-red-500">Failed to load orders.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">My Orders</h1>

          <p className="text-(--color-muted) mt-1">
            View your previous orders and their status.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-(--color-surface) border border-gray-200 rounded-xl p-10 text-center">
            <h2 className="font-semibold text-lg">No orders yet</h2>

            <p className="text-(--color-muted) mt-2">
              Your placed orders will appear here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-6 bg-(--color-accent) text-white px-5 py-2 rounded-lg"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-(--color-surface) border border-gray-200 rounded-xl p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div>
                    <p className="font-semibold">
                      Order #{order._id.slice(-8)}
                    </p>

                    <p className="text-sm text-(--color-muted)">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusClass(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={`${order._id}-${item.product}`}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-contain rounded-lg bg-gray-50"
                      />

                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>

                        <p className="text-sm text-(--color-muted)">
                          {item.quantity} × ₹ {item.price}
                        </p>
                      </div>

                      <p className="font-medium">
                        ₹ {item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4 flex items-center justify-between">
                  <span className="font-medium">Total</span>

                  <span className="text-lg font-bold">
                    ₹ {order.totalAmount}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/orders/${order._id}`)}
                  className="mt-4 w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
                >
                  View Order
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Orders;
