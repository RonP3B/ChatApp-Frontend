import { AxiosResponse } from "axios";
import { useAuthContext } from "../contexts/AuthContext/auth.context.hook";
import { decodeJWT } from "../utils";
import { getAccessToken, validateRefreshToken } from "../services";

export const useRefreshToken = () => {
  const { setAuth } = useAuthContext();

  const refreshAccessToken = async (): Promise<string | null> => {
    let token: string | null = null;

    try {
      let res: AxiosResponse = await validateRefreshToken();
      const isValidRefreshToken: boolean = res.data.isValidRefreshToken;
      if (!isValidRefreshToken) return null;
      res = await getAccessToken();
      token = res.data.accessToken as string;
      setAuth({ token: token, user: decodeJWT(token) });
    } catch (error) {
      console.error(error);
    }

    return token;
  };

  return { refreshAccessToken };
};
