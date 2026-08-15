import {
  useMakeSellerMutation,
  useGetUsersQuery,
} from "../features/admin/adminApi";

const AdminDashboard = () => {
  const { data, isLoading, isError } = useGetUsersQuery();

  const [makeSeller, { isLoading: isMakingSeller }] = useMakeSellerMutation();

  const users = data?.data ?? [];

  const handleMakeSeller = async (userId: string) => {
    try {
      await makeSeller({ userId }).unwrap();
    } catch (error) {
      console.error("Failed to make seller", error);
    }
  };

  if (isLoading) {
    return <p className="p-6">Loading users...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load users.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-(--color-muted) mt-1">
          Manage users and seller access.
        </p>
      </div>

      <div className="bg-(--color-surface) rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold">Users</h2>
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
                <tr key={user.id} className="border-b border-gray-100">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>

                  <td className="p-4">
                    {user.role === "customer" ? (
                      <button
                        type="button"
                        disabled={isMakingSeller}
                        onClick={() => handleMakeSeller(user._id)}
                        className="bg-(--color-accent) text-white px-3 py-2 rounded-lg text-sm disabled:opacity-50"
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
            <div key={user.id} className="p-4 space-y-3">
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
                    onClick={() => handleMakeSeller(user.id)}
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
