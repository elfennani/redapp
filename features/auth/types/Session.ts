import { Token } from "./Token";

export interface Session {
  id: string;
  user: {
    id: string;
    fullname?: string;
    username: string;
    icon?: string;
  };
  token: Token;
  expiration: number;
}
