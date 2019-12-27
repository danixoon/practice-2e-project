import { Schema, SchemaTypes, model, Document } from "mongoose";

export interface BuildingUserSchema {
  userId: Schema.Types.ObjectId;
  buildingId: Schema.Types.ObjectId;
  roomId: Schema.Types.ObjectId;
}

const schema = new Schema({
  userId: { type: SchemaTypes.ObjectId, ref: "User" },
  buildingId: { type: SchemaTypes.ObjectId, ref: "Building" },
  roomId: { type: SchemaTypes.ObjectId, ref: "Room" }
});
const BuildingUser = model<BuildingUserSchema & Document>("BuildingUser", schema);
export default BuildingUser;
