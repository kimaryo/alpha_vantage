import { Stock, User } from "./shared/models/stock.model";

export interface AppStore {
  stocks: Stock[];
  auth: Object;
  signingIn: boolean;
  creatingAccount: boolean;
  user: User;
  // other properties...
}
