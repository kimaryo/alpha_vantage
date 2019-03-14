import { Deserializable } from "./deserializable.model";

export class Stock implements Deserializable {
  "Time Series (Daily)": Object;
  "Meta Data": Object;

  deserialize(input: any) {
    Object.assign(this, input);

    return this;
  }
}
