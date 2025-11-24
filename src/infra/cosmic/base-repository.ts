import { cosmic } from "@/lib/cosmic";
import { PaginatedResult } from "@/types/pagination";
import { CosmicObjectResponse, CosmicObjectsResponse, ListParams } from "./types";
import { COSMIC } from "@/constants/env";

type Mapper<TDto, TDomain> = (dto: TDto) => TDomain;


export class CosmicBaseRepository<TDto, TDomain> {
  protected readonly objectType: string;
  protected readonly mapDtoToDomain: Mapper<TDto, TDomain>;
  protected readonly props: string | Array<string>;


  constructor(objectType: string, mapDtoToDomain: Mapper<TDto, TDomain>, props?: string | Array<string>) {
    this.objectType = objectType;
    this.mapDtoToDomain = mapDtoToDomain;
    this.props = props ?? '';
  }

  protected buildQuery(params: ListParams) {
    let query = cosmic.objects
      .find({ ...params.find ?? {}, type: this.objectType })
      .props(params.props ? '' : this.props ?? '')
      .limit(params.limit ?? 10);

    if (params.skip && params.skip > 0) {
      query = query.skip(params.skip);
    }

    return query;
  }

  async list(params?: ListParams): Promise<PaginatedResult<TDomain>> {
    try {
      const response = await this.buildQuery(params ?? {}).depth(1);
    const data = response as CosmicObjectsResponse<TDto>;

    return {
      data: data.objects.map(this.mapDtoToDomain),
      total: data.total,
      limit: data.limit,
      skip: data.skip,
    }
    } catch (err) {
      // TODO: create logger
      console.log(((err as any).message || "Failed to fetch categories").replaceAll(COSMIC.BUCKET_SLUG, 'db'));

      return {
        data: [],
        total: 0,
        limit: 0,
        skip: 0,
      }
    }
  }

  async getBySlug(slug: string) {
    try {
      const query = cosmic.objects
        .findOne({ type: this.objectType, slug }).depth(1);
      const response = (await query) as CosmicObjectResponse<TDto>;

      return response.object ? [response.object].map(this.mapDtoToDomain)[0] : null;
    } catch (err) {
      // TODO: create logger
      console.log(((err as any).message || "Failed to fetch categories").replaceAll(COSMIC.BUCKET_SLUG, 'db'));
      return null;
    }
  }
}
