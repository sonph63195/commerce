import { COSMIC } from "@/constants/env";

type ErrorWithMessage = { message?: string };

const scrubCosmicDetails = (message: string) =>
  message.replaceAll(COSMIC.BUCKET_SLUG, "db").replaceAll("bucket", "");

export const formatCosmicErrorMessage = (
  error: unknown,
  fallbackMessage: string
) => {
  const rawMessage =
    typeof error === "object" && error !== null && "message" in error
      ? (error as ErrorWithMessage).message
      : undefined;

  return scrubCosmicDetails(rawMessage ?? fallbackMessage);
};

export const logCosmicError = (error: unknown, fallbackMessage: string) => {
  console.error(formatCosmicErrorMessage(error, fallbackMessage));
};
