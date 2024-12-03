import { Region } from "../../models/region.model";
import { mockUserData } from "./user.mock";

export const mockRegionData: Region = {
  id: "id",
  name: "region",
  user: mockUserData,
  coordinates: [
    [
      { latitude: 1, longitude: 2 },
      { latitude: 2, longitude: 3 },
      { latitude: 1, longitude: 2 },
    ],
  ],
};
