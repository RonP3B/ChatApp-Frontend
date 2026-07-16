import { User } from "@/shared/types";
import { AuthStatusValues } from "./AuthStatusValues";

export interface AuthenticatedUser {
  status: Extract<AuthStatusValues, "authenticated">;
  token: string;
  user: User;
}
