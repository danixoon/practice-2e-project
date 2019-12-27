import { Schema, SchemaTypes, model, Document, Model } from "mongoose";

export type UserRole = "admin" | "user";

export interface UserSchema {
  account: {
    username: string;
    password: string;
  };
  profile: {
    firstname: string;
    lastname: string;
    middlename: string;
    dob: Date;
  };
  role: UserRole;
}

const schema = new Schema<UserSchema>({
  account: {
    username: { type: SchemaTypes.String, unique: true, required: true },
    password: SchemaTypes.String
  },
  profile: {
    firstname: { type: SchemaTypes.String, required: true },
    lastname: { type: SchemaTypes.String, required: true },
    middlename: { type: SchemaTypes.String },
    dob: { type: SchemaTypes.String, required: true }
  },
  role: { type: SchemaTypes.String, required: true }
});
const User: Model<UserSchema & Document> = model<UserSchema & Document>("User", schema);
export default User;
