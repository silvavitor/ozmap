import { Client } from "@googlemaps/google-maps-services-js";
import * as dotenv from "dotenv";
import { IResolveCoordinatesAndAddressService } from "../../application/interfaces/geolocalizationService.interface";
import { Address } from "../../application/types/address.type";
import { Coordinates } from "../../application/types/coordinates.type";

dotenv.config();

export class GeoLocationService
  implements IResolveCoordinatesAndAddressService
{
  private client: Client;
  private apiKey: string;

  constructor() {
    this.client = new Client({});
    this.apiKey = process.env.GOOGLE_API_KEY;
  }

  async resolveCoordinates(coordinates: Coordinates): Promise<Address> {
    try {
      const response = await this.client.reverseGeocode({
        params: {
          latlng: [coordinates.latitude, coordinates.longitude],
          key: this.apiKey,
        },
      });

      if (response.data.results.length === 0) {
        throw new Error(
          "Nenhum endereço encontrado para as coordenadas fornecidas."
        );
      }

      const result = response.data.results[0];
      const addressComponents = result.address_components;

      return {
        street: this.getAddressComponent(addressComponents, "route"),
        number:
          parseInt(
            this.getAddressComponent(addressComponents, "street_number")
          ) || 0,
        neighborhood: this.getAddressComponent(
          addressComponents,
          "sublocality"
        ),
        state: this.getAddressComponent(
          addressComponents,
          "administrative_area_level_1"
        ),
        zipCode: this.getAddressComponent(addressComponents, "postal_code"),
        country: this.getAddressComponent(addressComponents, "country"),
      };
    } catch (error) {
      console.error("Erro ao resolver coordenadas:", error.message);
      throw new Error("Erro ao resolver coordenadas");
    }
  }

  async resolveAddress(address: Address): Promise<Coordinates> {
    try {
      const response = await this.client.geocode({
        params: {
          address: `${address.street}, ${address.number}, ${address.neighborhood}, ${address.state}, ${address.country}, ${address.zipCode}`,
          key: this.apiKey,
        },
      });

      if (response.data.results.length === 0) {
        throw new Error(
          "Nenhuma coordenada encontrada para o endereço fornecido."
        );
      }

      const location = response.data.results[0].geometry.location;

      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } catch (error) {
      console.error("Erro ao resolver endereço:", error.message);
      throw new Error("Erro ao resolver endereço");
    }
  }

  private getAddressComponent(components: any[], type: string): string {
    const component = components.find((comp) => comp.types.includes(type));
    return component ? component.long_name : "";
  }
}
