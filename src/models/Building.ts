import { Schema, SchemaTypes, model, Document } from "mongoose";

export interface BuildingSchema {
  number: string;
  specs: {
    constructionDate: Date;
    floors: number;
  };
}

const schema = new Schema<BuildingSchema>({
  number: { type: SchemaTypes.String, unique: true, required: true },
  specs: {
    constructionDate: { type: SchemaTypes.Date, required: true },
    floors: { type: SchemaTypes.Number, required: true }
  }
});
const Building = model<BuildingSchema & Document>("Building", schema);
export default Building;
