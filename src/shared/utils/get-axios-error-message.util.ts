import axios from "axios";

export const getAxiosErrorMessage = (error: unknown): string => {
  const fallback = `An internal error has occurred. Please try again later.`;

  if (!axios.isAxiosError(error) || error.response?.status === 500) {
    return fallback;
  }

  return error.response?.data.message ?? fallback;
};
