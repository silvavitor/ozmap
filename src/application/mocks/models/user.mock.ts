import { User } from "../../models/user.model";

export const mockUserData: User = {
  id: "1",
  name: "John Doe",
  email: "johndoe@example.com",
  address: {
    street: "Main St",
    neighborhood: "Downtown",
    number: 123,
    state: "Anystate",
    zipCode: "12345",
    country: "Country",
  },
  coordinates: {
    latitude: 40.7128,
    longitude: -74.006,
  },
};
