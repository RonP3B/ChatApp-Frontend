import axios from "axios";

export const getAxiosErrorMsg = (error: unknown, action: string): string => {
  if (!axios.isAxiosError(error) || error.response?.status === 500) {
    return `An error occurred while trying to ${action}. Please try again later.`;
  }

  return error.response?.data.message;
};
