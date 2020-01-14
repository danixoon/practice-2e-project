import { Schema, SchemaTypes, model, Document, SchemaType } from "mongoose";

export enum ServiceType {
  building = 0,
  room = 1
}

export interface ServiceSchema {
  name: string;
  description: string;
  type: ServiceType;
  required: boolean;
  subscriptionId: Schema.Types.ObjectId;
  providerId: Schema.Types.ObjectId;
}

const schema = new Schema({
  name: SchemaTypes.String,
  description: SchemaTypes.String,
  type: SchemaTypes.Number,
  required: SchemaTypes.Boolean,
  subscriptionId: { type: SchemaTypes.ObjectId, ref: "ServiceSubscription" },
  providerId: { type: SchemaTypes.ObjectId, ref: "ServiceProvider" }
});
const Service = model<ServiceSchema & Document>("Service", schema);
export default Service;
