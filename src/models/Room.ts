import { Schema, SchemaTypes, model } from "mongoose";

const schema = new Schema({
  number: SchemaTypes.Number,
  specs: {
    square: SchemaTypes.Number,
    rooms: SchemaTypes.Number
  }
});
const Room = model("Room", schema);
export default Room;
