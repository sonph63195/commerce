import { GenericObject } from "@cosmicjs/sdk";

export interface CosmicObjectsResponse<TDto> {
  objects: TDto[];
  total: number;
  limit?: number;
  skip?: number;
}

export interface CosmicObjectResponse<TDto> {
  object: TDto;
}

export interface ListParams {
  limit?: number;
  skip?: number;
  props?: string | string[];
  find?: GenericObject
}
