import { COSMIC } from "@/constants/env";
import { createBucketClient } from "@cosmicjs/sdk";

const cosmic = createBucketClient({
  bucketSlug: COSMIC.BUCKET_SLUG,
  readKey: COSMIC.BUCKET_READ_KEY,
  writeKey: COSMIC.BUCKET_WRITE_KEY,
});

export { cosmic };
