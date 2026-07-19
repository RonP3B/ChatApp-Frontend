let currentlyPlaying: HTMLMediaElement | null = null;

export const registerPlayback = (element: HTMLMediaElement): void => {
  if (currentlyPlaying && currentlyPlaying !== element) {
    currentlyPlaying.pause();
  }
  currentlyPlaying = element;
};
