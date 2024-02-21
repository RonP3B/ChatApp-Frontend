import { User } from "../interfaces";

export const decodeJWT = (jwt: string): User => {
  const base64Url: string = jwt.split(".")[1];
  const base64: string = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const { id, avatar, username, email, isOnline } = JSON.parse(atob(base64));
  return { id, avatar, username, email, isOnline };
};
