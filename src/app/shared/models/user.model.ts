import { Deserializable } from "./deserializable.model";

export class Stock implements Deserializable {
  "_id": String;
  "email": String;
  "name": String;

  deserialize(input: any) {
    Object.assign(this, input);

    return this;
  }
}
