import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  useMakeSellerMutation,
  useGetUsersQuery,
} from "../features/admin/adminApi";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetUsersQuery();

  const [makeSeller, { isLoading: isMakingSeller }] = useMakeSellerMutation();

  const users = data?.data ?? [];

  const customers = users.filter((user) => user.role === "customer").length;

  const sellers = users.filter((user) => user.role === "seller").length;

  const admins = users.filter((user) => user.role === "admin").length;

  const handleMakeSeller = async (userId: string) => {
    try {
      await makeSeller({ userId }).unwrap();

      toast.success("User promoted to seller");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to make seller");
    }
  };

  if (isLoading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load dashboard.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <p className="text-(--color-muted) mt-1">
          Manage your store, inventory, and users.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Users */}
        <div className="bg-(--color-surface) rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-(--color-muted)">Total Users</p>

          <p className="text-2xl font-bold mt-2">{users.length}</p>

          <p className="text-xs text-(--color-muted) mt-1">
            Registered accounts
          </p>
        </div>

        {/* Customers */}
        <div className="bg-(--color-surface) rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-(--color-muted)">Customers</p>

          <p className="text-2xl font-bold mt-2">{customers}</p>

          <p className="text-xs text-(--color-muted) mt-1">Active customers</p>
        </div>

        {/* Sellers */}
        <div className="bg-(--color-surface) rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-(--color-muted)">Sellers</p>

          <p className="text-2xl font-bold mt-2">{sellers}</p>

          <p className="text-xs text-(--color-muted) mt-1">Store sellers</p>
        </div>

        {/* Inventory */}
        <button
          type="button"
          onClick={() => navigate("/admin/inventory")}
          className="text-left bg-(--color-surface) rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <p className="text-sm text-(--color-muted)">Inventory</p>

          <p className="text-xl font-bold mt-2">Manage Products</p>

          <p className="text-xs text-(--color-muted) mt-1">
            View stock and products →
          </p>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-(--color-surface) rounded-xl border border-gray-200 shadow-sm p-5 mb-8">
        <div className="mb-4">
          <h2 className="font-semibold">Quick Actions</h2>

          <p className="text-sm text-(--color-muted) mt-1">
            Common admin tasks
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/inventory")}
            className="flex items-center justify-between border border-gray-200 rounded-lg p-4 text-left hover:bg-gray-50 transition"
          >
            <div>
              <p className="font-medium">Manage Inventory</p>

              <p className="text-sm text-(--color-muted) mt-1">
                View, edit and delete products
              </p>
            </div>

            <span className="text-lg">→</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/inventory/add")}
            className="flex items-center justify-between bg-(--color-accent) text-white rounded-lg p-4 text-left hover:opacity-90 transition"
          >
            <div>
              <p className="font-medium">Add Product</p>

              <p className="text-sm opacity-80 mt-1">
                Add a new product to inventory
              </p>
            </div>

            <span className="text-lg">+</span>
          </button>
        </div>
      </div>

      {/* Users */}
      <div className="bg-(--color-surface) rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div>
            <h2 className="font-semibold">User Management</h2>

            <p className="text-sm text-(--color-muted) mt-1">
              Manage users and seller access.
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="p-4">{user.name}</td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4 capitalize">{user.role}</td>

                  <td className="p-4">
                    {user.role === "customer" ? (
                      <button
                        type="button"
                        disabled={isMakingSeller}
                        onClick={() => handleMakeSeller(user._id)}
                        className="bg-(--color-accent) text-white px-3 py-2 rounded-lg text-sm disabled:opacity-50 hover:opacity-90"
                      >
                        {isMakingSeller ? "Updating..." : "Make Seller"}
                      </button>
                    ) : (
                      <span className="text-(--color-muted)">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden divide-y divide-gray-100">
          {users.map((user) => (
            <div key={user._id} className="p-4 space-y-3">
              <div>
                <p className="font-medium">{user.name}</p>

                <p className="text-sm text-(--color-muted)">{user.email}</p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="capitalize text-sm">{user.role}</span>

                {user.role === "customer" && (
                  <button
                    type="button"
                    disabled={isMakingSeller}
                    onClick={() => handleMakeSeller(user._id)}
                    className="bg-(--color-accent) text-white px-3 py-2 rounded-lg text-sm disabled:opacity-50"
                  >
                    {isMakingSeller ? "Updating..." : "Make Seller"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {users.length === 0 && (
          <p className="p-6 text-center text-(--color-muted)">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
