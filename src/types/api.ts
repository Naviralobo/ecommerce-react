export interface ApiError {
  status?: number;
  data?: {
    success: boolean;
    message: string;
  };
}