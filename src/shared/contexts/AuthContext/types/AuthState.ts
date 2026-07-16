import { AuthenticatedUser } from "./AuthenticatedUser";
import { UnauthenticatedUser } from "./UnauthenticatedUser";

export type AuthState = AuthenticatedUser | UnauthenticatedUser;
