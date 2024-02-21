import { chatAppAPI } from "@/shared/APIs";
import { useAuthContext } from "@/shared/contexts";
import { useRefreshToken } from "@/shared/hooks";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useEffect } from "react";

export const ChatAppApiInterceptor: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { auth, setAuth } = useAuthContext();
  const { refreshAccessToken } = useRefreshToken();

  const requestIntercept = chatAppAPI.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (!config.headers["Authorization"] && auth.token) {
        config.headers["Authorization"] = `Bearer ${auth.token}`;
      }
      return config;
    }
  );

  const responseIntercept = chatAppAPI.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },

    async (error) => {
      const prevRequest: InternalAxiosRequestConfig = error.config;
      const data = error.response?.data;

      if (data?.at_error) {
        const newToken = await refreshAccessToken();

        if (!newToken) {
          setAuth({ token: "", user: null });
          return;
        }

        prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return chatAppAPI(prevRequest);
      }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      chatAppAPI.interceptors.request.eject(requestIntercept);
      chatAppAPI.interceptors.response.eject(responseIntercept);
    };
  }, [requestIntercept, responseIntercept]);

  return children;
};
