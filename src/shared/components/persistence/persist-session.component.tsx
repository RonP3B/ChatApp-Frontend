import { useAuthContext } from "@/shared/contexts";
import { useRefreshToken } from "@/shared/hooks";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { CenteredLoading } from "../feedback";

export const PersistSession: React.FC = () => {
  const { auth } = useAuthContext();
  const { refreshAccessToken } = useRefreshToken();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleAccessTokenRefresh = async (): Promise<void> => {
      try {
        if (!auth.token) await refreshAccessToken();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    handleAccessTokenRefresh();
  }, [auth, refreshAccessToken]);

  return <Box>{loading ? <CenteredLoading /> : <Outlet />}</Box>;
};
