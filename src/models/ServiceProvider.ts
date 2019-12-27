import { Schema, SchemaTypes, model } from "mongoose";

const schema = new Schema({
  name: SchemaTypes.String,
  type: SchemaTypes.String
});
const ServiceProvider = model("ServiceProvider", schema);
export default ServiceProvider;
