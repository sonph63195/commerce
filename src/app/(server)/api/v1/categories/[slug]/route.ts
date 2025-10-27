import { cosmic } from "@/lib/cosmic";
import { z } from "zod";

const props = `{
id
slug
title
thumbnail
created_at
modified_at
status
published_at
metadata {
  name
  description
  image
  category_type
  parent_category {
    id
    slug
    title
  }
}
type
}`;

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/v1/categories/[slug]">
): Promise<Response> {
  const { slug } = await ctx.params;

  try {
    const SlugSchema = z.coerce.string();

    let query = cosmic.objects
      .findOne({ type: "categories", slug: SlugSchema.parse(slug) })
      .props(props);

    const response = await query.depth(1);
    return Response.json(response.object);
  } catch (err) {

    if (err instanceof z.ZodError) {
      return Response.json(
        { error: "Invalid query parameters", details: z.treeifyError(err) },
        { status: 400 }
      );
    }
    return Response.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}
