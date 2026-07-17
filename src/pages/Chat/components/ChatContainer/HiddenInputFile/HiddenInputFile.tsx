import { useHiddenInputFile } from "./useHiddenInputFile";
import { HiddenInputFileProps } from "./HiddenInputFileProps";

export const HiddenInputFile = ({
  customRef,
  fileType,
}: HiddenInputFileProps) => {
  const { handleOnChangeInput } = useHiddenInputFile();

  return (
    <input
      ref={customRef}
      accept={fileType}
      type="file"
      style={{ display: "none" }}
      onChange={(e) => handleOnChangeInput(e, fileType)}
    />
  );
};
