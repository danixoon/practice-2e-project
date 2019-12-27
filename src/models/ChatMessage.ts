import { Schema, SchemaTypes, model } from "mongoose";

const schema = new Schema({
  message: SchemaTypes.String,
  attachment: SchemaTypes.String,
  chatId: { type: SchemaTypes.ObjectId, ref: "BuildingChat" },
  userId: { type: SchemaTypes.ObjectId, ref: "User" }
});
const ChatMessage = model("ChatMessage", schema);
export default ChatMessage;
