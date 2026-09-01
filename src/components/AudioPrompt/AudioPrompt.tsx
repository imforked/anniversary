import { useEffect, useRef, useState } from "react";
import * as S from "./AudioPrompt.styles";
import type { AudioPromptProps } from "./AudioPrompt.types";
import { BAR_COUNT, extractWaveformPeaks, toBarHeights } from "./waveform";

const PlayIcon = () => {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true">
      <path d="M4 2.5v9l7-4.5-7-4.5z" fill="currentColor" />
    </svg>
  );
};

const PauseIcon = () => {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3.5 2.5h2.25v9H3.5zm4.75 0H10.5v9H8.25z" fill="currentColor" />
    </svg>
  );
};

const loadingBarHeights = Array.from({ length: BAR_COUNT }, (_, index) => {
  const center = (BAR_COUNT - 1) / 2;
  const distance = Math.abs(index - center) / center;
  return Math.round(12 + (1 - distance) * 10);
});

export const AudioPrompt = ({ prompt, src, compact = false }: AudioPromptProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [barHeights, setBarHeights] = useState<number[]>(loadingBarHeights);
  const [isWaveformReady, setIsWaveformReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadWaveform = async () => {
      try {
        const peaks = await extractWaveformPeaks(src);

        if (!cancelled) {
          setBarHeights(toBarHeights(peaks));
          setIsWaveformReady(true);
        }
      } catch {
        if (!cancelled) {
          setIsWaveformReady(false);
        }
      }
    };

    setBarHeights(loadingBarHeights);
    setIsWaveformReady(false);
    void loadWaveform();

    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleTimeUpdate = () => {
      if (!audio.duration) {
        return;
      }

      setProgress(audio.currentTime / audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      audio.currentTime = 0;
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleTogglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const showProgress = isPlaying || progress > 0;

  return (
    <S.Root $compact={compact}>
      <S.Prompt>{prompt}</S.Prompt>
      <S.Player>
        <S.PlayButton
          type="button"
          $compact={compact}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          onClick={handleTogglePlayback}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </S.PlayButton>
        <S.Waveform aria-hidden="true" $isLoading={!isWaveformReady}>
          {barHeights.map((height, index) => (
            <S.Bar
              key={index}
              $height={height}
              $active={
                showProgress && index / barHeights.length <= progress
              }
            />
          ))}
        </S.Waveform>
      </S.Player>
      <audio ref={audioRef} src={src} preload="metadata" hidden />
    </S.Root>
  );
};
