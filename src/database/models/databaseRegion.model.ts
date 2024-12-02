import { Document, Schema, model } from "mongoose";
import { UserMongo } from "./databaseUser.model";

export type DBRegionCoordinates = {
  type: "Polygon";
  coordinates: number[][][];
};

export interface RegionMongo extends Document {
  name: string;
  coordinates: DBRegionCoordinates;
  user: UserMongo;
}

const RegionSchema = new Schema<RegionMongo>(
  {
    name: { type: String, required: true },
    coordinates: {
      type: {
        type: String,
        enum: ["Polygon"],
        required: true,
      },
      coordinates: {
        type: [[[Number]]],
        required: true,
      },
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

RegionSchema.index({ coordinates: "2dsphere" });

const RegionDatabase = model<RegionMongo>("Region", RegionSchema);

export { RegionDatabase };
