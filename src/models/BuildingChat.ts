import { Schema, SchemaTypes, model } from "mongoose";

const schema = new Schema({
  buildingId: { type: SchemaTypes.ObjectId, ref: "Building" }
});
const BuildingChat = model("BuildingChat", schema);
export default BuildingChat;
