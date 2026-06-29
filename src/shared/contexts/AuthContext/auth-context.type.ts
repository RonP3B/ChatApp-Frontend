import { AuthStatus } from "./auth-context.const";
import {
  AuthenticatedUser,
  UnauthenticatedUser,
} from "./auth-context.interface";

export type AuthStatusValues = (typeof AuthStatus)[keyof typeof AuthStatus];

export type AuthState = AuthenticatedUser | UnauthenticatedUser;
