import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {
  "_id": String;
  "email": String;
  "name": String;

  deserialize(input: any) {
    Object.assign(this, input);

    return this;
  }
}
