import { Schema, SchemaTypes, model, Document } from "mongoose";

export enum ServiceProviderType {
  host = 0,
  outsource = 1,
  hired = 2
}

export interface ServiceProviderSchema {
  name: string;
  type: ServiceProviderType;
}

const schema = new Schema({
  name: SchemaTypes.String,
  type: SchemaTypes.String
});
const ServiceProvider = model<ServiceProviderSchema & Document>("ServiceProvider", schema);
export default ServiceProvider;
