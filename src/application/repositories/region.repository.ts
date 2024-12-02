import { RegionDatabase } from "../../database/models/databaseRegion.model";
import {
  IRegionRepository,
  RegionRepositoryCreateParams,
  RegionRepositoryFindByCoordinatesDistanceParams,
  RegionRepositoryFindByCoordinatesParams,
  RegionRepositoryFindParams,
  RegionRepositoryUpdateParams,
} from "../interfaces/regionRepository.interface";
import { Region } from "../models/region.model";
import { Page } from "../types/page.type";

export class RegionRepository implements IRegionRepository {
  async create(createRegion: RegionRepositoryCreateParams): Promise<Region> {
    const geoJsonCoordinates = createRegion.coordinates.map((ring) =>
      ring.map((point) => {
        return [point.longitude, point.latitude];
      })
    );

    const mongoRegion = new RegionDatabase({
      name: createRegion.name,
      coordinates: {
        type: "Polygon",
        coordinates: geoJsonCoordinates,
      },
      user: createRegion.userId,
    });

    await mongoRegion.save();

    const populatedRegion = await RegionDatabase.findById(mongoRegion._id)
      .populate("user")
      .exec();

    return Region.fromDatabase(populatedRegion);
  }

  async findById(id: string): Promise<Region> {
    const mongoRegion = await RegionDatabase.findById(id)
      .populate("user")
      .exec();

    return mongoRegion ? Region.fromDatabase(mongoRegion) : null;
  }

  async update(
    id: string,
    updateRegion: RegionRepositoryUpdateParams
  ): Promise<Region> {
    const updatedRegion = await RegionDatabase.findByIdAndUpdate(
      id,
      { ...updateRegion },
      { new: true }
    )
      .populate("user")
      .exec();
    return updatedRegion ? Region.fromDatabase(updatedRegion) : null;
  }

  async findPaginated(
    filter: RegionRepositoryFindParams
  ): Promise<Page<Region>> {
    const { limit, skip, userId } = filter;

    const query: any = {};
    if (userId) {
      query.user = userId;
    }

    const regions = await RegionDatabase.find(query)
      .skip(skip)
      .limit(limit)
      .populate("user")
      .exec();
    const total = await RegionDatabase.countDocuments(query).exec();

    return {
      total,
      skip,
      data: regions.map((dbRegion) => Region.fromDatabase(dbRegion)),
    };
  }

  async findByCoordinates(
    filter: RegionRepositoryFindByCoordinatesParams
  ): Promise<Page<Region>> {
    const { coordinates, skip = 0, limit = 10 } = filter;

    const geoJsonPoint = {
      type: "Point",
      coordinates: [coordinates.longitude, coordinates.latitude],
    };

    const query = {
      coordinates: {
        $geoIntersects: {
          $geometry: geoJsonPoint,
        },
      },
    };

    const regions = await RegionDatabase.find(query)
      .skip(skip)
      .limit(limit)
      .populate("user")
      .exec();
    const total = await RegionDatabase.countDocuments(query).exec();

    return {
      total,
      skip,
      data: regions.map((region) => Region.fromDatabase(region)),
    };
  }

  async findByCoordinatesDistance(
    filter: RegionRepositoryFindByCoordinatesDistanceParams
  ): Promise<Page<Region>> {
    const { limit, skip, coordinates, distance, userId } = filter;

    const earthRadiusInMeters = 6378137;

    const distanceInRadians = distance / earthRadiusInMeters;

    const query: any = {
      coordinates: {
        $geoWithin: {
          $centerSphere: [
            [coordinates.longitude, coordinates.latitude],
            distanceInRadians,
          ],
        },
      },
    };

    if (userId) {
      query.user = { $ne: userId };
    }

    const regions = await RegionDatabase.find(query)
      .skip(skip)
      .limit(limit)
      .populate("user")
      .exec();
    const total = await RegionDatabase.countDocuments(query).exec();

    return {
      total,
      skip,
      data: regions.map((dbRegion) => Region.fromDatabase(dbRegion)),
    };
  }

  async delete(id: string): Promise<void> {
    await RegionDatabase.findByIdAndDelete(id).exec();
  }
}
