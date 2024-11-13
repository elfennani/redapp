import { Token } from "./Token";

type RefreshedToken = Omit<Token, "refresh_token">;

export default RefreshedToken;
