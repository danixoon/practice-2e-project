import { Schema, SchemaTypes, model } from "mongoose";

const schema = new Schema({
  number: SchemaTypes.String,
  specs: {
    number: SchemaTypes.String
  }
});
const Building = model("Building", schema);
export default Building;
