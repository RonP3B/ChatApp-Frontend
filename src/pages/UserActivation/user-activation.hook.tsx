import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserActivation } from "./user-activation.service";

export const useUserActivation = (username: string) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const activateUserAccount = async (): Promise<void> => {
      try {
        await getUserActivation(username);
      } catch (error) {
        toast(
          "An error occurred trying to activate the account. Please try again later.",
          { type: "error", containerId: "A" }
        );
        navigate("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    activateUserAccount();
  }, [navigate, username]);

  return { loading };
};
