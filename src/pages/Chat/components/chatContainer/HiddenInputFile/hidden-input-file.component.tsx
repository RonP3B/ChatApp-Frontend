import { useHiddenInputFile } from "./hidden-input-file.hook";
import { HiddenInputFileProps } from "./hidden-input-file.interface";

export const HiddenInputFile: React.FC<HiddenInputFileProps> = ({
  customRef,
  fileType,
}) => {
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
