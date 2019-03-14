import { Stock } from "./shared/models/stock.model";
import { User } from "./shared/models/user.model";

export interface AppStore {
  stocks: Stock[];
  auth: Object;
  signingIn: boolean;
  creatingAccount: boolean;
  user: User;
  // other properties...
}
