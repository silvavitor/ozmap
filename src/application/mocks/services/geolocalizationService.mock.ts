import { IResolveCoordinatesAndAddressService } from "../../interfaces/geolocalizationService.interface";

export const geolocalizationServiceMock: jest.Mocked<IResolveCoordinatesAndAddressService> =
  {
    resolveCoordinates: jest.fn(),
    resolveAddress: jest.fn(),
  };
