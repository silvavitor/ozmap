import { RegionRepository } from "../../repositories/region.repository";

export function makeRegionRepository() {
  return new RegionRepository();
}
