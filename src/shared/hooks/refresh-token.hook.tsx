import { AxiosResponse } from "axios";
import { decodeJWT } from "../utils";
import { getAccessToken, validateRefreshToken } from "../services";
import { AuthStatus, useAuthActions } from "../contexts/AuthContext";

export const useRefreshToken = () => {
  const { setAuth } = useAuthActions();

  const refreshAccessToken = async (): Promise<string | null> => {
    let token: string | null = null;

    try {
      let res: AxiosResponse = await validateRefreshToken();
      const isValidRefreshToken: boolean = res.data.isValidRefreshToken;
      if (!isValidRefreshToken) return null;
      res = await getAccessToken();
      token = res.data.accessToken as string;
      setAuth({
        status: AuthStatus.Authenticated,
        token: token,
        user: decodeJWT(token),
      });
    } catch (error) {
      console.error(error);
    }

    return token;
  };

  return { refreshAccessToken };
};
