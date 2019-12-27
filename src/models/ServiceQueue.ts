import { Schema, SchemaTypes, model } from "mongoose";

const schema = new Schema({
  start: SchemaTypes.Date,
  next: SchemaTypes.Date,
  status: {
    checkCode: SchemaTypes.String
  },
  serviceId: { type: SchemaTypes.ObjectId, ref: "Service" }
});
const ServiceQueue = model("ServiceQueue", schema);
export default ServiceQueue;
