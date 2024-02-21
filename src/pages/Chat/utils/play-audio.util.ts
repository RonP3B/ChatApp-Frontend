export function playAudio(fileLocation: string): void {
  const audio = new Audio(fileLocation);
  audio.play();
}
