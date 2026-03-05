import { cosmic } from "@/lib/cosmic";
import { PaginatedResult } from "@/types/pagination";
import { CosmicObjectResponse, CosmicObjectsResponse, InternalListParams } from "./types";
import { logCosmicError } from "./error";

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

  protected getDefaultErrorMessage() {
    return `Failed to fetch ${this.objectType}`;
  }

  protected async executeWithHandling<TResult>(
    operation: () => Promise<TResult>,
    fallback: () => TResult,
    fallbackMessage?: string
  ): Promise<TResult> {
    try {
      return await operation();
    } catch (err) {
      logCosmicError(err, fallbackMessage ?? this.getDefaultErrorMessage());

      return fallback();
    }
  }

  private buildQuery(params: InternalListParams) {
    let query = cosmic.objects
      .find({ ...params.find ?? {}, type: this.objectType })
      .props(params.props ? '' : this.props ?? '')
      .limit(params.limit ?? 10);

    if (params.skip && params.skip > 0) {
      query = query.skip(params.skip);
    }

    return query;
  }

  async list(params?: InternalListParams): Promise<PaginatedResult<TDomain>> {
    return this.executeWithHandling(
      async () => {
        const response = await this.buildQuery(params ?? {}).depth(1);
        const data = response as CosmicObjectsResponse<TDto>;

        return {
          data: data.objects.map(this.mapDtoToDomain),
          total: data.total,
          limit: data.limit,
          skip: data.skip,
        }
      },
      () => ({
        data: [],
        total: 0,
        limit: 0,
        skip: 0,
      })
    );
  }

  async getBySlug(slug: string) {
    return this.executeWithHandling(
      async () => {
        const query = cosmic.objects
          .findOne({ type: this.objectType, slug }).depth(1);
        const response = (await query) as CosmicObjectResponse<TDto>;

        return response.object ? this.mapDtoToDomain(response.object) : null;
      },
      () => null
    );
  }
}
