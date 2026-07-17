import { chatAppAPI } from "@/shared/APIs";
import { useRefreshToken } from "@/shared/hooks";
import { RetryableRequestConfig } from "@/shared/types";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ReactNode, useEffect, useRef } from "react";
import {
  authStatus,
  initialAuthState,
  useAuth,
  useAuthActions,
} from "@/shared/contexts/AuthContext";

export const ChatAppApiInterceptor = ({
  children,
}: {
  children: ReactNode;
}) => {
  const auth = useAuth();
  const { setAuth } = useAuthActions();
  const { refreshAccessToken } = useRefreshToken();

  const authRef = useRef(auth);
  const setAuthRef = useRef(setAuth);
  const refreshAccessTokenRef = useRef(refreshAccessToken);

  authRef.current = auth;
  setAuthRef.current = setAuth;
  refreshAccessTokenRef.current = refreshAccessToken;

  useEffect(() => {
    const requestInterceptor = chatAppAPI.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const currentAuth = authRef.current;
        if (
          !config.headers["Authorization"] &&
          currentAuth.status === authStatus.Authenticated
        ) {
          config.headers["Authorization"] = `Bearer ${currentAuth.token}`;
        }
        return config;
      }
    );

    const responseInterceptor = chatAppAPI.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config as RetryableRequestConfig;
        const data = error.response?.data;

        if (data?.at_error && !originalRequest._retry) {
          originalRequest._retry = true;
          const newToken = await refreshAccessTokenRef.current();

          if (!newToken) {
            setAuthRef.current(initialAuthState);
            return Promise.reject(error);
          }

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return chatAppAPI(originalRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      chatAppAPI.interceptors.request.eject(requestInterceptor);
      chatAppAPI.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return children;
};
