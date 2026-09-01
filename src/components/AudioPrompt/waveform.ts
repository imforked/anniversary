export const BAR_COUNT = 48;
export const MAX_BAR_HEIGHT = 56;
const MIN_BAR_SCALE = 0.14;

export const toBarHeights = (peaks: number[]) => {
  return peaks.map((peak) =>
    Math.max(4, Math.round(peak * MAX_BAR_HEIGHT)),
  );
};

export const extractWaveformPeaks = async (
  src: string,
  barCount = BAR_COUNT,
) => {
  const response = await fetch(src);

  if (!response.ok) {
    throw new Error(`Failed to load audio: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const audioContext = new AudioContext();

  try {
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const channelData = audioBuffer.getChannelData(0);
    const samplesPerBar = Math.floor(channelData.length / barCount);
    const peaks: number[] = [];

    for (let index = 0; index < barCount; index += 1) {
      const start = index * samplesPerBar;
      const end = Math.min(start + samplesPerBar, channelData.length);
      let peak = 0;

      for (let sampleIndex = start; sampleIndex < end; sampleIndex += 1) {
        peak = Math.max(peak, Math.abs(channelData[sampleIndex]));
      }

      peaks.push(peak);
    }

    const maxPeak = Math.max(...peaks, 0.001);

    return peaks.map((peak) => {
      const normalized = peak / maxPeak;
      return MIN_BAR_SCALE + normalized * (1 - MIN_BAR_SCALE);
    });
  } finally {
    await audioContext.close();
  }
};
