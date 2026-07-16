import { useRefreshToken } from "@/shared/hooks";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { CenteredLoading } from "../feedback";
import { authStatus, useAuth } from "@/shared/contexts/AuthContext";

export const PersistSession: React.FC = () => {
  const auth = useAuth();
  const { refreshAccessToken } = useRefreshToken();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleAccessTokenRefresh = async (): Promise<void> => {
      try {
        if (auth.status === authStatus.Unauthenticated) {
          await refreshAccessToken();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    handleAccessTokenRefresh();
  }, [auth.status, refreshAccessToken]);

  return <Box>{loading ? <CenteredLoading /> : <Outlet />}</Box>;
};
