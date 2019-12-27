import { Schema, SchemaTypes, model } from "mongoose";

const schema = new Schema({
  name: SchemaTypes.String,
  description: SchemaTypes.String,
  type: SchemaTypes.Number,
  required: SchemaTypes.Boolean,
  subscriptionId: { type: SchemaTypes.ObjectId, ref: "ServiceSubscription" },
  providerId: { type: SchemaTypes.ObjectId, ref: "ServiceProvider" }
});
const Service = model("Service", schema);
export default Service;
