export const fileToUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (error) => reject(error);
  });
};
