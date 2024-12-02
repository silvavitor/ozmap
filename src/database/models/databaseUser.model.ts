import mongoose, { Document, Schema } from "mongoose";
import { Address } from "../../application/types/address.type";
import { RegionMongo } from "./databaseRegion.model";

type DBUserCoordinates = {
  type: string;
  coordinates: number[];
};

export interface UserMongo extends Document {
  name: string;
  email: string;
  address: Address;
  coordinates: DBUserCoordinates;
  regions: RegionMongo[];
}

const userSchema = new Schema<UserMongo>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: {
      street: { type: String },
      number: { type: Number },
      neighborhood: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },
    coordinates: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    regions: [{ type: Schema.Types.ObjectId, ref: "Region", required: true }],
  },
  { timestamps: true }
);

const UserDatabase = mongoose.model<UserMongo>("User", userSchema);

export { UserDatabase };
