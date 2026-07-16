import { FileTypeMaxSizes } from "@/shared/enums";

type ToastFn = (message: string, options: { type: "error" }) => void;

const validateFileType = (
  explicitFileType: string,
  file: File,
  toast: ToastFn
): boolean => {
  if (explicitFileType !== file.type.split("/")[0]) {
    toast("Invalid file type. Please choose a valid file type.", {
      type: "error",
    });

    return false;
  }

  return true;
};

const validateFileSize = (
  explicitFileType: string,
  file: File,
  toast: ToastFn
): boolean => {
  const key = explicitFileType.toUpperCase() as keyof typeof FileTypeMaxSizes;

  if (file.size > FileTypeMaxSizes[key]) {
    toast(
      `File size must be equal or less than ${FileTypeMaxSizes[key] / (1024 * 1024)}MB.`,
      { type: "error" }
    );

    return false;
  }

  return true;
};

export const validateFileMessage = (
  explicitFileType: string,
  file: File,
  toast: ToastFn
): boolean => {
  return (
    validateFileType(explicitFileType, file, toast) &&
    validateFileSize(explicitFileType, file, toast)
  );
};
