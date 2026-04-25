const ProductSkeleton = () => {
  return (
    <div className="bg-(--color-surface) p-4 rounded-xl animate-pulse">
      <div className="h-40 bg-gray-200 rounded" />

      <div className="mt-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>

      <div className="mt-4 h-4 bg-gray-300 rounded w-1/4" />
    </div>
  );
};

export default ProductSkeleton;
