import { UnauthenticatedUser } from "../types";
import { authStatus } from "./authStatus";

export const initialAuthState: UnauthenticatedUser = {
  status: authStatus.Unauthenticated,
};
