import { IResolveCoordinatesAndAddressService } from "../../application/interfaces/geolocalizationService.interface";
import { Address } from "../../application/types/address.type";
import { Coordinates } from "../../application/types/coordinates.type";

export class GeoLocationService
  implements IResolveCoordinatesAndAddressService
{
  resolveCoordinates(coordinates: Coordinates): Address {
    return {
      street: "Flower Street",
      number: 123,
      neighborhood: "Spring Garden",
      state: "NY",
      zipCode: "12345-678",
      country: "USA",
    };
  }
  resolveAddress(address: Address): Coordinates {
    return {
      latitude: 1,
      longitude: 2,
    };
  }
}
