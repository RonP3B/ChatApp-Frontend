import { CANDIDATE_MIME_TYPES } from "../constants";

export const getSupportedMimeType = (): string | undefined =>
  CANDIDATE_MIME_TYPES.find((type) => MediaRecorder.isTypeSupported(type));
