import { Schema, SchemaTypes, model, Document } from "mongoose";

export enum SubscriptionScheduleType {
  everyday = 0,
  monthly = 1
}

export enum SubscriptionPaymentType {
  perunit = 0,
  fixed = 1
}

export interface ServiceSubscriptionSchema {
  price: number;
  scheduleType: SubscriptionScheduleType;
  paymentType: SubscriptionPaymentType;
}

const schema = new Schema({
  price: SchemaTypes.Number,
  scheduleType: SchemaTypes.Number,
  paymentType: SchemaTypes.Number
});
const ServiceSubscription = model<ServiceSubscriptionSchema & Document>("SubscriptionSchedule", schema);
export default ServiceSubscription;
