import { FileTypeMaxSizes } from "@/shared/enums";
import { fileToUrl } from "@/shared/utils";
import { FormikContextType } from "formik";
import { useState, useRef, ChangeEvent } from "react";
import { toast } from "react-toastify";

export const useImageInput = (
  formik: FormikContextType<unknown>,
  name: string
) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarName, setAvatarName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = async (file: File): Promise<void> => {
    const imageUrl: string = await fileToUrl(file);
    setAvatar(imageUrl);
  };

  const handleImgInput = (file: File): void => {
    handleInput(file);
    formik.setFieldValue(name, file);
    setAvatarName(file.name);
  };

  const openFileInput = (): void => {
    inputRef.current?.click();
  };

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = event.target.files?.[0];

    if (!file) return;

    if (file.type.split("/")[0] !== "image") {
      toast("Invalid file type. Please choose a valid file type.", {
        type: "error",
        containerId: "A",
      });
      return;
    }

    if (file.size > FileTypeMaxSizes.IMAGE) {
      toast(
        `File size must be equal or less than ${
          FileTypeMaxSizes.IMAGE / (1024 * 1024)
        }MB.`,
        { type: "error", containerId: "A" }
      );
      return;
    }

    handleImgInput(file);
  };

  return {
    imageInputValues: { avatar, avatarName, inputRef },
    imageInputActions: { openFileInput, onFileInputChange },
  };
};
