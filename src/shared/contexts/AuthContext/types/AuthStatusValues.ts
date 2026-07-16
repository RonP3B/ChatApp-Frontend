import { authStatus } from "../constants";

export type AuthStatusValues = (typeof authStatus)[keyof typeof authStatus];
