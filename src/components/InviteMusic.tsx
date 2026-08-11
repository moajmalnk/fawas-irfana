import { AnimatePresence, motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MUSIC_SRC = "/baraka-allahu-lakuma.mp3";
const VOLUME = 0.42;
const cushion = [0.22, 1, 0.36, 1] as const;

export function InviteMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const wantPlaying = useRef(true);
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = VOLUME;
    try {
      await audio.play();
      wantPlaying.current = true;
      setPlaying(true);
    } catch {
      wantPlaying.current = false;
      setPlaying(false);
    }
  };

  const openInvite = () => {
    setEntered(true);
    void startMusic();
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      wantPlaying.current = false;
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      wantPlaying.current = true;
      setPlaying(true);
    } catch {
      wantPlaying.current = false;
      setPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    if (!entered) return;

    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
        return;
      }
      if (wantPlaying.current) {
        audio.play().catch(() => setPlaying(false));
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [entered]);

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} preload="auto" loop playsInline />

      <AnimatePresence>
        {!entered && (
          <motion.div
            key="gate"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-gate-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: cushion } }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/92 px-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: cushion, delay: 0.1 }}
              className="w-full max-w-sm text-center"
            >
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.42em] text-gold-deep">
                With grace &amp; blessings
              </p>
              <div className="gold-rule mx-auto mt-5 h-px w-20" />
              <h2
                id="invite-gate-title"
                className="mt-6 font-script text-4xl leading-tight text-primary sm:text-5xl"
              >
                Fawas &amp; Irfana
              </h2>
              <p className="mt-4 font-display text-base font-light italic text-muted-foreground">
                Baraka Allahu Lakuma
              </p>
              <button
                type="button"
                onClick={openInvite}
                className="mt-10 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-gold/55 bg-secondary/50 px-8 py-3 font-sans text-[0.72rem] uppercase tracking-[0.28em] text-gold-deep transition-colors hover:border-gold hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 sm:w-auto"
              >
                Open invitation
              </button>
              <p className="mt-5 font-sans text-[0.7rem] tracking-wide text-muted-foreground/80">
                Soft music will begin
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {entered && (
          <motion.button
            key="toggle"
            type="button"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: cushion }}
            onClick={toggleMusic}
            aria-label={playing ? "Mute music" : "Play music"}
            aria-pressed={playing}
            className="fixed bottom-5 right-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-gold/45 bg-background/85 text-gold-deep shadow-[0_12px_30px_-16px_rgba(44,76,59,0.45)] backdrop-blur-md transition-colors hover:border-gold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 sm:bottom-7 sm:right-7"
          >
            {playing ? (
              <Volume2 className="h-5 w-5" aria-hidden />
            ) : (
              <VolumeX className="h-5 w-5" aria-hidden />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
