import { Stock, User } from "./shared/models/stock.model";

export interface AppStore {
  stocks: Stock[];
  signingIn: boolean;
  creatingAccount: boolean;
  user: User;
  // other properties...
}
