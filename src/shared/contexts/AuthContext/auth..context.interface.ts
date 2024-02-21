import { User } from "@/shared/interfaces";

export interface AuthContextProps {
  auth: { token: string; user: User | null };
  setAuth: React.Dispatch<
    React.SetStateAction<{ token: string; user: User | null }>
  >;
}
