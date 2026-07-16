import { AuthStatusValues } from "./AuthStatusValues";

export interface UnauthenticatedUser {
  status: Extract<AuthStatusValues, "unauthenticated">;
}
