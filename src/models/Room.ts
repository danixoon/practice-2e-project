import { Schema, SchemaTypes, model, Document } from "mongoose";

export interface RoomSchema {
  number: number;
  buildingId: Schema.Types.ObjectId;
  specs: {
    square: number;
    rooms: number;
  };
}

const schema = new Schema<RoomSchema>({
  number: SchemaTypes.Number,
  buildingId: { type: SchemaTypes.ObjectId, ref: "Building" },
  specs: {
    square: SchemaTypes.Number,
    rooms: SchemaTypes.Number
  }
});
const Room = model<RoomSchema & Document>("Room", schema);
export default Room;
