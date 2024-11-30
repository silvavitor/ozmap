import { Address } from "../types/address.type";
import { Coordinates } from "../types/coordinates.type";

export interface IResolveCoordinatesAndAddressService {
  resolveCoordinates(coordinates: Coordinates): Address;
  resolveAddress(address: Address): Coordinates;
}
