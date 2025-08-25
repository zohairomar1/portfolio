"use client";

import { useCallback, useRef, useEffect } from "react";
import { useSettings } from "./useSettings";

type SoundType = "select" | "navigate" | "error" | "success";

// Simple beep sounds using Web Audio API
const SOUNDS: Record<SoundType, { frequency: number; duration: number }> = {
  select: { frequency: 800, duration: 0.1 },
  navigate: { frequency: 400, duration: 0.05 },
  error: { frequency: 200, duration: 0.2 },
  success: { frequency: 600, duration: 0.15 },
};

export function useSound() {
  const { settings } = useSettings();
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Create audio context on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };

    window.addEventListener("click", initAudio);
    window.addEventListener("keydown", initAudio);

    return () => {
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };
  }, []);

  const playSound = useCallback(
    (type: SoundType) => {
      if (!settings.soundEnabled || !audioContextRef.current) return;

      const ctx = audioContextRef.current;
      const sound = SOUNDS[type];

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = "square";
      oscillator.frequency.value = sound.frequency;

      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        ctx.currentTime + sound.duration
      );

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + sound.duration);
    },
    [settings.soundEnabled]
  );

  return { playSound };
}
