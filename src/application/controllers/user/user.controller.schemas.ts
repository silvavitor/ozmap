import { z } from "zod";

const AddressSchema = z.object({
  street: z.string(),
  number: z.number(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
});

const CoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const createUserSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    address: AddressSchema.optional(),
    coordinates: CoordinatesSchema.optional(),
  })
  .refine(
    (data) =>
      (data.address && !data.coordinates) ||
      (!data.address && data.coordinates),
    {
      message: "Either address or coordinates must be provided, but not both.",
      path: ["address", "coordinates"],
    }
  );

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  address: AddressSchema.optional(),
  coordinates: CoordinatesSchema.optional(),
});
