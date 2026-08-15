export const normalizeImageUrl = (value?: string): string => {
  if (!value) return "";

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  ) {
    return value;
  }

  if (value.startsWith("/")) {
    return value;
  }

  const bucketUrl = import.meta.env.VITE_S3_BUCKET_URL?.replace(/\/$/, "");

  if (bucketUrl) {
    return `${bucketUrl}/${encodeURIComponent(value)}`;
  }

  return value;
};
