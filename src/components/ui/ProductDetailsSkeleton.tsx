const ProductDetailsSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 gap-10 animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-(--color-surface) p-6 rounded-xl">
        <div className="h-80 bg-gray-200 rounded" />
      </div>

      {/* Text Skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />

        <div className="h-6 bg-gray-300 rounded w-1/4 mt-6" />

        <div className="h-10 bg-gray-300 rounded w-40 mt-6" />
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
