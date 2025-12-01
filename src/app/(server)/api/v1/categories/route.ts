import { formatCosmicErrorMessage, logCosmicError } from "@/infra/cosmic/error";
import { cosmic } from "@/lib/cosmic";
import { z } from "zod";

const props = `{
id
slug
title
thumbnail
created_at
modified_at
metadata {
  description
  parent {
    id
    slug
    title
  }
}
}`;

export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);

    const QuerySchema = z.object({
      limit: z.coerce
        .number({ error: "Limit must be a number" })
        .int()
        .min(1)
        .max(100)
        .default(10),
      skip: z.coerce.number().int().min(0).default(0).optional(),
      after: z.coerce.string().default('').optional(),
    });

    const params = QuerySchema.parse({
      limit: url.searchParams.get("limit") ?? 10,
      skip: url.searchParams.get("skip"),
      after: url.searchParams.get("after") ?? '',
    });

    let query = cosmic.objects
      .find({ type: "categories" })
      .props(props)
      .limit(params.limit);

    if (params.skip && params.skip > 0) {
      query = query.skip(params.skip);
    }

    if (params.after && params.after.length > 0) {
      console.log(params.after);
      query = query.after(params.after);
    }

    const response = await query.depth(1);
    return Response.json(response);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json(
        { error: "Invalid query parameters", details: z.treeifyError(err) },
        { status: 400 }
      );
    }
    logCosmicError(err, "Failed to fetch categories");
    return Response.json(
      { error: formatCosmicErrorMessage(err, "Failed to fetch categories") },
      { status: (err as any).status || 500 }
    );
  }
}
