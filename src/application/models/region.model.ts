import { RegionMongo } from "../../database/models/databaseRegion.model";
import { Coordinates } from "../types/coordinates.type";
import { BaseModel } from "./base.model";
import { User } from "./user.model";

export class Region extends BaseModel<Region> {
  user: User;
  name: string;
  coordinates: Coordinates[][];

  static fromDatabase(mongoRegion: RegionMongo): Region {
    const region = new Region({
      id: mongoRegion.id,
      name: mongoRegion.name,
      user: User.fromDatabaseWithoutRelation(mongoRegion.user),
      coordinates: mongoRegion.coordinates.coordinates.map((polygon) => {
        return polygon.map((coordinates) => ({
          latitude: coordinates[1],
          longitude: coordinates[0],
        }));
      }),
    });
    return region;
  }

  static fromDatabaseWithoutRelation(mongoRegion: RegionMongo): Region {
    const region = new Region({
      id: mongoRegion.id,
      name: mongoRegion.name,
      user: undefined,
      coordinates: mongoRegion.coordinates.coordinates.map((polygon) => {
        return polygon.map((coordinates) => ({
          latitude: coordinates[0],
          longitude: coordinates[1],
        }));
      }),
    });
    return region;
  }
}
