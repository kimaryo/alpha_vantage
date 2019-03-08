import { Stock } from "./shared/models/stock.model";

export interface AppStore {
  stocks: Stock[];
  // other properties...
}
