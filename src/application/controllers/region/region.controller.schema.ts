import { z } from "zod";

const CoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const createRegionSchema = z.object({
  userId: z.string(),
  name: z.string(),
  coordinates: z.array(z.array(CoordinatesSchema)),
});

export const updateRegionSchema = z.object({
  name: z.string().optional(),
  coordinates: z.array(z.array(CoordinatesSchema)).optional(),
});

export const findByCoordinatesRegionSchema = z.object({
  coordinates: CoordinatesSchema,
});

export const findByCoordinatesDistanceRegionSchema = z.object({
  distance: z.number(),
  userId: z.string().optional(),
  coordinates: CoordinatesSchema,
});
